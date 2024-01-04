import { Component, ContentChild, OnInit } from '@angular/core';
import { UsersApiServiceService } from '../../service/users-api-service.service';
import { IUser } from '../../models/users.model';
import { CommonModule } from '@angular/common';
import { UserCardComponent } from '../user-card/user-card.component';
import { Observable } from 'rxjs';
import { CreateuserComponent } from '../createuser/createuser.component';




import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from  '@angular/material/icon' ;
import {MatInputModule} from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { JsonService } from '../../service/json.service';


@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule, 
    UserCardComponent,
    CreateuserComponent,

    RouterOutlet, MatDialogModule, MatInputModule//, MatFormField
    ,MatButtonModule,MatIconModule
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  providers:[
    // UsersApiServiceService
    //ModalUserAddService
  ] //-ограничиваем действие сервиса
})
export class UsersListComponent implements OnInit{
  // users: IUser[] = [];
  users$:Observable<IUser[]> | undefined;

  constructor(
      public usersApiService: UsersApiServiceService,
      private matDialog: MatDialog,
      private json: JsonService
    ){
    // console.log('UsersListComponent.constructor');
  }
  ngOnInit(): void {
    // console.log('ngOnInit')
    /*this.usersApiService.getUsers().subscribe((user:IUser[])=>{
       //this.users = user;
       console.log(user);
     }); */


    this.users$=this.usersApiService.getUsers();// подписываемся сразу в шаблоне через пайп

  }

  openDialog(){
    this.matDialog.open(CreateuserComponent, {
      width: '350px'
    });
  }

  
}
