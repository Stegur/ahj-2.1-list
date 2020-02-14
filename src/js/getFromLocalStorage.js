const getFromLocalStorage = (field) => {
  const data = JSON.parse(localStorage.getItem(field));

  if (!data) {
    return false;
  }

  return data;
};

export default getFromLocalStorage;
