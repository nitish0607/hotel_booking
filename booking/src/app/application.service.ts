import { animate } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  searchHotelData(data: any, callback: any) {
    let url = "http://localhost:3000/searchHotel";
    return this.http.post(url, data).subscribe(data => callback(data));
  }

  fethchSingleroom(id: any, callback: any) {
    let url = `http://localhost:3000/fetch_hotelsByHotelId/${id}`;
    return this.http.get(url).subscribe((data: any) => callback(data));
  }

  fethchRoomDataOnId(room_id: any, callback: any) {
    let url = `http://localhost:3000/room/${room_id}`;
    return this.http.get(url).subscribe((data: any) => callback(data));
  }

  postguestdata(data: any, callback: any) {
    let url = "http://localhost:3000/postguestdata";
    return this.http.post(url, data).subscribe(data => callback(data));
  }

  signupData(data: any, callback: any) {
    let url = "http://localhost:3000/signupdata";
    return this.http.post(url, data).subscribe(data => callback(data));
  }

  logindata(data: any, callback: any) {
    let url = "http://localhost:3000/login";
    return this.http.post(url, data).subscribe(data => callback(data));
  }

  bookingdata(callback: any) {
    let url = "http://localhost:3000/getbookingData";
    return this.http.get(url).subscribe((response: any) => callback(<any>response));
  }


}
