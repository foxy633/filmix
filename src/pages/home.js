import medb from '../lib/ApiMEDB';
import Build from '../lib/Data-builder';

import { addEventHandlersAllPages } from '../components/EventHandlers';
import baseMarkup from '../components/basemarkup';
import sliderMarkup from '../components/slider';

const init = async (params, query) => {
  //console.log(`params: ${params}`);
  //console.log(`query: ${query}`);
  //debugger;
  let currentPage = 1;

  //---> переписать на адекватный метод <----
  if (!!query) {
    currentPage = query.slice(5);
  }

  const data = await medb.getPopularFilms(currentPage);
  const { genres: genresArr } = await medb.getGenresList(data);
  const results = Build(data, genresArr);

  const sliderData = await medb.getCinemaFilms();
  const sliderResults = Build(sliderData, genresArr).results;

  //const
  //console.log(data);
  //console.log(genresArr);
  //console.log(results);
  //console.log(sliderResults);
  const duffElem = document.createElement('div');
  duffElem.insertAdjacentHTML('beforeend', baseMarkup(results, 'home?'));
  const resfs = {
    header: duffElem.querySelector('.header'),
    main: duffElem.querySelector('.main'),
  };
  resfs.main.insertAdjacentHTML('afterbegin', sliderMarkup(sliderResults));
  resfs.header.querySelector('.search__navLibrary').remove();
  resfs.header.classList.add('header__img-home');
  return duffElem.innerHTML;
};
export default init;

export const addEventHandlers = () => {
  addEventHandlersAllPages();
};

// ++++++++++++++++++++++

function trackScroll() {
  const scrolled = window.pageYOffset;
  const coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goTopBtn.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    goTopBtn.classList.remove('back_to_top-show');
  }
}
function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}
const goTopBtn = document.querySelector('.back_to_top');
window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);

// +++++++++++++++++++++++++
