import { gql } from '@apollo/client';
// TODO: Do i need userId for saveBook and removeBook
export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookId: ID!, $authors: [String], $description: String!, $title: String!, $image: String, $link: String) {
        saveBook(bookId: $bookId, authors: $authors, description: $description, title: $title, image: $image, link: $link) {
            _id
            title
            description
        }
    }
`;

export default REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            title
            description
        }
    }
`;