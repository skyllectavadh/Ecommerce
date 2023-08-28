import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/enviroment.local";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private api = environment.url;
  constructor(private http: HttpClient) {}

  addProductToWishlist(data: any) {
    const url = `${this.api}addProductToWishlist`; // Update the URL to match your backend API endpoint
    return this.http.post(url, data);
  }

  getWishlistProduct(userId:any){
    const url = `${this.api}wishlist/${userId}`
    return this.http.get(url)
  }
}

