import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewHotelRoutingModule } from './view-hotel-routing.module';
import { ViewHotelComponent } from './view-hotel.component';
import { ViewRoomModule } from "../view-room/view-room.module";


@NgModule({
  declarations: [ViewHotelComponent],
  imports: [
    CommonModule,
    ViewHotelRoutingModule,
    ViewRoomModule,
  ],
  exports: [ViewHotelComponent]
})
export class ViewHotelModule { }
