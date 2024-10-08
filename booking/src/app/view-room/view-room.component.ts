import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApplicationService } from '../application.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-room',
  templateUrl: './view-room.component.html',
  styleUrls: ['./view-room.component.css']
})
export class ViewRoomComponent {
  data: any;
  roomdata: any;
  roomId: any;
  roomparsedata: any;
  guestLogindata: any;
  guestdata: any;
  hotel_id: any;
  room_id: any;
  total_price: any;
  signupdata: any;
  successAlert: boolean = false;
  offAlert: boolean = false;
  logindata: any;
  isLoggedIn: boolean = false;
  userId: any;
  loader: any = false;
  responsemsg: any;
  payment: any;
  thankyouAlert: boolean = false;
  discountPrice: any = {};
  priceAfterDiscount: any = 0;
  hasDiscount: boolean = false;
  onlyroomprice: any;
  withoutDiscountroomPrice: any;
  roomtotalpricewithgstOnly: any;

  constructor(private route: ActivatedRoute, private service: ApplicationService, private _form: FormBuilder, private _routes: Router) {
    this.guestLogindata = this._form.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone_number: ['', Validators.required],
      payment_mode: ['', Validators.required]
    })

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

    this.roomdata = localStorage.getItem('bookingdata');
    this.roomparsedata = JSON.parse(this.roomdata);
    console.log(this.roomparsedata, "rooomparsedata viewroom");

    this.getroomData();

    this.isLoggedIn = JSON.parse(<any>localStorage.getItem("isLoggedIn"));

    this.userId = JSON.parse(<any>localStorage.getItem("userId"));



  }


  // Method to check if a field is invalid and touched
  isFieldInvalid(field: string): boolean {
    const control = this.guestLogindata.get(field);
    return control && control.invalid && (control.dirty || control.touched);
  }




  getdiscountprice() {
    this.service.getdiscountprice(this.roomId, (response: any) => {
      if (response.status == 200 && response.data.length > 0) {
        this.discountPrice = response.data[0];
        console.log(this.discountPrice, "DISCOUNT");
        this.calculateTotalPrice();
      } else {
        this.calculateTotalPrice();
      }
    })
  }

  calculateTotalPrice() {
    let priceAfterDisc: any = 0;
    let gstPriceFixedPercentage = 5;
    let priceAfterGst = 0;
    if (this.discountPrice?.discount_percentage) {
      this.priceAfterDiscount = (this.roomparsedata.numberOfDays * this.data[0].price_per_night) - ((this.roomparsedata.numberOfDays * this.data[0].price_per_night) * (this.discountPrice.discount_percentage / 100));
    } else {
      this.priceAfterDiscount = this.roomparsedata.numberOfDays * this.data[0].price_per_night;
    }
    priceAfterGst = this.priceAfterDiscount + (this.priceAfterDiscount * (gstPriceFixedPercentage / 100));
    this.total_price = priceAfterGst;


  }




  getroomData() {
    this.route.paramMap.subscribe((params: any) => {
      this.roomId = params.get("room_id");
      this.service.fethchRoomDataOnId(this.roomId, (callback: any) => {
        if (callback.status == 200 && callback.data.length > 0) {
          this.data = callback.data;
          this.getdiscountprice();
        }

      })
    })
  }



  createReservation() {
    this.guestdata = JSON.stringify(this.guestLogindata.value);
    this.payment = this.guestLogindata.value.payment_mode;
    console.log(this.payment, "PAY");
    console.log(this.guestLogindata.value, "guestdata");


    for (const room of this.data) { // this loop is retrived the room_id & hotel_id globally that will use on bookingObj
      this.hotel_id = room.hotel_id;
      this.room_id = room.room_id;
      this.total_price = room.price_per_night * this.roomparsedata.numberOfDays;
    }

    let bookingObj: any = {
      "user_id": this.userId,
      "hotel_id": this.hotel_id,
      "room_id": this.room_id,
      "check_in_date": this.roomparsedata.checkIn,
      "check_out_date": this.roomparsedata.checkOut,
      "adults": this.roomparsedata.numberofAdult,
      "children": this.roomparsedata.numberofChildren,
      "total_price": this.total_price,
      "booking_status": true,
      "guest_details": this.guestdata,
      "payment_mode": this.payment
    }

    console.log(bookingObj, "bookobj view-room");

    this.service.postguestdata(bookingObj, (response: any) => {
      this.responsemsg = response.message;
      this.successAlert = true;
      this.thankyouAlert = true;
      this.autoDismissAlert();
      console.log(response, "Reservation");

      if (response.status == 200 && response.data.length > 0) {
      }
    });


  }




  autoDismissAlert() {
    setTimeout(() => {
      this.successAlert = false;
      this.thankyouAlert = false;
      this._routes.navigate(['']);
    }, 3000); // 3000 ms = 3 seconds
  }






}
