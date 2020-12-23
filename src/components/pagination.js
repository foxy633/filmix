import templateSectionPagination from '../templates/section__pagination.hbs';
import paginationList from '../templates/navigation_list.hbs';

const MEDIA_Medium = 768;
const MEDIA_MediumQuery = `(max-width: ${MEDIA_Medium - 1}px)`;

const init = (obj, url) => {
  const { page, total_pages: totalPages } = obj;

  if (totalPages <= 1) {
    return '';
  }

  const buffElem = document.createElement('div');

  buffElem.insertAdjacentHTML('beforeend', templateSectionPagination());

  let lists = buffElem.querySelector('.numpage__lists');
  let parentList = buffElem.querySelector('.numpage');
  let rightArrow = buffElem.querySelector('.numpage__right-arrow');
  let leftArrow = buffElem.querySelector('.numpage__left-arrow');

  if (page === totalPages) {
    rightArrow.remove();
  } else {
    rightArrow
      .querySelector('.arrow')
      .setAttribute('href', `/${url}page=${page + 1}`);
  }
  if (page === 1) {
    leftArrow.remove();
  } else {
    leftArrow
      .querySelector('.arrow')
      .setAttribute('href', `/${url}page=${page - 1}`);
  }

  if (totalPages > 1) {
    if (window.matchMedia(MEDIA_MediumQuery).matches) {
      //логика мобильной пагинации
      for (let i = page - 2; i <= page + 2 && i <= totalPages; i++) {
        if (i >= 1) {
          lists.insertAdjacentHTML(
            'beforeend',
            paginationList({ page: i, url, more: true }),
          );
        }
      }
    } else {
      //логика таблетки и выше
      lists.insertAdjacentHTML(
        'beforeend',
        paginationList({ page: 1, url, more: true, class: 'media-hidden' }),
      );

      for (let i = page - 3; i <= page + 3; i++) {
        if (i <= 1 || i >= totalPages) {
        } else {
          if (i === page - 3 || i === page + 3) {
            lists.insertAdjacentHTML(
              'beforeend',
              paginationList({
                class: 'numpage__more media-hidden',
                page: '...',
                url,
                more: false,
              }),
            );
          } else {
            lists.insertAdjacentHTML(
              'beforeend',
              paginationList({
                page: i,
                url,
                more: true,
              }),
            );
          }
        }
      }
      lists.insertAdjacentHTML(
        'beforeend',
        paginationList({
          page: totalPages,
          url,
          more: true,
          class: 'media-hidden',
        }),
      );
    }
  }

  const itemsRefs = buffElem.querySelectorAll('.numpage__list-item');
  itemsRefs.forEach(element => {
    if (element.textContent == page) {
      element.classList.add('item__border-active');
      element.dataset.total = totalPages;
    }
  });
  return buffElem.innerHTML;
};

export default init;

export const addEventHandlers = () => {
  // debugger;
  //const queryParams = new URLSearchParams(window.location.pathname);
  //const dd = queryParams.get('page');
  const mediaQuery = window.matchMedia(MEDIA_MediumQuery);

  const urlPart = window.location.hash.split('?')[0];

  mediaQuery.addListener(event => {
    const paginationRef = document.querySelector('#pagination');
    const pageRef = paginationRef.querySelector('.item__border-active');
    if (pageRef) {
      paginationRef.outerHTML = init(
        {
          page: +pageRef.textContent,
          total_pages: +pageRef.dataset.total,
        },
        urlPart + '?',
      );
    }
  });

  //место для функции проскроливания вверх при переключениии страницы
};
