// search.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  // private searchProductsSubject = new BehaviorSubject<any>(null);
  private searchProductsSubject = new BehaviorSubject<any>({ products: [], currentPage: 1, totalPages: 0 });
  private searchProducts$: Observable<any> = this.searchProductsSubject.asObservable();
  private searchPerformed = false;

  setSearchProducts(products: any) {
    // console.log("products",products);

    this.searchProductsSubject.next(products|| { products: [], currentPage: 1, totalPages: 0 });
    // console.log("searchProductsSubject",this.searchProductsSubject);

    this.searchPerformed = true;
    // console.log("searchPerformed",this.searchPerformed);
  }

  getSearchProducts(): Observable<any> {
    // console.log('getSearchProducts:', this.searchProducts$);
    return this.searchProducts$;
  }

  hasSearchPerformed(): boolean {
    // console.log('hasSearchPerformed:', this.searchPerformed);
    return this.searchPerformed;
  }
}

