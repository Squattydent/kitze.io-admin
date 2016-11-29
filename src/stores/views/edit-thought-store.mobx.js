import GetNewThoughtForm from 'stores/forms/new-thought-form';
import store from 'stores/store';
import views from 'config/views';

class EditThoughtStore {
  form = GetNewThoughtForm();

  postThought = (postThoughtMutation) => {
    postThoughtMutation({variables: this.form.toJSON()}).then(this.goToThoughts);
  }

  updateThought = (updateThoughtMutation, id) => {
    updateThoughtMutation({variables: {...this.form.toJSON(), ...{id}}}).then(this.goToThoughts);
  }

  goToThoughts = () => {
    store.router.goTo(views.thoughts, {}, store);
  }
}

export default EditThoughtStore;