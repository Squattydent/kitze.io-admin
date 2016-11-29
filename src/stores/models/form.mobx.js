import {observable, computed, extendObservable, autorunAsync} from 'mobx';
import Field from 'stores/models/field.mobx';
import _ from 'lodash';

class Form {
  @observable fields = {};
  @observable validating = false;
  @observable validators;

  @computed get valid() {
    if (this.validating) {
      return false; // consider the form invalid until the validation process finish
    }
    const keys = Object.keys(this.fields);
    return keys.reduce((seq, key) => {
      const field = this.fields[key];
      seq = seq && field.valid;
      return seq;
    }, true);
  }

  clear() {
    this.initializeForm(this.initialState, this.validators)
  }

  fieldKeys() {
    return Object.keys(this.fields);
  }

  validate(setErrors = false) {
    this.validating = true;
    const p = this.fieldKeys().reduce((seq, key) => {
      const field = this.fields[key];
      return seq.then(() => field.validate(true, setErrors));
    }, Promise.resolve());
    p.then(() => (this.validating = false));
    return p
  }

  toJSON() {
    const keys = Object.keys(this.fields);
    return keys.reduce((seq, key) => {
      const field = this.fields[key];
      seq[key] = field.value;
      return seq;
    }, {});
  }

  initializeForm(initialState, validators) {
    const keys = Object.keys(initialState);

    keys.forEach((key) => {
      extendObservable(this.fields, {
        [key]: new Field(this, initialState[key], validators[key])
      });
    });
  }

  populateForm(state) {
    if (state !== undefined) {
      _.each(this.fields, (field, key) => {
        field.value = state[key];
      });
    }
  }

  constructor(initialState = {}, validators = {}) {

    this.initialState = Object.assign({}, initialState);
    this.validators = Object.assign({}, validators);

    this.initializeForm(initialState, validators);

    autorunAsync(() => {
      if (this.onChange) {
        this.onChange(this.valid, this.toJSON());
      }
    }, 100);
  }
}

export default Form;
