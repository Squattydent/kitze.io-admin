import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import views from 'config/views';

//data
import {graphql} from 'react-apollo';
import {ThoughtsQuery, DeleteThought} from './data';

@inject('store')
@graphql(ThoughtsQuery)
@graphql(DeleteThought, {name: 'deleteThought'})
@observer
class ThoughtsList extends Component {

  askForDelete = (id) => {
    const {deleteThought} = this.props;
    const result = confirm('Are you sure you want to delete this thought?');
    if (result) {
      deleteThought({variables: {id}})
    }
  }

  render() {

    const {data, store} = this.props;
    const {router} = store;

    return (
      <div>
        <button onClick={() => router.goTo(views.addThought, {}, store)}> Add a thought</button>
        <div>
          {data.allThoughts && <ul>
            {data.allThoughts.map(thought => <li key={thought.id}>
                <span>{thought.title}</span>
                <button onClick={() => router.goTo(views.editThought, {id: thought.id})}>
                  edit
                </button>
                <button onClick={() => this.askForDelete(thought.id)}>
                  delete
                </button>
              </li>
            )}
          </ul>
          }
        </div>
      </div>
    )
  }
}

export default ThoughtsList;