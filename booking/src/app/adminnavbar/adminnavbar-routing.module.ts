import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminnavbarComponent } from './adminnavbar.component';

const routes: Routes = [
  {
    path: '',
    component: AdminnavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminnavbarRoutingModule { }
