import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageroomsRoutingModule } from './managerooms-routing.module';
import { ManageroomsComponent } from './managerooms.component';
import { HotelnavbarModule } from "../hotelnavbar/hotelnavbar.module";
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManageroomsComponent],
  imports: [
    CommonModule,
    ManageroomsRoutingModule,
    HotelnavbarModule,
    ReactiveFormsModule
  ],
  exports: [ManageroomsComponent]
})
export class ManageroomsModule { }
