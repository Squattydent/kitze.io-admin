import {CONSTANTS} from 'config/constants';
import store from 'stores/store';
import views from 'config/views';
import _ from 'lodash';
import GetLoginForm from 'stores/forms/login-form';

class AuthStore {

  loginForm = GetLoginForm();

  login = (signInUser) => {
    signInUser({variables: this.loginForm.toJSON()}).then(this.onLogin);
  }

  onLogin = ({data}) => {
    window.localStorage.setItem(CONSTANTS.TOKEN_KEY, data.signinUser.token);
    store.router.goTo(views.thoughts, {}, store);
    location.reload();
  }

  logout = () => {
    window.localStorage.removeItem(CONSTANTS.TOKEN_KEY);
    location.reload();
  }

  returnUnloggedHome = (nextProps) => {
    const user = _.get(nextProps, 'data.user');
    if (user === null) {
      store.router.goTo(views.home, {}, store);
    }
  }

  returnLoggedHome = (nextProps) => {
    if (_.get(nextProps, 'data.user.id')) {
      store.router.goTo(views.home, {}, store);
    }
  }

}

export default AuthStore;