import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/Model/objectModel';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signin-singup',
  standalone: true,
  imports: [NgFor, RouterLink, CommonModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './signin-singup.component.html',
  styleUrl: './signin-singup.component.css'
})
export class SigninSingupComponent {
  states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ]

  regForm: boolean = false;
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  signUpSubmitted:boolean = false;
  href: string = '';
  user_data: any;
  user_dto!: User;
  user_reg_data: any;
  signInFormValue: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginSignupService) { }

  ngOnInit():void{
    this.href = this.router.url;
    if (this.href == "/sign-up") {
      this.regForm = true;
    } else if (this.href == '/sign-in') {
      this.regForm = false
    }

    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      mobNumber: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: [],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      language: ['', Validators.required],
      gender: ['', Validators.required],
      aboutYou: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      agreetc: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  get rf() {
    return this.signUpForm.controls;
  }

  onSubmitSignUp(){
    this.signUpSubmitted = true;
    if(this.signUpForm.invalid){
      return;
    }else{
      this.user_reg_data = this.signUpForm.value;
      this.user_dto = {
        aboutYou:this.user_reg_data.aboutYou,
        age: this.user_reg_data.age,
        agreetc: this.user_reg_data.ageertc,
        dob: this.user_reg_data.dob,
        email: this.user_reg_data.email,
        gender: this.user_reg_data.gender,
        address: {
          id: 0,
          addressLine1: this.user_reg_data.addressLine1,
          addressLine2: this.user_reg_data.addressLine2,
          city: this.user_reg_data.city,
          state: this.user_reg_data.state,
          zip: this.user_reg_data.zip
        },
        language: this.user_reg_data.language,
        mobNumber: this.user_reg_data.mobNumber,
        name: this.user_reg_data.name,
        password: this.user_reg_data.password,
        uploadPhoto: this.user_reg_data.uploadPhoto,
        role: this.user_reg_data.role
      }

      console.log(this.user_dto)
      this.loginService.userRegister(this.user_dto).subscribe(data => {
        alert("User Registered Successfull");
        this.router.navigateByUrl('/sign-in');
      })
    }
  }
}

