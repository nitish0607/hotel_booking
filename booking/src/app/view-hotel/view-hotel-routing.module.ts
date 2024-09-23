import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewHotelComponent } from './view-hotel.component';

const routes: Routes = [
  {
    path: '',
    component: ViewHotelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewHotelRoutingModule { }
