import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import views from 'config/views';

//styled-components
import {Page} from './styles';

@inject('store')
@observer
class Sidebar extends Component {
  render() {

    const {store} = this.props;
    const {router} = store;
    const {currentView} = router;

    return (
      <div>
        <h1> Pages </h1>
        <Page
          onClick={() => router.goTo(views.thoughts, {}, store)}
          active={views.thoughts.id === currentView.id}>
          Thoughts
        </Page>
      </div>
    )
  }
}

export default Sidebar;