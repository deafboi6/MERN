// TODO: Decide if we need type Query 
// TODO: figure out the Book API ID
const typeDefs = `#graphql
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        bookCount: String
        savedBooks: [String]
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
        link: String
    }
    `;
