import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingModule } from './admin/booking/booking.module';
import { AdminloginModule } from './admin/adminlogin/adminlogin.module';
import { ThankyouModule } from './thankyou/thankyou.module';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
