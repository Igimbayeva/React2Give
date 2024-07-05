import { useEffect, useState } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS, QUERY_POPULAR_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import ProductItemPopular from '../ProductItemPopular';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading: loadingAll, data: dataAll } = useQuery(QUERY_PRODUCTS);
  const { loading: loadingPopular, data: dataPopular } = useQuery(QUERY_POPULAR_PRODUCTS);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (state.currentCategory === "POPULAR") {
      setData(dataPopular)
      setLoading(loadingPopular)
    } else {
      setData(dataAll)
      setLoading(loadingAll)
    }

    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [loadingAll, loadingPopular, dataAll, dataPopular, dispatch]);

  function filterProducts() {
    if (currentCategory === "POPULAR") {
      return dataPopular?.popular || []
    } else {
      if (!currentCategory) {
        return state.products;
      }

      return state.products.filter(
        (product) => product.category._id === currentCategory
      );
    }
  }

  return (
    <div id="product-list" className="my-2">
      <h2>Available items:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            currentCategory === "POPULAR" ? (
              <ProductItemPopular
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                count={product.count}
              />
            ) : (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
              />
            )
          ))}
        </div>
      ) : (
        <h3>You haven't added any items yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
