import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelloginRoutingModule } from './hotellogin-routing.module';
import { HotelloginComponent } from './hotellogin.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HotelloginComponent],
  imports: [
    CommonModule,
    HotelloginRoutingModule,
    ReactiveFormsModule
  ],
  exports: [HotelloginComponent]
})
export class HotelloginModule { }
