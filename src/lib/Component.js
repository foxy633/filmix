import { navigate } from './Router';
const ROOT_ELEMENT_SELECTOR = '#wrapper';

const RenderComponent = async (
  renderFunction,
  params = null,
  query = null,
  rootElementSelector = ROOT_ELEMENT_SELECTOR,
) => {
  const rootElement = document.querySelector(rootElementSelector);
  const template = await renderFunction(params, query);
  rootElement.innerHTML = template;
  rootElement.addEventListener('click', linkClickHandler);
};

const linkClickHandler = event => {
  //debugger;
  const aRef = event.target.closest('a');
  if (aRef && aRef.getAttribute('href').substr(0, 1) === '/') {
    event.preventDefault();
    navigate(aRef.getAttribute('href'));
  }
};

export default RenderComponent;
