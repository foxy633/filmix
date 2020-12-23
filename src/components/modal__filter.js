import modalFilter from '../templates/modal__filter.hbs';

const filter = data => {
  const buffElem = document.createElement('div');
  buffElem.insertAdjacentHTML('beforeend', modalFilter(data));
  return buffElem;
};

export default filter;
