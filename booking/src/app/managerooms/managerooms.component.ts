import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-managerooms',
  templateUrl: './managerooms.component.html',
  styleUrls: ['./managerooms.component.css']
})
export class ManageroomsComponent {
  hotel_id: any;
  parsehotel_id: any = {};
  roomformdata: any;
  showForm: boolean = false;  // this value is used for form visibility
  showhotelTable: any;
  roomsdata: any;
  hotelobj: any;
  successAlert: boolean = false;
  offAlert: boolean = false;
  responsemsg: any;
  globalroomid: any;
  isEdit: boolean = false;


  constructor(private fb: FormBuilder, private service: ApplicationService) {
    this.hotel_id = localStorage.getItem('hotel_id');
    this.parsehotel_id = this.hotel_id;

    this.roomformdata = this.fb.group({
      hotel_id: [this.parsehotel_id], // Include hotel_id in the form
      roomname: ['', Validators.required],
      adults: [null, [Validators.required, Validators.min(1)]],
      children: [null, Validators.min(0)],
      price: [null, [Validators.required, Validators.min(1)]],
      availabilitycount: [null, [Validators.required, Validators.min(1)]],
      roomimage: [null], // You can add validators for this if needed
      createdate: [new Date()] // Set createdate to the current date
    });

  }

  ngOnInit() {
    this.hotelobj = {

      "hotel_id": this.parsehotel_id
    }

    this.getrooms();
    this.showhotelTable = true;

  }

  getrooms() {
    this.service.fetchParticularRoomByUsingHotelId(this.hotelobj, (response: any) => {
      if (response.status == 200) {
        this.roomsdata = response.data;
        console.log(this.roomsdata);


      }
    });
  }



  toggleForm() {
    this.showhotelTable = false;
    this.showForm = true;
  }

  /* This method is used for to back the form */

  backtotable() {
    this.showForm = false;
    window.location.reload();
    this.getrooms();
  }

  createRooms() {
    if (this.roomformdata.valid) {
      console.log(this.roomformdata.value);
    }
    // Call the service to insert the room by hotel
    if (!this.isEdit) {
      this.service.insertroombyHotel(this.roomformdata.value, (response: any) => {
        if (response.status === 200) {
          // Handle success
          this.showForm = false;
          this.showhotelTable = true;
          this.successAlert = true;
          this.responsemsg = response.message;
          this.autoDismissAlert();
          this.getrooms();
        } else if (response.status === 400) {
          // Handle error
          this.offAlert = true;
          this.responsemsg = response.message;
          this.autoDismissAlert();
        }
      });

    }

    else {
      this.isEdit = true;
      this.service.updateroomsbyhotel(this.globalroomid, this.roomformdata.value, (result: any) => {
        this.successAlert = true;
        this.responsemsg = result.message;
        this.getrooms();
        this.showForm = false;
        this.showhotelTable = true;
        this.autoDismissAlert();


        console.log(result);

      });
    }
  }


  updateRooms(room: any) {
    this.roomformdata.patchValue(room);
    this.showhotelTable = false;
    this.showForm = true;

    this.globalroomid = room.room_id;
    this.isEdit = true;
    console.log(this.globalroomid);

  }

  deleteRooms(roomId: any) {
    console.log(roomId);

    this.service.deleteroombyHotel(roomId, (response: any) => {
      if (response.status == 200) {
        this.getrooms();
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

  autoDismissAlert() {
    setTimeout(() => {
      this.successAlert = false;
    }, 3000); // 3000 ms = 3 seconds
  }

}
