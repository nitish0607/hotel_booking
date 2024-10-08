import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationdetailComponent } from './reservationdetail.component';

const routes: Routes = [
  {
    path: '',
    component: ReservationdetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationdetailRoutingModule { }
