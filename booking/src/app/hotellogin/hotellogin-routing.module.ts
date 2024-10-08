import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelloginComponent } from './hotellogin.component';

const routes: Routes = [
  {
    path: '',
    component: HotelloginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelloginRoutingModule { }
