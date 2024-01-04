import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  private token: string = 'usersToken';
  constructor() { }

  //localStorage.getItem('usersToken');
  getItem(): string | null {
    return localStorage.getItem(this.token) || null;
  }

  setItem(data: string): string {
    localStorage.setItem(this.token, data);
    return data;
  }

  //localStorage.removeItem('usersToken');
  removeItem(): boolean {
    localStorage.removeItem(this.token);
    return true;
  }

}
