import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminloginRoutingModule } from './adminlogin-routing.module';
import { AdminloginComponent } from './adminlogin.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminloginComponent],
  imports: [
    CommonModule,
    AdminloginRoutingModule,
    ReactiveFormsModule
  ],
  exports: [AdminloginComponent]
})
export class AdminloginModule { }
