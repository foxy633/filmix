import templateHeader from '../templates/header.hbs';
import templateSectionCards from '../templates/section__cards.hbs';
import templateFooter from '../templates/footer.hbs';

import pagination from './pagination';
import theme from './theme';

const init = (data = null, url = '#') => {
  const duffElem = document.createElement('div');

  duffElem.insertAdjacentHTML('beforeend', templateHeader());
  duffElem.insertAdjacentHTML('beforeend', '<main class="main"></main>');
  if (data) {
    const mainRef = duffElem.querySelector('.main');
    const { results } = data;
    mainRef.insertAdjacentHTML('beforeend', templateSectionCards(results));
    mainRef.insertAdjacentHTML('beforeend', pagination(data, url));
  }
  duffElem.insertAdjacentHTML('beforeend', templateFooter());

  const maximal = 2500;

  const review = duffElem.querySelectorAll('.review');

  review.forEach(elem => {
    const popularity = elem.querySelector('.icon-container');
    let percent = Math.trunc(
      (parseInt(popularity.textContent) * 100) / maximal,
    );
    popularity.textContent = Math.trunc(percent / 10);
    const progressElem = elem.querySelector('.progress-done');
    progressElem.dataset.done = percent + '★';
    progressElem.style.width = percent + '%';
    elem.querySelector('.percent').textContent = percent + '%';

    // console.log(percent);
  });

  return duffElem.innerHTML;
};
export default init;
