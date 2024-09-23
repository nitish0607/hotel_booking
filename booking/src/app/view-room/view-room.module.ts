import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoomRoutingModule } from './view-room-routing.module';
import { ViewRoomComponent } from './view-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NavbarModule } from "../navbar/navbar.module";
import { ThankyouModule } from "../thankyou/thankyou.module";


@NgModule({
  declarations: [ViewRoomComponent],
  imports: [
    CommonModule,
    ViewRoomRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NavbarModule,
    ThankyouModule
  ],
  exports: [ViewRoomComponent]
})
export class ViewRoomModule { }
