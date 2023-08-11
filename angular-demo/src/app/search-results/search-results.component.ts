// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductService } from '../services/product.service';

// @Component({
//   selector: 'app-search-results',
//   templateUrl: './search-results.component.html',
//   styleUrls: ['./search-results.component.css']
// })
// export class SearchResultsComponent implements OnInit {
//   products: any[] = [];

//   constructor(private productService: ProductService, private route: ActivatedRoute) {}

  // ngOnInit() {
  //   this.route.queryParams.subscribe(params => {
  //     const searchTerm = params['name'];
  //     this.searchProductsByName(searchTerm);
  //   });
  // }

  // searchProductsByName(name: string) {
  //   this.productService.searchProductsByName(name).subscribe(
  //     (response) => {
  //       this.products = response;
  //     },
  //     (error) => {
  //       console.error('Error searching products', error);
  //     }
  //   );
  // }
// }
