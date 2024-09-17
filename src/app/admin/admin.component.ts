// // admin.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ServicesService } from '../services.service';
// import { HttpClientModule, HttpHeaders } from '@angular/common/http';
// import { RouterLink } from '@angular/router';

// interface Booking {
//   id: number;
//   user_email: string;
//   user_name: string;
//   booking_time: string;
//   service: {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//   };
// }

// @Component({
//   selector: 'app-admin',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule,RouterLink],
//   templateUrl: './admin.component.html',
//   styleUrls: ['./admin.component.css']
// })
// export class AdminComponent implements OnInit {
//   bookings: Booking[] = [];
//   username: string = '';
//   password: string = '';
//   isLoggedIn: boolean = false;
//   loginError: string = '';
//   showLoginModal: boolean = false;
//   constructor(private servicesService: ServicesService) {}

//   ngOnInit() {}

//   openLoginModal() {
//     this.showLoginModal = true;
//   }

//   closeLoginModal() {
//     this.showLoginModal = false;
//     this.loginError = '';
//   }

//   login() {
//     const headers = new HttpHeaders({
//       'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
//     });

//     this.servicesService.getBookings(headers).subscribe(
//       (bookings) => {
//         this.bookings = bookings;
//         this.isLoggedIn = true;
//         this.loginError = '';
//         this.closeLoginModal();
//       },
//       (error) => {
//         console.error('Login failed:', error);
//         this.loginError = 'Invalid credentials. Please try again.';
//       }
//     );
//   }
// }

// admin.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../services.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

interface Booking {
  id: number;
  user_email: string;
  user_name: string;
  booking_time: string;
  service: {
    id: number;
    name: string;
    description: string;
    duration: number;
    price: number;
  };
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  bookings: Booking[] = [];
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  loginError: string = '';

  constructor(private servicesService: ServicesService) {}

  isVisible: boolean = false;

  showAdmin() {
    this.isVisible = true;
  }

  hideAdmin() {
    this.isVisible = false;
  }

  ngOnInit() {}

  login() {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });

    this.servicesService.getBookings(headers).subscribe(
      (bookings) => {
        this.bookings = bookings;
        this.isLoggedIn = true;
        this.loginError = '';
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginError = 'Invalid credentials. Please try again.';
      }
    );
  }
}