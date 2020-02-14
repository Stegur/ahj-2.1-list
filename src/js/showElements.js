/**
 * Show elements
 * @param  {Array} elements - array of elements to show
 */
const showElements = (elements) => {
  elements.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.style.display = 'block';
  });
};

export default showElements;
