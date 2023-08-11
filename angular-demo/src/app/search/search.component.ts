import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
// import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchResult: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private product: ProductService,
    // private http: HttpClient
  ) {}


  // ngOnInit(): void {
  //   let name = this.activeRoute.snapshot.paramMap.get('name');
  //   console.log('name', name);

  //   name &&
  //     this.product.searchProduct(name).subscribe((result: any) => {
  //       console.log('ssss', result);

  //       this.searchResult = result;
  //     });
  // }
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';

// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrls: ['./search.component.css'],
// })
// export class SearchComponent implements OnInit {
//   searchResult: any;
//   searchQuery!: string | null; // Add definite assignment assertion modifier

//   constructor(
//     private activeRoute: ActivatedRoute,
//     private productService: ProductService
//   ) {}

//   ngOnInit(): void {
//     this.activeRoute.queryParamMap.subscribe((params) => {
//       this.searchQuery = params.get('search');
//       this.searchProducts();
//     });
//   }

//   searchProducts(): void {
//     if (this.searchQuery !== null) {
//       this.productService.getProducts(this.searchQuery).subscribe(
//         (result) => {
//           this.searchResult = result;
//         },
//         (error) => {
//           console.error('Error fetching search results', error);
//         }
//       );
//     }
//   }
// }


