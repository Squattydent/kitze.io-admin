import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {bindField, onEnter, autofocus} from 'utils/input-utils';

//data
import {graphql} from 'react-apollo';
import {SignInUserMutation} from './graphql-data';
import {GetUser} from 'data/graphql-shared';

@inject('store')
@graphql(SignInUserMutation, {name: 'signInUser'})
@graphql(GetUser)
@observer
class LoginPage extends Component {

  componentWillReceiveProps = nextProps => {
    this.props.store.auth.returnLoggedHome(nextProps);
  }

  login = () => {
    const {auth} = this.props.store
    const {signInUser} = this.props;
    auth.login(signInUser);
  }

  render() {
    const {store} = this.props;
    const {auth} = store;
    const {loginForm} = auth;
    const {fields: {email, password}} = loginForm;
    const {loading} = auth;

    return (
      <div>
        {loading && <div> Loading </div>}
        {!loading && <div>
          <input {...bindField(email)} {...autofocus} type="text" placeholder="email"/>
          <br/>
          <input {...bindField(password)} {...onEnter(this.login)} type="password" placeholder="password"/>
          <br/>
          <button disabled={!loginForm.valid} onClick={this.login}> Login</button>
        </div>
        }
      </div>
    )
  }
}

export default LoginPage;