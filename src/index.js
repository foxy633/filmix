import './styles/index.scss';

import initRouter from './lib/Router';

const initApp = () => {
  initRouter();
};

window.addEventListener('load', initApp);
