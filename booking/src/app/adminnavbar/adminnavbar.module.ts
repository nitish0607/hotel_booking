import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminnavbarRoutingModule } from './adminnavbar-routing.module';
import { AdminnavbarComponent } from './adminnavbar.component';


@NgModule({
  declarations: [AdminnavbarComponent],
  imports: [
    CommonModule,
    AdminnavbarRoutingModule
  ],
  exports: [AdminnavbarComponent]
})
export class AdminnavbarModule { }
