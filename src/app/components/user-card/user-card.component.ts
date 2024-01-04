import { Component, Input } from '@angular/core';
import { IUser } from '../../models/users.model';
import { CommonModule } from '@angular/common';
import { UsersApiServiceService } from '../../service/users-api-service.service';



import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from  '@angular/material/icon' ;
import {MatInputModule} from '@angular/material/input';
import {MatDialog} from '@angular/material/dialog'
import { RouterOutlet } from '@angular/router';
import { DialogChangeUserComponent } from '../dialog-change-user/dialog-change-user.component';



@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule,
    RouterOutlet,  MatDialogModule, MatInputModule//, MatFormField
    ,MatButtonModule,MatIconModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  @Input({required: true}) //
  user!: IUser;

  constructor(
    public usersApiService: UsersApiServiceService,
    private matDialog: MatDialog
  ){}


  openDialog(){
    this.matDialog.open(DialogChangeUserComponent, {
      width: '350px',
      data: {user: this.user}
    })
  }

  changeUser(){}

  deleteUser(){
    return this.usersApiService.delete(this.user);
    // return this.usersApiService.delete(this.user);
  // .subscribe(()=>{
  //     this.modalUserAddService.close()
  //   });
  }

}
