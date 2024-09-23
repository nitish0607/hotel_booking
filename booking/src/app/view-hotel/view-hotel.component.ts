import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-view-hotel',
  templateUrl: './view-hotel.component.html',
  styleUrls: ['./view-hotel.component.css']
})
export class ViewHotelComponent {
  data: any = [];
  pageId: any;
  specificroomdata: any;


  constructor(private route: ActivatedRoute, private service: ApplicationService) { }

  ngOnInit() {
    this.fetchroom();

  }

  fetchroom() {
    this.route.paramMap.subscribe((params: any) => {
      this.pageId = params.get("id");
      this.service.fethchSingleroom(this.pageId, (callback: any) => {
        if (callback.status == 200 && callback.data.length > 0) {
          this.data = callback.data;
        }
        // console.log(callback);

      })
    })
  }

  addRoom(item: any) {
    this.specificroomdata = item;
  }


}
