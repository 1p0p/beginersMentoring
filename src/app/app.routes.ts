import { Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';

export const routes: Routes = [
    {path:'', redirectTo: 'users', pathMatch:'full'}, // redirect - первая страница которя будет открываться
    {path:'users', component: UsersListComponent}
];

