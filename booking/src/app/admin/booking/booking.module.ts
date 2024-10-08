import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { AdminnavbarModule } from "../../adminnavbar/adminnavbar.module";


@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    AdminnavbarModule
  ],
  exports: [BookingComponent]
})
export class BookingModule { }
