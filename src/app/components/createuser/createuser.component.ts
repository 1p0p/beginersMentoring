import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersApiServiceService } from '../../service/users-api-service.service';
import { IUser } from '../../models/users.model';




import { MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from  '@angular/material/icon' ;
import {MatInputModule} from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-createUser',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,

    RouterOutlet, MatDialogModule, MatInputModule
  ,MatButtonModule,MatIconModule
  ], // для [formGroup]
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.scss'
})
export class CreateuserComponent {
  form = new FormGroup({
    userName: new FormControl<string>('', [
      Validators.required, Validators.minLength(6)
    ]),
    city: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<string>('')
  })

  constructor(
    private usersApiServiceService: UsersApiServiceService
  ){}

  get userName(){
    return this.form.controls.userName as FormControl;
  }

private getMaxIdUsers(users?:IUser[]) : string{
  return users ?
    String(Math.max(...users.map((user:IUser)=>+user.id))+1)
    : '0';
}

submit(){
    // console.log(this.form.controls.userName)
    this.usersApiServiceService.create({
      id: this.getMaxIdUsers(),
      name: this.form.value.userName as string,
      email: this.form.value.email as string,
      address: {
        city: this.form.value.city as string,
        street: '',
        suite: '',
        zipcode: '',
        geo: {
          lat: '',
          lng: ''
        }
      },
      phone: this.form.value.phone as string,
      username: '',
      website: '',
      company: {
        name: '',
        catchPhrase: '',
        bs: ''
      }
    })
    //если не подписаться то данные не уйдут
    .subscribe(()=>{});
    console.log(this.form.value)
  }
}
