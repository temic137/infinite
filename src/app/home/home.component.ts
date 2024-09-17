import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  isVisible: boolean = false;

  makev(){
    this.isVisible =  true;
  }

  close(){
    this.isVisible = false;
  }
}
