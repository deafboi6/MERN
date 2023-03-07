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
        saveBook(bookId: String!, authors: [String], description: String!, title: String!, image: String, link: String): User
        removeBook(bookId: String!): User
    }
    `;
    
    module.exports = typeDefs;