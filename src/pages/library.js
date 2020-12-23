import medb from '../lib/ApiMEDB';
import storage from '../lib/storage';
import Build from '../lib/Data-builder';

import baseMarkup from '../components/basemarkup';
import { addEventHandlersAllPages } from '../components/EventHandlers';

const KEY_WATCHED = 'watchedKey';
const KEY_QUEUE = 'queueKey';

const parseQuery = query => {
  const queryArr = query.split('&');
  const resultObj = queryArr.reduce((acc, param) => {
    const key = param.split('=')[0];
    acc[key] = param.split('=')[1];
    return acc;
  }, {});
  if (!resultObj.hasOwnProperty('page')) {
    resultObj.page = 1;
  }
  return resultObj;
};

const init = async (params, query) => {
  //console.log(`params: ${params}`);
  //console.log(`query: ${query}`);
  //debugger;
  const qweryObj = parseQuery(`${query}`);
  let url, key;
  if (params.action === 'queu') {
    url = `library/queu?`;
    key = KEY_QUEUE;
  } else {
    url = `/library/watched?`;
    key = KEY_WATCHED;
  }

  //const qweryObj = parseQuery(`${query}`); //${params.action}=
  //const data = await medb.getFilmsQuery(qweryObj.request, qweryObj.page);

  // let key = KEY_QUEUE;
  const ls = new storage();
  let data;
  if (ls.has(key)) {
    data = await medb.getFilmsArrId(ls.get(key), qweryObj.page);
    const { genres: genresArr } = await medb.getGenresList(data);
    const results = Build(data, genresArr);
  }

  const duffElem = document.createElement('div');
  if (ls.has(key)) {
    duffElem.insertAdjacentHTML('beforeend', baseMarkup(data, url));
  } else {
    duffElem.insertAdjacentHTML('beforeend', baseMarkup());
  }

  duffElem.querySelector('.form-search-library').remove();
  duffElem.querySelector('header').classList.add('header__img-watched');

  return duffElem.innerHTML;
};
export default init;

export const addEventHandlers = () => {
  addEventHandlersAllPages();
};
