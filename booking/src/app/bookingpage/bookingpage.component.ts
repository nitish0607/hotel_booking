import { Component } from '@angular/core';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-bookingpage',
  templateUrl: './bookingpage.component.html',
  styleUrls: ['./bookingpage.component.css']
})
export class BookingpageComponent {

  date1: any;
  date2: any;
  selectedRoom: any = '';
  selectedAdults: any = '';
  selectedChildren: any = '';
  numDays: any;
  successAlert: boolean = false;
  offAlert: boolean = false;
  responsemsg: any;
  myobj: any = {};
  myavlpropertydata: any = [];


  constructor(private service: ApplicationService) { }



  getdate() {
    let day1 = new Date(this.date1);
    let day2 = new Date(this.date2);
    this.numDays = Math.floor((day2.getTime() - day1.getTime()) / (1000 * 60 * 60 * 24));
    console.log(this.numDays);


    this.myobj = {
      "checkIn": this.date1,
      "checkOut": this.date2,
      "numberOfDays": this.numDays,
      "numberofRoom": this.selectedRoom,
      "numberofAdult": this.selectedAdults,
      "numberofChildren": this.selectedChildren,
      "isloggedIn": false
    }


    this.searchHotel();
    localStorage.setItem("bookingdata", JSON.stringify(this.myobj));

  }

  onSelectionroomChange() {
    console.log(this.selectedRoom);
  }

  onSelectionadultChange() {
    console.log(this.selectedAdults);
  }

  onSelectionchildrenChange() {
    console.log(this.selectedChildren);

  }

  searchHotel() {
    this.service.searchHotelData(this.myobj, (response: any) => {
      if (response.status == 200 && response.data.length > 0) {
        this.myavlpropertydata = response.data;
        this.successAlert = true;
        this.responsemsg = response.message;
        this.autoDismissAlert();
      }
      else {
        this.offAlert = true;
        this.responsemsg = response.message;
        this.autoDismissAlert();

      }
      console.log(this.myavlpropertydata);
      console.log(response);



    })
  }

  autoDismissAlert() {
    setTimeout(() => {
      this.successAlert = false;
      this.offAlert = false;
    }, 3000); // 3000 ms = 3 seconds
  }


}
