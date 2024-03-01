import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signin-singup',
  standalone: true,
  imports: [NgFor],
  templateUrl: './signin-singup.component.html',
  styleUrl: './signin-singup.component.css'
})
export class SigninSingupComponent {
  states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
  ]
}
