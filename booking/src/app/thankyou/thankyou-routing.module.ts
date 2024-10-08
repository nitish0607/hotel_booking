import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankyouComponent } from './thankyou.component';

const routes: Routes = [
  {
    path: '',
    component: ThankyouComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThankyouRoutingModule { }
