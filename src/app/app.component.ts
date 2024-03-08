import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/layouts/header/header.component";
import { FooterComponent } from "./shared/layouts/footer/footer.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent]
})
export class AppComponent {

  title = 'angularECommerce';
  screenHeight:any;
  screenWidth:any;
  footerMaxHeight!:number

  constructor(){
    this.getScreenSize(event)
  }

  @HostListener('window:resize', ['$event'])

  getScreenSize(event:any){
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    this.footerMaxHeight = this.screenHeight - 160;
  }
}
