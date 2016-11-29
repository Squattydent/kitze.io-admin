import React from 'react';
import {Route} from 'mobx-router';

//components
import HomePage from 'views/HomePage';

//components
import ThoughtsList from 'components/ThoughtsList';
import AddThought from 'components/AddThought';
import EditThought from 'components/EditThought';

const paths = {
  home: new Route({
    id: 'home',
    component: <HomePage/>,
    path: '/'
  }),
  thoughts: new Route({
    id: 'thoughts',
    defaultPage: 'thoughts',
    component: <ThoughtsList/>,
    path: '/thoughts',
  }),
  addThought: new Route({
    id: 'add-thought',
    defaultPage: 'add-thought',
    component: <AddThought/>,
    path: '/add-thought'
  }),
  editThought: new Route({
    id: 'edit-thought',
    defaultPage: 'edit-thought',
    component: <EditThought/>,
    path: '/edit-thought/:id'
  })
};

export default paths;
