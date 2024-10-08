import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingModule } from './admin/booking/booking.module';
import { AdminloginModule } from './admin/adminlogin/adminlogin.module';
import { ThankyouModule } from './thankyou/thankyou.module';
import { AdminnavbarModule } from './adminnavbar/adminnavbar.module';
import { ManagehotelModule } from './managehotel/managehotel.module';
import { ReservationdetailModule } from './reservationdetail/reservationdetail.module';
import { HotelloginModule } from './hotellogin/hotellogin.module';
import { HotelnavbarModule } from './hotelnavbar/hotelnavbar.module';
import { ManageroomsModule } from './managerooms/managerooms.module';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./bookingpage/bookingpage.module").then(m => m.BookingpageModule)
  },
  {
    path: 'book/:id',
    loadChildren: () => import("./view-hotel/view-hotel.module").then(m => m.ViewHotelModule)
  },
  {
    path: 'viewroom/:room_id',
    loadChildren: () => import("./view-room/view-room.module").then(m => m.ViewRoomModule)
  },
  {
    path: 'booking',
    loadChildren: () => import("./admin/booking/booking.module").then(m => BookingModule)
  },
  {
    path: 'adminlogin',
    loadChildren: () => import("./admin/adminlogin/adminlogin.module").then(m => AdminloginModule)
  },
  {
    path: 'thankyou',
    loadChildren: () => import("./thankyou/thankyou.module").then(m => ThankyouModule)
  },
  {
    path: 'adminnavbar',
    loadChildren: () => import("./adminnavbar/adminnavbar.module").then(m => AdminnavbarModule)
  },
  {
    path: 'managehotel',
    loadChildren: () => import("./managehotel/managehotel.module").then(m => ManagehotelModule)
  },
  {
    path: 'reservationdetail',
    loadChildren: () => import("./reservationdetail/reservationdetail.module").then(m => ReservationdetailModule)
  },
  {
    path: 'hotellogin',
    loadChildren: () => import("./hotellogin/hotellogin.module").then(m => HotelloginModule)
  },
  {
    path: 'hotelnavbar',
    loadChildren: () => import("./hotelnavbar/hotelnavbar.module").then(m => HotelnavbarModule)
  },
  {
    path: 'managerooms',
    loadChildren: () => import("./managerooms/managerooms.module").then(m => ManageroomsModule)
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
