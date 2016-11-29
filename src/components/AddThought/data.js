import gql from 'graphql-tag';

export const PostThoughtMutation = gql`
    mutation createThought($content: String!, $published: Boolean!, $title: String!, $slug: String!, $tags: String!){
        createThought(content:$content, title: $title, published: $published, tags: $tags, slug: $slug){
            id
            content
            title
            slug
            published
        }
    }
`;