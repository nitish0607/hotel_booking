import { Component } from '@angular/core';
import { ApplicationService } from 'src/app/application.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  data: any;
  bookingData: any;
  arr: any = []


  constructor(private service: ApplicationService) {

  }

  ngOnInit() {
    this.getbookingdata();
  }

  getbookingdata() {
    this.service.bookingdata((response: any) => {
      console.log(response);
      this.data = response;
    })

  }

}
