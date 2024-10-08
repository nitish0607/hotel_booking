import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagehotelRoutingModule } from './managehotel-routing.module';
import { ManagehotelComponent } from './managehotel.component';
import { AdminnavbarModule } from "../adminnavbar/adminnavbar.module";
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ManagehotelComponent],
  imports: [
    CommonModule,
    ManagehotelRoutingModule,
    AdminnavbarModule,
    ReactiveFormsModule
  ],
  exports: [ManagehotelComponent]
})
export class ManagehotelModule { }
