import data from './data';

import drawItems from './drawItems';
import addItem from './addItem';
import resetFields from './resetFields';
import hideElements from './hideElements';
import showElements from './showElements';
import removeFromLocalStorage from './removeFromLocalStorage';
import getFromLocalStorage from './getFromLocalStorage';
import setToLocalStorage from './setToLocalStorage';

// Elements
let $items = document.getElementsByTagName('tbody')[0];

const $addBtn = document.getElementById('add');
const $popup = document.getElementById('goods__popup');

const $form = document.getElementById('form');
const $title = document.getElementById('title');
const $titleError = document.getElementById('title-error');
const $price = document.getElementById('price');
const $priceError = document.getElementById('price-error');
const $cancelBtn = document.getElementById('cancel');

let $editBtns = document.getElementsByClassName('edit');
let $delBtns = document.getElementsByClassName('del');

// Flags
let isEdit = false;
let itemIndex = null;

const addListenersToBtns = () => {
  $editBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      isEdit = true;

      const parent = event.target.closest('.goods__item');
      const title = parent.querySelector('#product__title').textContent.trim();
      const price = +parent.querySelector('#product__price').textContent.trim();
      showElements([$popup]);

      $title.value = title;
      $price.value = price;
      itemIndex = [...$items.querySelectorAll('.goods__item')].indexOf(parent);
    });
  });

  $delBtns.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();

      const parent = event.target.closest('.goods__item');
      itemIndex = [...$items.querySelectorAll('.goods__item')].indexOf(parent);
      data.splice(itemIndex, 1);
      parent.remove();
    });
  });
};

drawItems(data, $items);
addListenersToBtns();

// Events
// Show popup
$addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const fields = getFromLocalStorage('fields');

  if (fields) {
    $title.value = fields.title;
    $price.value = fields.price;
  }

  showElements([$popup]);
  hideElements([$titleError, $priceError]);
});

// Form listeners
$form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!$title.value && !$price.value) {
    showElements([$titleError, $priceError]);
    return;
  }

  if (!$title.value) {
    showElements([$titleError]);
    return;
  }

  if (!$price.value) {
    showElements([$priceError]);
    return;
  }

  if (+$price.value <= 0 || !+$price.value) {
    $priceError.textContent = 'Стоимость должна быть позитивным числом!';
    showElements([$priceError]);
    return;
  }

  if (isEdit) {
    data[itemIndex].title = $title.value;
    data[itemIndex].price = +$price.value;

    isEdit = false;
  } else {
    addItem(data, {
      title: $title.value,
      price: +$price.value,
    });
  }

  drawItems(data, $items);

  resetFields([$title, $price]);

  hideElements([$titleError, $priceError, $popup]);

  removeFromLocalStorage('fields');

  $items = document.getElementById('goods__list');
  $editBtns = document.getElementsByClassName('edit');
  $delBtns = document.getElementsByClassName('del');

  addListenersToBtns();
});

// Cancel listener
$cancelBtn.addEventListener('click', (event) => {
  event.preventDefault();

  hideElements([$popup]);
});

// Title input to localStorage
$title.addEventListener('input', () => {
  if ($title.value === '') {
    $titleError.textContent = 'Поле Название не может быть пустым!';
    showElements([$titleError]);
    return;
  }

  const fields = {
    title: $title.value.trim(),
    price: +$price.value,
  };

  setToLocalStorage('fields', fields);

  hideElements([$titleError]);
});

// Price input to localStorage
$price.addEventListener('input', () => {
  if (+$price.value <= 0 || $price.value === '' || !+$price.value) {
    $priceError.textContent = 'Стоимость должна быть позитивным числом!';
    showElements([$priceError]);
    return;
  }

  const fields = {
    title: $title.value.trim(),
    price: +$price.value,
  };

  setToLocalStorage('fields', fields);

  hideElements([$priceError]);
});
