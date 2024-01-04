import { Injectable } from '@angular/core';
import { IUser } from '../models/users.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, delay, throwError, catchError, retry, tap, from, of} from 'rxjs'
import { ErrorService } from './error.service';
import { JsonService } from './json.service';

// предоставляете услугу на корневом уровне, Angular создает единственный общий экземпляр 
//HeroServiceи внедряет его в любой класс, который его запрашивает
@Injectable({
  providedIn:  'root' //-ограиничиваем действие сервиса ;'root' 
})
export class UsersApiServiceService {
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';
  users: IUser[] = [];
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private json: JsonService
  ) {}


  getUsers(): Observable<IUser[]>{
    let usersJson:IUser[] = this.json.getUsersJSON();
    if(usersJson.length===0)
      return this.getUsersBack(); // подписываемся сразу в шаблоне через пайп
    
    //получение данных из localStore
    const observable$ : Observable<IUser[]> = of(usersJson).pipe(
      tap((users:IUser[])=>this.users = users)
    );
    // const subscription = observable.subscribe((x) => console.log(x));
    return observable$;
  }

  getUsersBack (): Observable<IUser[]>{
    return this.http.get<IUser[]>(this.usersUrl,{})
    .pipe(
      tap((user : IUser[])=> this.users = user),
      retry(2),
      tap(()=>this.saveToLocalStore()),
      // tap(users=>this.users = users), //?????????????
      catchError(this.errorHandler.bind(this))
      // tap((user:IUser)=>console.log(user))
    );
    
  }

  private errorHandler(error: HttpErrorResponse){
    this.errorService.handle(error.message);//?
    return throwError(()=>error.message);
  }
  
  create(user: IUser):Observable<IUser>{
    return this.http.post<IUser>(this.usersUrl, user)
      .pipe(
        tap(user=> this.users.push(user)),
        tap(()=>this.saveToLocalStore()) 
      );
  }

  delete(user: IUser) {  //: Observable<IUser[]>
    let index = this.users.indexOf(user);
    // return this.http.delete<IUser>(this.usersUrl).pipe(
    //   tap(user=>this.users.splice(index,1))
    // );
    this.users.splice(index,1);
    this.saveToLocalStore();
    return this.users;
  }

  change(newUser: IUser){ 
    //обновить данные через HttpClient
    let u = this.users.filter(user=> user.id===newUser.id)[0];
    let index = this.users.indexOf(u);
    // return this.http.put(this.usersUrl, newUser).pipe(
    //   tap(user=> {
    //     console.log(user)
    //     this.users.splice(Number(index)-1, 1, newUser)})
    //   // catchError(this.handleError('updateHero', hero))
    // )
    this.users.splice(index, 1, newUser);
    
    this.saveToLocalStore();

    return  this.users;
  }

  saveToLocalStore(){
    this.json.toJSON(this.users);
  }

}
