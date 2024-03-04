import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public user_url = 'http://localhost:3000/user/';
  public product_url = 'http://localhost:3000/products/';
  public all_user = 'http://localhost:3000/user';

  constructor(private api : ApiService, ) { }

  userDashboardData(){
    return this.api.get(this.user_url);
  }

  productDashboardData(){
    return this.api.get(this.product_url);
  }

  allUser():Observable<any>{
    return this.api.get(this.all_user)
  }

  addUser(user_dto:any){
    return this.api.post(this.user_url, user_dto)
  }

  // get data of individual user

  singleUser(user_id:any){
    return this.api.get(this.user_url, user_id)
  }

  // update data of individual user

  editUser(user_id:any, user_dto:any):Observable<any>{
    return this.api.put(this.user_url+user_id, user_dto)
  }

  // delete user

  deleteUSer(user_id:any){
    this.api.delete(this.user_url+user_id)
  }

}
