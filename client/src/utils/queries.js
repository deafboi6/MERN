import { gql } from '@apollo/client';

// export const QUERY_ME = gql`
//     query me {
//         me {
//             _id
//             username
//             savedBooks
//         }
//     }
// `;

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                description
                title
            }
        }
    }
`