import AppStore from 'stores/global/app-store.mobx';
import EditThoughtStore from 'stores/views/edit-thought-store.mobx';
import AuthStore from 'stores/global/auth-store.mobx';
import {RouterStore} from 'mobx-router';

const store = {
  app: new AppStore(),
  auth: new AuthStore(),
  editThought: new EditThoughtStore(),
  router: new RouterStore()
};

export default store;