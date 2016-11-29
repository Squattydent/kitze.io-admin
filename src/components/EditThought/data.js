import gql from 'graphql-tag';

export const UpdateThoughtMutation = gql`
    mutation updateThought($id: ID!, $content: String!, $published: Boolean!, $title: String!, $slug: String!, $tags: String!){
        updateThought(id: $id,content:$content, title: $title, published: $published, tags: $tags, slug: $slug){
            id
            content
            title
            slug
            published
        }
    }
`;

export const GetThoughtQuery = gql`query($id: ID!) {
    Thought(id: $id) {
        id
        title
        createdAt
        tags
        slug
        content
        published
    }
}`;

export const options = ({store}) => {
  const {id} = store.router.params;
  return {
    variables: {
      id
    }
  }
};