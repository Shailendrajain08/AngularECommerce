import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/Model/objectModel';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {
  alluserData:any;
  singleUserData:any;
  addEditUserForm!:FormGroup;
  userDataObj!:User;
  userRegData:any;
  editUserId:any;
  uploadFileName!:string;
  addEditUser:boolean = false; // For Form validation
  addUser:boolean = false;
  editUser:boolean = false;
  popupHeader!:string;
  signInFormValue:any = {};

  constructor( private formBuilder : FormBuilder, private router:Router, private adminService:AdminService){}

  ngOnInit(): void {
      this.addEditUserForm = this.formBuilder.group({
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
      })
  }

  getAllUser(){
    this.adminService.allUser().subscribe(data =>{
      this.alluserData = data
    },error=>{
      console.log()
    })
  }

  get rf(){
    return this.addEditUserForm.controls;
  }

  addUserPopup(){
    this.editUser = false;
    this.addUser = true;
    this.popupHeader = "Add New User";
    this.addEditUserForm.reset()
  }

  addUSer(){
    this.addEditUser = true;
    if(this.addEditUserForm.invalid){
      alert('Error!! :-)\n\n' +JSON.stringify(this.addEditUserForm.value))
    }
  }
}
