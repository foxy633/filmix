export default class storage {
  constructor(storage = true) {
    this._storage = storage;
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  has(key) {
    return this.get(key) !== null;
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  clear() {
    localStorage.clear();
  }

  addDataToLocalStorage(key, dataToAdd) {
    if (this.has(key)) {
      const allValues = this.get(key);

      if (allValues.includes(dataToAdd)) {
        return;
      } else {
        const newId = [...allValues, dataToAdd];
        this.set(key, newId);
      }
    } else {
      this.set(key, [dataToAdd]);
    }
  }

  checkDataInLocalStorage(key, value) {
    if (this.has(key)) {
      const allValues = this.get(key);
      return allValues.includes(value);
    } else {
      return false;
    }
  }

  removeDataFromLocalStorage(key, dataToRemove) {
    const allValues = this.get(key);
    const indexOfChosenData = allValues.indexOf(dataToRemove);
    const newArr = allValues.splice(indexOfChosenData, 1);
    this.set(key, allValues);
  }
}
