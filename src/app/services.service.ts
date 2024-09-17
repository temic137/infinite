// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// interface Service {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl?: string;
// }

// interface Booking {
//   id: number;
//   user_email: string;
//   user_name: string;
//   booking_time: string;
//   service: Service;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ServicesService {
//   private apiUrl = 'http://localhost:3000/api/v1'; // Adjust if your Rails API is on a different URL

//   constructor(private http: HttpClient) { }

//   getServices(): Observable<Service[]> {
//     return this.http.get<Service[]>(`${this.apiUrl}/services`).pipe(
//       map(services => services.map(service => ({
//         ...service,
//         imageUrl: this.getImageUrl(service.name)
//       })))
//     );
//   }

//   bookService(serviceId: number, userEmail: string, userName: string, bookingTime: string): Observable<Booking> {
//     const bookingData = {
//       service_id: serviceId,
//       user_email: userEmail,
//       user_name: userName,
//       booking_time: bookingTime
//     };
//     return this.http.post<Booking>(`${this.apiUrl}/bookings`, { booking: bookingData });
//   }

//   private getImageUrl(serviceName: string): string {
//     const filename = serviceName.toLowerCase().replace(/ /g, '_') + '.jpg';
//     return `assets/images/services/${filename}`;
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Service } from './model/service';


interface Booking {
  id: number;
  user_email: string;
  user_name: string;
  booking_time: string;
  service: Service;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Adjust if your Rails API is on a different URL

  constructor(private http: HttpClient) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiUrl}/services`);
  }

  bookService(serviceId: number, userEmail: string, userName: string, bookingTime: string ): Observable<Booking> {
    const bookingData = {
      service_id: serviceId,
      user_email: userEmail,
      user_name: userName,
      booking_time: bookingTime
    };
    return this.http.post<Booking>(`${this.apiUrl}/bookings`, { booking: bookingData });
  }


  getBookings(headers: HttpHeaders): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/bookings`, { headers });
  }

  deleteBooking(id: number,headers: HttpHeaders): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bookings/${id}`,{ headers });
  }
}
