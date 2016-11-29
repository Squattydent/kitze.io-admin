import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

//data
import {graphql} from 'react-apollo';
import {PostThoughtMutation} from './data';

//components
import ThoughtForm from 'components/ThoughtForm';

@inject('store')
@graphql(PostThoughtMutation, {name: 'postThoughtMutation'})
@observer
class AddThought extends Component {

  componentDidMount = () => {
    this.props.store.editThought.form.clear();
  }

  render() {

    const {postThoughtMutation, store} = this.props;
    const {editThought} = store;
    const {form} = editThought;

    return (
      <div>
        <ThoughtForm/>
        <br/>
        <button
          disabled={!form.valid}
          onClick={() => editThought.postThought(postThoughtMutation)}>
          Post
        </button>
      </div>
    )
  }
}

export default AddThought;