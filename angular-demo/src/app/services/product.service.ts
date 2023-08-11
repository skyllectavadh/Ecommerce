import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/products';
  
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
// getProducts(): Observable<any[]> {
//   return this.http.get<any[]>('http://localhost:5000/products');
// }



// export class ProductService {
//   constructor(private http: HttpClient) {}

//   getProducts(search: string): Observable<any[]> {
//     let params = new HttpParams();
//     if (search) {
//       params = params.set('search', search);
//     }
//     return this.http.get<any[]>('http://localhost:5000/products', { params });
//   }

  // searchProduct(name:string){
  //   // console.log(`http://localhost:5000/product/${name}`);

  //   return this.http.get<any[]>(`http://localhost:5000/product/${name}`);

  // }
// }


//bhav
// export class ProductService {
//   constructor(private http: HttpClient) {}

//   getProducts(search: any): Observable<any[]> {
//     return this.http.get<any[]>(`http://localhost:5000/products?search=${search}`);
//   }

//   searchProduct(name:string){
//     // console.log(`http://localhost:5000/product/${name}`);

//     return this.http.get<any[]>(`http://localhost:5000/product/${name}`);

//   }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// // import { map } from 'rxjs/operators';


// @Injectable({
//   providedIn: 'root',
// })
// export class ProductService {
//   constructor(private http: HttpClient) {}
//   getProductsByName(name: string): Observable<any[]> {
//     return this.http.get<any[]>(`http://localhost:5000/product/${name}`);
//   }


//   getProducts(searchTerm?: string): Observable<any[]> {
//     let url = 'http://localhost:5000/products';
//     if (searchTerm) {
//       url += `?name=${searchTerm}`;
//     }
//     return this.http.get<any[]>(url);
//   }


//   searchProductsByName(name: string): Observable<any[]> {
//     return this.http.get<any[]>(`http://localhost:5000/product/${name}`);
//   }

// }
