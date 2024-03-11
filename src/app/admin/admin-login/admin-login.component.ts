import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSignupService } from '../../shared/services/login-signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  signInFormValue: any = {};
  user_data:any;

  constructor (private router:Router, private loginService:LoginSignupService) {}

  ngOnInit(): void {

  }

  onSubmitSignIn() {
    this.loginService.adminLogin(this.signInFormValue.adminEmail, this.signInFormValue.adminPassword).subscribe(data => {
      this.user_data = data;
      if(this.user_data.length == 1){
        sessionStorage.setItem("user_session_id", this.user_data[0].id);
        sessionStorage.setItem("role", this.user_data[0].role)
        this.router.navigateByUrl('/admin-dashboard')
      }else{
        alert("Invalid Credientials")
      }
    }, error => {
      console.log(error);
    });
  }
}
