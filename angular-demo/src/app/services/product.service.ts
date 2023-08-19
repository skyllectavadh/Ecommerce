import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/enviroment.local";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private apiUrl = 'http://localhost:5000/products';
  private apiUrl = `${environment.url}products`;
  
  constructor(private http: HttpClient) {}



  getProducts(page: number, val: string = "", sortField: string = "", sortOrder: string = ""): Observable<any> {
    let url = `${this.apiUrl}?page=${page}&search=${val}`;

    if (sortField && sortOrder) {
      url = url + `&sort=${sortField}&order=${sortOrder}`;
    }

    return this.http.get<any>(url);
  }



  searchProduct(name:string){
    // console.log(`http://localhost:5000/product/${name}`);

    // return this.http.get<any[]>(`http://localhost:5000/product/${name}`);

  }
}



