import gql from 'graphql-tag';

export const ThoughtsQuery = gql`query {
    allThoughts(filter: {published:true}) {
        id
        title
        createdAt
        tags
        slug
    }
}`;

export const DeleteThought = gql`
    mutation deleteBlah($id:ID!){
        deleteThought(id:$id){
            id
        }
    }
`;