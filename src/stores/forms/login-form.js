import {required, requiredEmail} from 'utils/form-validation-utils.js';
import {exportForm} from 'utils/form-utils';

const fields = {
  email: '',
  password: ''
};

const validations = {
  email: requiredEmail(),
  password: required(),
};

export default exportForm(fields, validations);