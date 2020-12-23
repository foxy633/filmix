import medb from '../lib/ApiMEDB';
import Build from '../lib/Data-builder';

import baseMarkup from '../components/basemarkup';
import { addEventHandlersAllPages } from '../components/EventHandlers';

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
  //console.log(params);
  //console.log(`params: ${query}`);
  // debugger;

  const qweryObj = parseQuery(`${query}`); //${params.action}=
  const data = await medb.getFilmsQuery(qweryObj.request, qweryObj.page);
  const { genres: genresArr } = await medb.getGenresList(data);
  const results = Build(data, genresArr);
  const url = `search?request=${qweryObj.request}&`;

  console.log(data);
  //console.log(genresArr);
  console.log(results);

  const duffElem = document.createElement('div');
  duffElem.insertAdjacentHTML('beforeend', baseMarkup(results, url));

  duffElem.querySelector('.search__navLibrary').remove();
  duffElem.querySelector('header').classList.add('header__img-home');

  return duffElem.innerHTML;
};
export default init;

export const addEventHandlers = () => {
  addEventHandlersAllPages();
};
