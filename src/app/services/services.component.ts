// 1st iteration


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { ServicesService } from './services.service';

// interface Service {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
// }

// interface CategoryServices {
//   name: string;
//   services: Service[];
// }

// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './services.component.html',
//   styleUrl: './services.component.css'
// })
// export class ServicesComponent implements OnInit {
//   categoryServices: CategoryServices[] = [];
//   userEmail: string = '';
//   userName: string = '';
//   selectedService: Service | null = null;
//   bookingTime: string = '';

//   constructor(private servicesService: ServicesService) {}

//   ngOnInit() {
//     this.loadServices();
//   }

//   loadServices() {
//     this.servicesService.getServices().subscribe(
//       (services: Service[]) => {
//         // Group services by category (assuming category is part of the name)
//         const categories = ['Twists', 'Braids', 'Locks'];
//         this.categoryServices = categories.map(category => ({
//           name: category,
//           services: services.filter(service => 
//             service.name.toLowerCase().includes(category.toLowerCase())
//           )
//         }));
//       },
//       (error) => {
//         console.error('Error fetching services:', error);
//       }
//     );
//   }

//   selectService(service: Service) {
//     this.selectedService = service;
//   }

//   bookService() {
//     if (this.selectedService && this.userEmail && this.userName && this.bookingTime) {
//       this.servicesService.bookService(
//         this.selectedService.id,
//         this.userEmail,
//         this.userName,
//         this.bookingTime
//       ).subscribe(
//         (booking) => {
//           console.log('Booking successful:', booking);
//           // Reset form or show success message
//           this.selectedService = null;
//           this.userEmail = '';
//           this.userName = '';
//           this.bookingTime = '';
//         },
//         (error) => {
//           console.error('Error booking service:', error);
//         }
//       );
//     }
//   }
// }


// 2nd iteration

// import { Component, OnInit, Optional } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { ServicesService } from '../services.service';

// interface Service {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl?:string;
// }

// interface CategoryServices {
//   name: string;
//   services: Service[];
// }

// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './services.component.html',
//   styleUrl: './services.component.css'
// })
// export class ServicesComponent implements OnInit {
//   categoryServices: CategoryServices[] = [];
//   userEmail: string = '';
//   userName: string = '';
//   selectedService: Service | null = null;
//   bookingTime: string = '';

//   constructor(private servicesService: ServicesService) {}

//   ngOnInit() {
//     this.loadServices();
//   }

//   loadServices() {
//     this.servicesService.getServices().subscribe(
//       (services: Service[]) => {
//         services = services.map(service => ({
//           ...service,
//           imageUrl: this.getImageUrl(service.name)
//         }));

//         const categories = ['Twists', 'Braids', 'Locks'];
//         this.categoryServices = categories.map(category => ({
//           name: category,
//           services: services.filter(service => 
//             service.name.toLowerCase().includes(category.toLowerCase())
//           )
//         }));
//       },
//       (error) => {
//         console.error('Error fetching services:', error);
//       }
//     );
//   }

//   getImageUrl(serviceName: string): string {
//     const filename = serviceName.toLowerCase().replace(/ /g, '_') + '.jpg';
//     return `assets/images/services/${filename}`;
//   }

//   selectService(service: Service) {
//     this.selectedService = service;
//   }

//   bookService() {
//     if (this.selectedService && this.userEmail && this.userName && this.bookingTime) {
//       this.servicesService.bookService(
//         this.selectedService.id,
//         this.userEmail,
//         this.userName,
//         this.bookingTime
//       ).subscribe(
//         (booking) => {
//           console.log('Booking successful:', booking);
//           // Reset form or show success message
//           this.selectedService = null;
//           this.userEmail = '';
//           this.userName = '';
//           this.bookingTime = '';
//         },
//         (error) => {
//           console.error('Error booking service:', error);
//         }
//       );
//     }
//   }

