import { Component } from '@angular/core';
import { ApplicationService } from '../application.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  logindata: any;
  signupdata: any;
  successAlert: boolean = false;
  offAlert: boolean = false;
  isLoggedIn: boolean = false;
  Logout: any;
  responsealertMsg: any;
  loader: boolean = false;
  showModal: boolean = false;

  constructor(private service: ApplicationService, private _form: FormBuilder, private _routes: Router) {

    this.signupdata = this._form.group({
      name: [],
      email: [],
      phone_number: [],
      password: []
    });

    this.logindata = this._form.group({
      email: [],
      password: []
    });

  }

  ngOnInit() {
    this.isLoggedIn = JSON.parse(<any>localStorage.getItem("isLoggedIn"));
  }

  getsignupdata() {
    this.loader = true;
    this.service.signupData(this.signupdata.value, (response: any) => {
      if (response.status == 200) {
        console.log(response);
        this.loader = false;
        this.successAlert = true;
        this.responsealertMsg = response.message;
        this.signupdata.reset();
        this.autoDismissAlert();
      }
      else {
        // Display error alert when login fails
        this.offAlert = true;
        this.responsealertMsg = response.message;
        this.loader = false;
        this.autoDismissAlert();  // autometically close after given time 
      }
    });
    console.log(this.signupdata.value, "signupdata");


  }

  getLogin() {
    this.loader = true;
    this.service.logindata(this.logindata.value, (response: any) => {
      if (response.status == 200) {
        this.isLoggedIn = true;
        this.loader = false;
        this.showModal = false;
        this.logindata.reset();
        this.successAlert = true;
        this.responsealertMsg = response.message;
        this.autoDismissAlert();
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userId", JSON.stringify(response.data.user_id));
        window.location.reload();
      } else {
        this.offAlert = true;
        this.responsealertMsg = response.message;
        this.autoDismissAlert();
        this.loader = false;
      }
    });
  }


  autoDismissAlert() {
    setTimeout(() => {
      this.successAlert = false;
      this.offAlert = false;
    }, 3000); // 3000 ms = 3 seconds
  }

  closeModal() {
    this.showModal = false;
    this.signupdata.reset();
    this.logindata.reset();
  }



}
