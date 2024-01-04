import { Component, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';


import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from  '@angular/material/icon' ;
import {MatDividerModule} from  '@angular/material/divider' ;
import {MatInputModule} from '@angular/material/input';
import { RouterOutlet } from '@angular/router';
import { UsersApiServiceService } from '../../service/users-api-service.service';
import { IUser } from '../../models/users.model';



interface DialogData {
  user: IUser
}
@Component({
  selector: 'app-dialog-change-user',
  standalone: true,
  imports: [ ReactiveFormsModule,
    RouterOutlet, MatSlideToggleModule,MatDividerModule, MatDialogModule, MatInputModule//, MatFormField
  ,MatButtonModule,MatIconModule],
  templateUrl: './dialog-change-user.component.html',
  styleUrl: './dialog-change-user.component.scss'
})
export class DialogChangeUserComponent {
  @Input()
  user!: IUser;

  form = new FormGroup({
    userName: new FormControl<string>(''),
    city: new FormControl<string>(''),
    email: new FormControl<string>(''),
    phone: new FormControl<string>('')
  });

  constructor(
    private usersApiServiceService: UsersApiServiceService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData // для передачи user
  ){}

  changeUser(){
    console.log('change User:', this.form.value);
    
     this.usersApiServiceService.change({
          id: this.data.user.id,
          name: this.form.value.userName as string,
          email: this.form.value.email as string,
          address: {
            city: this.form.value.city as string,
            street: this.data.user.address.street,
            suite: this.data.user.address.suite,
            zipcode: this.data.user.address.zipcode,
            geo: {
              lat: this.data.user.address.geo.lat,
              lng: this.data.user.address.geo.lng
            }
          },
          phone: this.form.value.phone as string,
          username: this.data.user.username,
          website: this.data.user.website,
          company: {
            name: this.data.user.company.name,
            catchPhrase: this.data.user.company.catchPhrase,
            bs: this.data.user.company.bs
          }
        })//.subscribe(()=>{});
  }
  
}
