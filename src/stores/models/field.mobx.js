import {observable, computed} from 'mobx';

class Field {
  @observable _value;
  @observable _interacted = false;
  @observable _valid = false;
  @observable _touched = false;
  @observable _focused = false;
  @observable errorMessage;

  _originalErrorMessage;

  markAsTouch() {
    if (this._touched === false && this._interacted === true) {
      this._touched = true;
    }
  }

  markAsFocused(value) {
    this.markAsTouch();
    this._focused = value;
  }

  @computed get valid() {
    return this._valid;
  }

  get value() {
    return this._value;
  }

  get focused() {
    return this._focused;
  }

  set touched(touched) {
    this._touched = touched;
  }

  set focused(touched) {
    this._touched = touched;
  }

  get touched() {
    return this._touched;
  }

  get interacted() {
    return this._interacted;
  }

  set value(val) {
    if (this._interacted === false && val !== undefined) {
      this._interacted = true;
    }
    this._value = val;

    this.validate();
  }

  validate(force = false, setError = true) {
    if (!this._validateFn) {
      return;
    }

    if (!force && !this._interacted) {
      // if we're not forcing the validation
      // and we haven't interacted with the field
      // we asume this field pass the validation status
      this._valid = true;
      this.errorMessage = '';
      return;
    }
    const res = this._validateFn(this, this.model.fields);

    // if the function returned a boolean we assume it is
    // the flag for the valid state
    if (typeof res === 'boolean') {
      this._valid = res;
      if (setError === true) {
        this.errorMessage = res ? '' : this._originalErrorMessage;
      }
      return;
    }

    // otherwise we asumme we have received a promise
    const p = Promise.resolve(res);
    return new Promise((resolve) => { // eslint-disable-line consistent-return
      p.then(
        () => {
          this._valid = true;
          this.errorMessage = '';
          resolve(); // we use this to chain validators
        },
        ({error} = {}) => {
          this.errorMessage = (error || '').trim() || this._originalErrorMessage;
          this._valid = false;
          resolve(); // we use this to chain validators
        });
    });
  }

  constructor(model, value, validatorDescriptor = {}) {
    this.model = model;
    this.value = value;
    this._originalErrorMessage = validatorDescriptor.errorMessage;
    const resolvePromise = () => Promise.resolve();
    this._validateFn = validatorDescriptor.fn || resolvePromise;
    this.validate(true, false);
  }
}

export default Field;