import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelnavbarRoutingModule } from './hotelnavbar-routing.module';
import { HotelnavbarComponent } from './hotelnavbar.component';


@NgModule({
  declarations: [HotelnavbarComponent],
  imports: [
    CommonModule,
    HotelnavbarRoutingModule
  ],
  exports: [HotelnavbarComponent]
})
export class HotelnavbarModule { }
