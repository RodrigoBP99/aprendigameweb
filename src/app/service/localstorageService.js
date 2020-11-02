export default class LocalStorageService {
  static addItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static getItem(key) {
    const item = sessionStorage.getItem(key);
    return JSON.parse(item);
  }

  static clearItem(key) {
    sessionStorage.removeItem(key);
  }
}
