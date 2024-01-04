import { Injectable } from '@angular/core';
import { IUser } from '../models/users.model';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class JsonService {

  constructor(private localStore: LocalService) {}

  toJSON(users: IUser[]){
    let stringifyJSON = JSON.stringify(users);
    console.log("json: ", stringifyJSON);
    this.localStore.setItem(stringifyJSON);
  }

  //млжет придти null или строка (путая или нет) 
  // -> если null или пкстая строка, то отправить пкстую строку, иначе пребразванный users
  getUsersJSON():IUser[]{
    let users:string | null = this.localStore.getItem();
    let parsedJSON:IUser[] = [];
    if(users !== null){
      parsedJSON = JSON.parse(users!, (key:string, value:IUser)=>value);
      console.log("paresedJSON: ", parsedJSON);
    }
    return parsedJSON;
  }


}
