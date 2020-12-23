'use strict';
import templateSlider from '../templates/section_slider.hbs';

const init = data => {
  const filterData = data.filter(filmObj => filmObj.backdrop_path !== null);
  const duffElem = document.createElement('div');

  duffElem.insertAdjacentHTML('beforeend', templateSlider(filterData));
  duffElem.getElementsByClassName('left').onclick = slideClick;
  function slideClick() {
    const polosa = duffElem.getElementsByClassName('slider__lists');
    polosa.style.left = -900 + 'px';
  }

  return duffElem.innerHTML;
};

export default init;
