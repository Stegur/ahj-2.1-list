/**
 * Reset fields values
 * @param  {Array} fields - array of fields to reset
 */
const resetFields = (fields) => {
  fields.forEach((field) => {
    // eslint-disable-next-line no-param-reassign
    field.value = '';
  });
};

export default resetFields;
