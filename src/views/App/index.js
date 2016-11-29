import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

//data
import {graphql} from 'react-apollo';
import {GetUser} from 'data/graphql-shared';

//styled components
import {Wrapper} from './styles';
import Sidebar from 'components/Sidebar';
import LoginPage from 'views/LoginPage';

@inject('store')
@graphql(GetUser)
@observer
class App extends Component {

  render() {
    const {store, data} = this.props;
    const {router:{currentView}} = store;

    if (!data.user) {
      if (data.loading) {
        return <div>loading... </div>
      }
      return <LoginPage/>
    }

    return (
      <Wrapper>
        <Sidebar/>
        {currentView && currentView.component}
      </Wrapper>
    )
  }
}

export default App;