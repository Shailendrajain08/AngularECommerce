
export class User {
  name!: string;
  mobNumber!: string;
  age!: number;
  dob!: string;
  email!: string;
  password!: string;
  address!: Address;
  language!: string;
  gender!: string;
  aboutYou!: string;
  uploadPhoto!: string;
  agreetc!: boolean;
  role!: string;
}

export class Address {
  id!: number;
  addressLine1!: string;
  addressLine2!: string;
  city!: string;
  state!: string;
  zip!: number;
}

export class Product{
  id!: string;
  name!: string;
  description!: string;
  price!: number;
  dprice!: number;
  category!: string;
  image!: string;
  stock!: number;
  status!:boolean;

}

export class Order {
    id!:number;
    userId!:number;
    sellerId!:number;
    product!: Product;
    deliveryAddress!:Address;
    contact!:number;
    dateTime!:string

}
