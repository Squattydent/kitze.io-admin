import React, {Component} from 'react';
import {bindField} from 'utils/input-utils';
import {inject, observer} from 'mobx-react';

@inject('store')
@observer
class ThoughtForm extends Component {
  render() {
    const {store} = this.props;
    const {editThought} = store;
    const {form} = editThought;
    const {fields: {title, slug, content, tags, published}} = form;

    return (
      <div>
        <input {...bindField(title)} type="text" placeholder="title"/>
        <br/>
        <input {...bindField(slug)} type="text" placeholder="slug"/>
        <br/>
        <textarea {...bindField(content)} placeholder="content"/>
        <br/>
        <input {...bindField(tags)} type="text" placeholder="tags"/>
        <br/>

        <label>
          <input {...bindField(published)} checked={published.value} type="checkbox" placeholder="tags"/>
          <span> Published </span>
        </label>
      </div>
    )
  }
}

export default ThoughtForm;