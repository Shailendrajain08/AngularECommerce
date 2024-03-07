import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/Model/objectModel';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-user-crud',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-crud.component.html',
  styleUrl: './user-crud.component.css'
})
export class UserCrudComponent implements OnInit {

  states = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];
  alluserData: any;
  singleUserData: any;
  addEditUserForm!: FormGroup;
  userDataObj!: User;
  userRegData: any;
  editUserId: any;
  uploadFileName!: string;
  addEditUser: boolean = false; // For Form validation
  addUser: boolean = false;
  editUser: boolean = false;
  popupHeader!: string;
  signInFormValue: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private adminService: AdminService) { }

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

    this.getAllUser()
  }

  getAllUser() {
    this.adminService.allUser().subscribe(data => {
      this.alluserData = data
    }, error => {
      console.log()
    })
  }

  get rf() {
    return this.addEditUserForm.controls;
  }

  addUserPopup() {
    this.editUser = false;
    this.addUser = true;
    this.popupHeader = "Add New User";
    this.addEditUserForm.reset()
  }

  addUSER() {
    this.addEditUser = true;
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.userRegData = this.addEditUserForm.value;
    this.userDataObj = {
      aboutYou: this.userRegData.aboutYou,
      age: this.userRegData.age,
      agreetc: this.userRegData.agreetc,
      dob: this.userRegData.dob,
      email: this.userRegData.email,
      gender: this.userRegData.gender,
      address: {
        id: 0,
        addressLine1: this.userRegData.addressLine1,
        addressLine2: this.userRegData.addressLine2,
        city: this.userRegData.city,
        state: this.userRegData.state,
        zip: this.userRegData.zip,
      },
      language: this.userRegData.language,
      mobNumber: this.userRegData.mobNumber,
      name: this.userRegData.name,
      password: this.userRegData.password,
      uploadPhoto: this.userRegData.uploadPhoto,
      role: this.userRegData.role,
    }

    console.log(this.userDataObj)
    this.adminService.addUser(this.userDataObj).subscribe(data => {
      this.addEditUserForm.reset();
      this.getAllUser();
    }, error => {
      console.log("my wrong", error)
    })
  }

  editUserPopup(user_id: any) {
    this.editUserId = user_id;
    this.editUser = true;
    this.addUser = false;
    this.popupHeader = "Edit User"
    this.adminService.singleUser(user_id).subscribe(data => {
      this.singleUserData = data;
      this.uploadFileName = this.singleUserData.uploadFileName;
      this.addEditUserForm.setValue({
        name: this.singleUserData.name,
        mobNumber: this.singleUserData.mobNumber,
        dob: this.singleUserData.dob,
        age: this.singleUserData.age,
        email: this.singleUserData.email,
        password: this.singleUserData.password,
        language: this.singleUserData.language,
        gender: this.singleUserData.gender,
        addressLine1: this.singleUserData.address.addressLine1,
        addressLine2: this.singleUserData.address.addressLine2,
        city: this.singleUserData.address.city,
        state: this.singleUserData.address.state,
        zip: this.singleUserData.address.zip,
        aboutYou: this.singleUserData.aboutYou,
        uploadPhoto: '',
        role: this.singleUserData.role,
        agreetc: this.singleUserData.agreetc
      })
    }, error => {
      console.log(error);
    })
  }

  updateUser() {
    if (this.addEditUserForm.invalid) {
      alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value));
      return;
    }
    this.userRegData = this.addEditUserForm.value;
    this.userDataObj = {
      aboutYou: this.userRegData.aboutYou,
      age: this.userRegData.age,
      agreetc: this.userRegData.agreetc,
      dob: this.userRegData.dob,
      email: this.userRegData.email,
      gender: this.userRegData.gender,
      address: {
        id: 0,
        addressLine1: this.userRegData.addressLine1,
        addressLine2: this.userRegData.addressLine2,
        city: this.userRegData.city,
        state: this.userRegData.state,
        zip: this.userRegData.zip,
      },
      language: this.userRegData.language,
      mobNumber: this.userRegData.mobNumber,
      name: this.userRegData.name,
      password: this.userRegData.password,
      uploadPhoto: (this.userRegData.uploadPhoto == "" ? this.uploadFileName : this.userRegData.uploadPhoto),
      role: this.userRegData.role,
    }
    this.adminService.editUser(this.editUserId, this.userDataObj).subscribe(data => {
      this.addEditUserForm.reset();
      this.getAllUser();
    }, error => {
      console.log("my wrong", error)
    })
  }

  deleteUser(user_id: any) {
    this.adminService.deleteUser(user_id).subscribe(data => {
      this.getAllUser()
    }, error => {
      console.log(error)
    })
  }
}


