const { User, Product, Category, Order } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const {signToken, authMiddleware} = require("../utils/auth")
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
          $options: 'i'  // case-insensitive search
        };
      }

      return await Product.find(params).populate('category');
    },
    popular: async () => {
      // Aggregate orders to count products
      const allOrders = await Order.aggregate([
        { $unwind: '$products' },
        {
          $group: {
            _id: '$products',
            count: { $sum: 1 }
          }
        }
      ]);

      // Get all products and populate their categories
      const allProducts = await Product.find().populate('category');

      // Map products with their counts from orders
      const productsArr = allProducts.map(product => {
        const count = allOrders.find(order => order._id.toString() === product._id.toString())?.count || 0;
        return { ...product._doc, count };
      });

      // Filter and sort products by count in descending order
      const filteredProducts = productsArr.filter(product => product.count > 0);
      filteredProducts.sort((a, b) => b.count - a.count);

      // console.log(filteredProducts)

      return filteredProducts;
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('You are not authenticated');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.products',
          populate: 'category'
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('You are not authenticated');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      await Order.create({ products: args.products.map(({ _id }) => _id) });

      const line_items = args.products.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            description: product.description,
            images: [`${url}/images/${product.image}`]
          },
          unit_amount: product.price * 100,
        },
        quantity: product.purchaseQuantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('You are not authenticated');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('You are not authenticated');
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid email or password');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid email or password');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
