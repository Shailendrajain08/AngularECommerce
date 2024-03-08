import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private single_product_id = new BehaviorSubject(null);
  currentProduct = this.single_product_id.asObservable();
  private user_url = 'http://localhost:3000/user'
  private product_url = 'http://localhost:3000/products'
  private order_url = 'http://localhost:3000/order'

  constructor( private apiService : ApiService) { }

  allProduct() : Observable<any>{
    return this.apiService.get(this.product_url);
  }

  quickBuyProduct(product_id:any){
    this.single_product_id.next(product_id)
  }

  individualProduct(id:any){
    return this.apiService.get(this.product_url+id);
  }

  userDetails(id:any){
    return this.apiService.get(this.user_url+id)
  }

  insertNewOrder(order_dto:any):Observable<any>{
    return this.apiService.get(this.order_url, order_dto)
  }

  orderDashboardData():Observable<any>{
    return this.apiService.get(this.order_url)
  }

  productDashboardData():Observable<any>{
    return this.apiService.get(this.product_url);
  }
}
