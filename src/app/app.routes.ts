import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { AdminComponent } from './admin/admin.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent},
    { path: 'about', component: AboutComponent},
    { path: 'services', component: ServicesComponent},
    { path: 'admin', component:AdminComponent},
];
