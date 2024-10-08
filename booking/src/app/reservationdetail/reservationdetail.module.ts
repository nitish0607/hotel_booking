import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationdetailRoutingModule } from './reservationdetail-routing.module';
import { ReservationdetailComponent } from './reservationdetail.component';

@NgModule({
  declarations: [ReservationdetailComponent],
  imports: [
    CommonModule,
    ReservationdetailRoutingModule
  ],
  exports: [ReservationdetailComponent]
})
export class ReservationdetailModule { }
