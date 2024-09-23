import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookingpageModule } from './bookingpage/bookingpage.module';
import { NavbarModule } from './navbar/navbar.module';
import { HttpClientModule } from '@angular/common/http';
import { ViewHotelModule } from './view-hotel/view-hotel.module';
import { ViewRoomModule } from './view-room/view-room.module';
import { BookingModule } from './admin/booking/booking.module';
import { AdminloginModule } from './admin/adminlogin/adminlogin.module';
import { ThankyouModule } from './thankyou/thankyou.module';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookingpageModule,
    NavbarModule,
    HttpClientModule,
    ViewHotelModule,
    ViewRoomModule,
    BookingModule,
    AdminloginModule,
    ThankyouModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
