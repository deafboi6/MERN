// TODO: figure out the Book API ID
// TODO: determine if saveBook mutation needs to have the nullable fields in the ()
// TODO: determine if removeBook mutation needs userId
const typeDefs = `#graphql
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        bookCount: String
        savedBooks: [String]
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookId: ID!, authors: [String], description: String!, title: String!, image: String, link: String): User
        removeBook(bookId: ID!): User
    }
    `;
    
    module.exports = typeDefs;