import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/enviroment.local";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // private apiUrl = 'http://localhost:5000/cart';
  // private api = 'http://localhost:5000/';


  private apiUrl = `${environment.url}cart`;
  private api = environment.url;

  constructor(private http: HttpClient) { }

  deleteOrderItem(orderId: string, itemId: string) {
    const url = `${this.api}deleteOrderItem/${orderId}/${itemId}`;
    return this.http.delete(url);
  }
  
  createProductOrder(orderData: any) {
    return this.http.post(`${this.api}createProductOrder`, orderData);
  }
  
  
  updateOrderItemStatus(orderId: string, itemId: string, status: string) {
    const url = `${this.api}updateOrderItemStatus/${orderId}/${itemId}`;
    return this.http.put(url, { status });
  }

  getOrder(){
      return this.http.get(`${this.api}getOrders`);
  }
  
  

  getCartData(userId: string) {
    const url = `${this.apiUrl}/${userId}`;

    // Get the token from localStorage
    const token = localStorage.getItem('token');

    // Create headers object with Authorization header containing the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    // console.log("headers",headers);

    // Pass the headers in the request options
    const requestOptions = { headers: headers };
    // console.log("reqop",requestOptions);

    return this.http.get(url, requestOptions);
  }

  saveProduct(data: any) {
    return this.http.post('http://localhost:5000/createCartProduct', data);
  }

  removeItemFromCart(userId: string, itemId: string) {
    const url = `${this.apiUrl}/${userId}/items/${itemId}`;
    return this.http.delete(url);
  }

  updateCartItem(userId: string, itemId: string, quantity: number) {
    const url = `${this.apiUrl}/${userId}/items/${itemId}`;
    const payload = { quantity }; // Create the payload to update the quantity
    return this.http.patch(url, payload);
  }

  totalCartPrice(userId:string){
    const url = `${this.apiUrl}/${userId}/totalPrice`;
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const requestOptions = { headers: headers };
    return this.http.get(url,requestOptions)
  }

  
}



  // deleteCartItem(userId:string,itemId:string){
  //   const url = `${this.apiUrl}/${userId}/items/${itemId}`
  //   console.log("delitem",url);

  //   return this.http.delete(url)
  // }
  // router.delete('/cart/:userId/items/:itemId', cartController.removeItemFromCart);
  // router.patch('/cart/:userId/items/:itemId', cartController.updateCartItem);


// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   constructor(private http: HttpClient) {}
//   posturl = 'http://localhost:5000/createCartProduct';
//       saveProduct(data: any) {
//         // console.log("d",data);
//         return this.http.post(this.posturl,data);
//       }
// }      
