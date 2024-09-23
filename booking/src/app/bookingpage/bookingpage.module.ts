import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingpageRoutingModule } from './bookingpage-routing.module';
import { BookingpageComponent } from './bookingpage.component';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from "../navbar/navbar.module";


@NgModule({
  declarations: [BookingpageComponent],
  imports: [
    CommonModule,
    BookingpageRoutingModule,
    FormsModule,
    NavbarModule
  ],
  exports: [BookingpageComponent]
})
export class BookingpageModule { }
