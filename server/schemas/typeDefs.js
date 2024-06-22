const typeDefs = `
  type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type User {
    username: String
    email: String
    password: String
    savedBooks: [Book]
  }

  type Auth {
    token: String
    user: User
  }


  type Query {
    getMe: User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(username: String, email: String, password: String!): Auth
    save(authors: [String], description: String, bookId: String, image: String, link: String, title: String): User
    delete(bookId: String!): User
  }
`;

module.exports = typeDefs;
