import {required} from 'utils/form-validation-utils.js';
import {exportForm} from 'utils/form-utils';

const fields = {
  title: '',
  content: '',
  tags: '',
  slug: '',
  published: false
};

const validations = {
  title: required(),
  content: required(),
  tags: required(),
  slug: required()
};

export default exportForm(fields, validations);