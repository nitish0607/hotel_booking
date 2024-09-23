import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'booking';
  url: any;
  pathname: any;
  show: boolean = true;
  constructor() { }

  ngOnInit() {
    this.pathname = window.location.pathname;

    if (this.pathname == "/adminlogin" || this.pathname == "/booking") {
      this.show = false;
    } else {
      this.show = true;
    }

    console.log(this.pathname);
  }


}
