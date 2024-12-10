import { Application } from '@nativescript/core';
import { UserModel } from './models/user';

// Initialize global user model
global.userModel = new UserModel();

Application.run({ moduleName: 'views/auth/login-page' });