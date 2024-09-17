import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { ActivatedRoute } from '@angular/router';
import { ScrollService } from './scroll.service';
import { CommonModule } from '@angular/common';
import { SlideshowBackgroundComponent } from './slideshow-background/slideshow-background.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,HomeComponent, CommonModule,ServicesComponent, ContactComponent,AboutComponent,HttpClientModule,AdminComponent ,SlideshowBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';

  constructor(
    private route: ActivatedRoute,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.scrollService.scrollToElement(fragment);
      }
    });
  }

  
}
