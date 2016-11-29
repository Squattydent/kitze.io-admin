import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';

//data
import {graphql} from 'react-apollo';
import {UpdateThoughtMutation, GetThoughtQuery, options} from './data';

//components
import ThoughtForm from 'components/ThoughtForm';

@inject('store')
@graphql(GetThoughtQuery, {options})
@graphql(UpdateThoughtMutation, {name: 'updateThoughtMutation'})
@observer
class EditThought extends Component {

  componentDidMount = () => {
    this.props.store.editThought.form.clear();
  }

  componentWillReceiveProps = (nextProps) => {
    const {data:{Thought}} = nextProps;
    if (Thought) {
      this.props.store.editThought.form.populateForm(Thought);
    }
  }

  render() {

    const {updateThoughtMutation, store, data} = this.props;
    const {editThought} = store;
    const {form} = editThought;

    return (
      <div>
        <ThoughtForm/>
        <br/>
        {data.Thought && <button
          disabled={!form.valid}
          onClick={() => editThought.updateThought(updateThoughtMutation, data.Thought.id)}>
          Edit
        </button>
        }
      </div>
    )
  }
}

export default EditThought;