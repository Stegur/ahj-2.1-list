/**
 * Draw products into the table
 * @param  {Array} data - Array of products
 * @param  {Node} list - Target node
 */
const drawItems = (data, list) => {
  const table = list;
  table.innerHTML = `<tr class="column__title">
                      <td>Название</td>
                      <td>Стоимость</td>
                      <td>Действия</td>
                    </tr>`;

  return data.forEach((product) => {
    const row = document.createElement('tr');
    row.classList.add('goods__item');

    const title = document.createElement('td');
    const price = document.createElement('td');
    const tools = document.createElement('td');

    title.innerText = product.title;
    title.id = 'product__title';

    price.innerText = product.price;
    price.id = 'product__price';

    tools.classList.add('tools');
    tools.innerHTML = '<a href="#" class="edit">&#x270E;</a> <a href="#" class="del">&#x274C;</a>';

    row.appendChild(title);
    row.appendChild(price);
    row.appendChild(tools);

    list.appendChild(row);
  });
};

export default drawItems;
