import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelnavbarComponent } from './hotelnavbar.component';

const routes: Routes = [
  {
    path: '',
    component: HotelnavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelnavbarRoutingModule { }
