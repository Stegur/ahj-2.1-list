/**
 * Hide elements
 * @param  {Array} elements - array of elements to hide
 */
const hideElements = (elements) => {
  elements.forEach((element) => {
    // eslint-disable-next-line no-param-reassign
    element.style.display = 'none';
  });
};

export default hideElements;
