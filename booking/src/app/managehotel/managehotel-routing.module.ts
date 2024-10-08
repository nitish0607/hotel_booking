import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagehotelComponent } from './managehotel.component';

const routes: Routes = [
  {
    path: '',
    component: ManagehotelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagehotelRoutingModule { }
