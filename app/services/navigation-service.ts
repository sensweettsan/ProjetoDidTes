import { Frame } from '@nativescript/core';
import { User } from '../models/user';

export class NavigationService {
  static navigateToHome(user: User) {
    const page = user.role === 'admin' ? 'views/admin/admin-page' : 'views/instructor/instructor-page';
    Frame.topmost().navigate({
      moduleName: page,
      clearHistory: true
    });
  }

  static navigateToLogin() {
    Frame.topmost().navigate({
      moduleName: 'views/auth/login-page',
      clearHistory: true
    });
  }

  static logout() {
    global.userModel.currentUser = null;
    this.navigateToLogin();
  }
}