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
import { HotelloginModule } from './hotellogin/hotellogin.module';
import { AdminnavbarModule } from './adminnavbar/adminnavbar.module';
import { ManagehotelModule } from './managehotel/managehotel.module';
import { ReservationdetailModule } from './reservationdetail/reservationdetail.module';
import { HotelnavbarModule } from './hotelnavbar/hotelnavbar.module';
import { ManageroomsModule } from './managerooms/managerooms.module';




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
    ThankyouModule,
    HotelloginModule,
    AdminnavbarModule,
    ManagehotelModule,
    ReservationdetailModule,
    HotelnavbarModule,
    ManageroomsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
