import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

//data
import {graphql} from 'react-apollo';
import {SignInUserMutation} from './graphql-data';
import {GetUser, GetThoughts} from 'data/graphql-shared';

@inject('store')
@graphql(SignInUserMutation, {name: 'signInUser'})
@graphql(GetThoughts)
@graphql(GetUser)
@observer
class HomePage extends Component {

  componentWillReceiveProps = nextProps => {
    this.props.store.auth.returnUnloggedHome(nextProps);
  }

  render() {
    return (
      <div>
        Welcome to the admin panel!
      </div>
    )
  }
}

export default HomePage;