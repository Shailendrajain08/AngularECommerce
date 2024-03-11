import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order, Product, User } from '../../../core/Model/objectModel';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  single_product_id: any;
  user_id:any;
  individual_products!:Product;
  user_details!:User;
  user_address : any;
  user_contact_no : any;
  order_dto!:Order;


  constructor(private customerService : CustomerService, private router:Router){
  }

  ngOnInit(): void {
    this.customerService.currentProduct.subscribe(product => {
      this.single_product_id = product;
    })
    this.user_id = sessionStorage.getItem('user_session_id')
    this.productDetail(this.single_product_id);
    this.userAddress(this.user_id)
  }

  productDetail (single_product_id:any) {
    this.customerService.individualProduct(single_product_id).subscribe(data => {
      this.individual_products = data;
    }, error=> {
      console.log(error)
    })
  }

  userAddress(user_id:any) {
    this.customerService.userDetails(user_id).subscribe(data => {
      this.user_address = data.address;
      this.user_contact_no = data.mobNumber;
    }, error =>{
      console.log(error)
    })
  }

  placeOrder () {
    this.order_dto = {
      id:0,
      userId : this.user_id,
      sellerId : 2,
      product : {
        id: this.individual_products.id,
        name: this.individual_products.name,
        description: this.individual_products.description,
        price: this.individual_products.price,
        dprice: this.individual_products.dprice,
        category : this.individual_products.category,
        image: this.individual_products.image,
        stock : this.individual_products.stock,
        status: this.individual_products.status
      },
      deliveryAddress : {
        id:0,
        addressLine1 : this.user_address.addressLine1,
        addressLine2 : this.user_address.addressLine2,
        city : this.user_address.city,
        state : this.user_address.state,
        zip : this.user_address.zip,
      },
      contact: this.user_contact_no,
      dateTime : new Date(). toLocaleDateString()
    }

    console.log("Place Order DL", this.order_dto)
    this.customerService.insertNewOrder(this.order_dto).subscribe(data => {
      console.log(data)
      alert("Your Order Placed Successfull")
      this.router.navigateByUrl("/buyer-dashboard")
    }, error => {
      console.log(error)
    })
  }

}
