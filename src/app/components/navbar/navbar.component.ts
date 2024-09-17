import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AdminComponent } from '../../admin/admin.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../services.service';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';

interface Booking {
  id: number;
  user_email: string;
  user_name: string;
  booking_time: string;
  service: {
    id: number;
    name: string;
    duration: number;
    description: string;
    price: number;
  };
}


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,AdminComponent,CommonModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  bookings: Booking[] = [];
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  loginError: string = '';
  isMobileMenuOpen = false;


  constructor(private adminComponent: AdminComponent, private servicesService: ServicesService ) {}


  isVisible: boolean = false;

  sharePage() {
    if (navigator.share) {
      navigator.share({
        title: 'Check out this page!',
        text: 'I found this page interesting, check it out:',
        url: window.location.href
      }).then(() => {
        console.log('Page shared successfully');
      }).catch((error) => {
        console.error('Error sharing the page:', error);
      });
    } else {
      console.error('Web Share API is not supported in this browser.');
      // Optionally, you can fall back to a different share method if needed
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

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

  deleteBooking(id: number): void {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });

    this.servicesService.deleteBooking(id, headers).subscribe(
      () => {
        this.bookings = this.bookings.filter(booking => booking.id !== id);
        console.log("updated bookings:" ,this.bookings)
      },
      (error) => {
        console.error('Failed to delete booking:', error);
      }
    );
  }



}