//   handleMissingImage(event: Event) {
//     (event.target as HTMLImageElement).src = 'assets/images/services/default.jpg';
//   }
// }


//  3 iteration
// services.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { ServicesService } from '../services.service';
// import { DomSanitizer,SafeUrl } from '@angular/platform-browser';
// import { Service } from '../model/service';
// import { HttpClient } from '@angular/common/http';


// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './services.component.html',
//   styleUrls: ['./services.component.css']
// })
// export class ServicesComponent implements OnInit {
//   services: Service[] = [];
//   userEmail: string = '';
//   userName: string = '';
//   selectedService: Service | null = null;
//   bookingTime: string = '';

//   constructor(private servicesService: ServicesService, private sanitizer:DomSanitizer, private httpclient:HttpClient) {}

//   ngOnInit() {
//     console.log('Component initialized');
//     this.loadServices();
//   }

//   getSafeImageUrl(url: string | null): SafeUrl {
//     if (url) {
//       return this.sanitizer.bypassSecurityTrustUrl(url);
//     }
//     return 'assets/b1.jpg'; // fallback image
//   }

//   loadServices() {
//     console.log('Loading services...');
//     this.servicesService.getServices().subscribe(
//       (services: Service[]) => {
//         console.log('Services loaded:', services);
//         this.services = services;
//       },
//       (error) => {
//         console.error('Error loading services:', error);
//       }
//     );
//   }

//   selectService(service: Service) {
//     this.selectedService = service;
//   }

//   bookService() {
//     console.log('Booking service...');
//     console.log('Selected service:', this.selectedService);
//     console.log('User email:', this.userEmail);
//     console.log('User name:', this.userName);
//     console.log('Booking time:', this.bookingTime);
  
//     if (this.selectedService && this.userEmail && this.userName && this.bookingTime) {
//       this.servicesService.bookService(
//         this.selectedService.id,
//         this.userEmail,
//         this.userName,
//         this.bookingTime
//       ).subscribe(
//         (booking) => {
//           console.log('Booking successful:', booking);
//           // Reset form or show success message
//           this.selectedService = null;
//           this.userEmail = '';
//           this.userName = '';
//           this.bookingTime = '';
//         },
//         (error) => {
//           console.error('Error booking service:', error);
//           // Show error message to user
//         }
//       );
//     } else {
//       console.error('Missing required booking information');
//       // Show error message to user about missing information
//     }
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { ServicesService } from '../services.service';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { Service } from '../model/service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './services.component.html',
//   styleUrls: ['./services.component.css']
// })
// export class ServicesComponent implements OnInit {
//   services: Service[] = [];
//   userEmail: string = '';
//   userName: string = '';
//   selectedService: Service | null = null;
//   bookingTime: string = '';

//   constructor(private servicesService: ServicesService, private sanitizer: DomSanitizer, private httpclient: HttpClient) {}

//   ngOnInit() {
//     console.log('Component initialized');
//     this.loadServices();
//   }

//   getSafeImageUrl(url: string | null): SafeUrl {
//     if (url) {
//       return this.sanitizer.bypassSecurityTrustUrl(url);
//     }
//     return 'assets/b1.jpg'; // fallback image
//   }

//   loadServices() {
//     console.log('Loading services...');
//     this.servicesService.getServices().subscribe(
//       (services: Service[]) => {
//         console.log('Services loaded:', services);
//         this.services = services;
//       },
//       (error) => {
//         console.error('Error loading services:', error);
//       }
//     );
//   }

//   selectService(service: Service) {
//     this.selectedService = service;
//   }

//   bookService() {
//     console.log('Booking service...');
//     console.log('Selected service:', this.selectedService);
//     console.log('User email:', this.userEmail);
//     console.log('User name:', this.userName);
//     console.log('Booking time:', this.bookingTime);
  
