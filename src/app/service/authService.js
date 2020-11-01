import LocalStorageService from './localstorageService';

export const LOGED_TEACHER = '_loged_teacher';

export default class AuthService {
  static isUserAuthenticated() {
    const user = LocalStorageService.getItem(LOGED_TEACHER);
    return user && user.id;
  }

  static removeAuthenticatedUser() {
    LocalStorageService.clearItem(LOGED_TEACHER);
  }

  static login(user) {
    LocalStorageService.addItem(LOGED_TEACHER, user);
  }

  static getAuthenticatedUser() {
    return LocalStorageService.getItem(LOGED_TEACHER);
  }
}
