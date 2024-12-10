import { Observable } from '@nativescript/core';

export type UserRole = 'admin' | 'instructor';

export interface User {
  id: string;
  name: string;
  registration: string;
  role: UserRole;
}

export class UserModel extends Observable {
  private _currentUser: User | null = null;

  get currentUser(): User | null {
    return this._currentUser;
  }

  set currentUser(value: User | null) {
    if (this._currentUser !== value) {
      this._currentUser = value;
      this.notifyPropertyChange('currentUser', value);
    }
  }
}