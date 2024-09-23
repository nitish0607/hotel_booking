import { Component } from '@angular/core';
import { ApplicationService } from 'src/app/application.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

  adminform: any;
  successAlert: boolean = false;

  constructor(private service: ApplicationService, private _form: FormBuilder, private _routes: Router) {
    this.adminform = this._form.group({
      email: [],
      password: []
    })
  }

  login() {
    this.service.logindata(this.adminform.value, (response: any) => {
      if (response.status == 200) {
        console.log(response.data, "LoginResponse");
        this.adminform.reset();
        this.successAlert = true;
        this.autoDismissAlert();
        if (response.data.role == 'admin') {
          this._routes.navigate(['/booking']);
        }

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
