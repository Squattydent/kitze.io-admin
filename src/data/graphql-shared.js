import gql from 'graphql-tag';

export const GetUser = gql`
    query {
        user {
            id
        }
    }
`;

export const GetThoughts = gql`query {
    allThoughts {
        id
        title
        createdAt
        tags
        slug
    }
}`;