//     if (this.selectedService && this.userEmail && this.userName && this.bookingTime) {
//       this.servicesService.bookService(
//         this.selectedService.id,
//         this.userEmail,
//         this.userName,
//         this.bookingTime
//       ).subscribe(
//         (booking) => {
//           console.log('Booking successful:', booking);
//           // Reset form or show success message
//           this.closeForm();
//         },
//         (error) => {
//           console.error('Error booking service:', error);
//           // Show error message to user
//         }
//       );
//     } else {
//       console.error('Missing required booking information');
//       // Show error message to user about missing information
//     }
//   }

//   closeForm() {
//     // Reset the selected service to close the form
//     this.selectedService = null;
    
//     // Reset form fields
//     this.userEmail = '';
//     this.userName = '';
//     this.bookingTime = '';

//     console.log('Form closed and reset');
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { ServicesService } from '../services.service';
// import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
// import { Service } from '../model/service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-services',
//   standalone: true,
//   imports: [CommonModule, FormsModule, HttpClientModule],
//   templateUrl: './services.component.html',
//   styleUrls: ['./services.component.css']
// })
// export class ServicesComponent implements OnInit {
//   services: Service[] = [];
//   userEmail: string = '';
//   userName: string = '';
//   selectedService: Service | null = null;
//   bookingTime: string = '';

//   constructor(
//     private servicesService: ServicesService,
//     private sanitizer: DomSanitizer,
//     private httpclient: HttpClient
//   ) {}

//   ngOnInit() {
//     console.log('Component initialized');
//     this.loadServices();
//   }

//   getSafeImageUrl(url: string | null): SafeUrl {
//     if (url) {
//       return this.sanitizer.bypassSecurityTrustUrl(url);
//     }
//     return this.sanitizer.bypassSecurityTrustUrl('assets/default-service-image.jpg');
//   }

//   loadServices() {
//     console.log('Loading services...');
//     this.servicesService.getServices().subscribe(
//       (services: Service[]) => {
//         console.log('Services loaded:', services);
//         this.services = services.map(service => ({
//           ...service,
//           imageUrl: service.imageUrl || 'assets/default-service-image.jpg'
//         }));
//       },
//       (error) => {
//         console.error('Error loading services:', error);
//       }
//     );
//   }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServicesService } from '../services.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Service } from '../model/service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  userEmail: string = '';
  userName: string = '';
  selectedService: Service | null = null;
  bookingTime: string = '';

  constructor(
    private servicesService: ServicesService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    console.log('Component initialized');
    this.loadServices();
  }

  getSafeImageUrl(url: string | null): SafeUrl | null {
    if (url) {
      return url;
    }
    return null;
  }

  loadServices() {
    console.log('Loading services...');
    this.servicesService.getServices().subscribe(
      (services: Service[]) => {
        console.log('Services loaded:', services);
        this.services = services.map(service => ({
          ...service,
          imageUrl: service.image_url || null
        }));
      },
      (error) => {
        console.error('Error loading services:', error);
      }
    );
  }


  selectService(service: Service) {
    this.selectedService = service;
  }

  bookService() {
    console.log('Booking service...');
    console.log('Selected service:', this.selectedService);
    console.log('User email:', this.userEmail);
    console.log('User name:', this.userName);
    console.log('Booking time:', this.bookingTime);
  
    if (this.selectedService && this.userEmail && this.userName && this.bookingTime) {
      this.servicesService.bookService(
        this.selectedService.id,
        this.userEmail,
        this.userName,
        this.bookingTime
      ).subscribe(
        (booking) => {
          console.log('Booking successful:', booking);
          // Reset form or show success message
          this.closeForm();
        },
        (error) => {
          console.error('Error booking service:', error);
          // Show error message to user
        }
      );
    } else {
      console.error('Missing required booking information');
      // Show error message to user about missing information
    }
  }

  closeForm() {
    // Reset the selected service to close the form
    this.selectedService = null;
    
    // Reset form fields
    this.userEmail = '';
    this.userName = '';
    this.bookingTime = '';

    console.log('Form closed and reset');
  }
}