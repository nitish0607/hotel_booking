import { Component } from '@angular/core';
import { ApplicationService } from 'src/app/application.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotellogin',
  templateUrl: './hotellogin.component.html',
  styleUrls: ['./hotellogin.component.css']
})
export class HotelloginComponent {
  hotelloginform: any;

  successAlert: boolean = false;
  responsemsg: any

  constructor(private service: ApplicationService, private _form: FormBuilder, private _routes: Router) {
    this.hotelloginform = this._form.group({
      email: [],
      password: []
    })
  }

  login() {
    this.service.hotellogin(this.hotelloginform.value, (response: any) => {
      if (response.status == 200) {
        console.log(response.data, "LoginResponse");
        this.successAlert = true;
        this.responsemsg = response.message;
        this.hotelloginform.reset();
        this.autoDismissAlert();
        this._routes.navigate(['/hotelnavbar']);
        localStorage.setItem("hotel_id", JSON.stringify(response.data.hotel_id));
      }
      else {
        // this is for false constion alert show
      }

    });

  }

  autoDismissAlert() {
    setTimeout(() => {
      this.successAlert = false;
    }, 3000); // 3000 ms = 3 seconds
  }


}
