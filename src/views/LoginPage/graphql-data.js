import gql from 'graphql-tag';

export const SignInUserMutation = gql`
    mutation createGuide($email: String!, $password: String!) {
        signinUser(email: {email: $email, password: $password}) {
            token
        }
    }
`;