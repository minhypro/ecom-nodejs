import _ from 'lodash';

export const pickData = ({ fields = [], object = {} }) => {
  return _.pick(object, fields);
};
