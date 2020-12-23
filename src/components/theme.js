import storage from '../lib/storage';

const theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const keyTheme = 'Theme';
const ls = new storage();

const init = () => {
  if (!ls.has('keyTheme') || ls.get('keyTheme') === theme.LIGHT) {
    document.querySelector('body').classList.add(theme.LIGHT);
    document.querySelector('#chk').checked = false;
    ls.set('keyTheme', theme.LIGHT);
  } else {
    document.querySelector('body').classList.add(theme.DARK);
    document.querySelector('#chk').checked = true;
  }
  addEventHandlers();
};
export default init;

const addEventHandlers = () => {
  document.querySelector('#chk').addEventListener('change', () => {
    if (document.querySelector('body').classList.contains(theme.LIGHT)) {
      document.querySelector('body').classList.remove(theme.LIGHT);
      document.querySelector('body').classList.add(theme.DARK);
      ls.set('keyTheme', theme.DARK);
    } else if (document.querySelector('body').classList.contains(theme.DARK)) {
      document.querySelector('body').classList.remove(theme.DARK);
      document.querySelector('body').classList.add(theme.LIGHT);
      ls.set('keyTheme', theme.LIGHT);
    }
  });
};
