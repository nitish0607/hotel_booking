import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-managehotel',
  templateUrl: './managehotel.component.html',
  styleUrls: ['./managehotel.component.css']
})
export class ManagehotelComponent {
  addhotel: any;
  showForm: boolean = false;  // this value is used for form visibility
  hotellistData: any;
  showhotelTable: boolean = false;
  successAlert: boolean = false;
  offAlert: boolean = false;
  responsemsg: any;
  isEdit: boolean = false;
  globalhotelid: any;

  constructor(private _roomForm: FormBuilder, private service: ApplicationService) {
    this.addhotel = this._roomForm.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10-digit phone number validation
      email: ['', [Validators.required, Validators.email]],
      description: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]], // 1 to 5 star rating
      longitude: ['', Validators.required],
      latitude: ['', Validators.required],
      hotelimage: ['', Validators.required],
      password: ['', Validators.required],

    })
  }


  ngOnInit() {
    this.showhotelTable = true;
    this.gethotel();
  }

  gethotel() {
    this.service.fetchhotelistData().subscribe((result: any) => {
      if (result.status == 200 && result.data.length > 0) {
        this.successAlert = true;
        this.responsemsg = result.message;
        this.autoDismissAlert();
        this.hotellistData = result.data;
        console.log(this.hotellistData);

      }
      else if (result.status == 400) {
        this.offAlert = true;
        this.responsemsg = result.message;
      }
    })
  }


  toggleForm() {
    this.showhotelTable = false;
    this.showForm = true;
  }



  onSubmit() {
    if (this.addhotel.valid) {
    }
  }


  submit() {
    if (!this.isEdit) {
      this.service.addhotelbyAdmin(this.addhotel.value, (response: any) => {
        if (response.status == 200) {
          this.gethotel();
          this.showForm = false;
          this.showhotelTable = true;
          this.successAlert = true;
          this.responsemsg = response.message;
          this.autoDismissAlert();
        }

        else if (response.status == 400) {
          this.offAlert = true;
          this.responsemsg = response.message;
        }
      })
    }
    else {
      this.isEdit = true;
      this.service.editHotel(this.globalhotelid, this.addhotel.value, (result: any) => {
        this.successAlert = true;
        this.responsemsg = result.message;
        this.gethotel();
        this.showForm = false;
        this.showhotelTable = true;
        this.autoDismissAlert();


        console.log(result);

      });
    }
  }



  editHotel(hotel: any) {
    this.isEdit = true;
    this.addhotel.patchValue(hotel);
    this.showhotelTable = false;
    this.showForm = true;
    this.globalhotelid = hotel.hotel_id;
    console.log(this.globalhotelid);


  }

  deleteHotel(hotelid: any) {
    this.service.deletehotelData(hotelid, (response: any) => {
      if (response.status == 200) {
        this.gethotel();
        this.showForm = false;
        this.showhotelTable = true;
        this.successAlert = true;
        this.responsemsg = response.message;
        this.autoDismissAlert();
      }
      else if (response.status == 400) {
        this.offAlert = true;
        this.responsemsg = response.message;
      }

    })
  }



  /* This method is used for to back the form */

  backtotable() {
    this.showForm = false;
    // window.location.reload();
    this.gethotel();
  }


  autoDismissAlert() {
    setTimeout(() => {
      this.successAlert = false;
    }, 3000); // 3000 ms = 3 seconds
  }


}
