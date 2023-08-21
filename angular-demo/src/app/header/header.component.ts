import { Component, EventEmitter, Output } from "@angular/core";
import { ProductService } from "../services/product.service";
import { SearchService } from "../services/search.service"; // Import the SearchService here
import { CartService } from "../services/cart.service";
import { UserdataService } from "../services/userdata.service";

import jwtDecode from "jwt-decode";
import { Router } from "@angular/router";
import { data } from "jquery";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
  searchText: string = "";
  @Output() searchValue = new EventEmitter<string>();
  isSearch: boolean = false;
  cartData: any;
  userId: string = "";
  isSign: any;
  loginUserData:any;
  constructor(
    private productService: ProductService,
    private searchService: SearchService,
    private cartService: CartService,
    private router: Router,
    private userdataService:UserdataService
  ) {}

  userName(){
    this.userdataService.getUserById(this.userId).subscribe(
      (data:any)=>{
        this.loginUserData=data;
        // console.log("logda",this.loginUserData);
        // console.log("logda",this.loginUserData.data.name);

        
      })
  }

  handleSearchClick(searchValue: string) {
    // Check if the searchValue has more than three characters
    if (searchValue.length >= 3) {
      this.submitSearch(searchValue);
    }
  }

  ngOnInit(): void {
    this.userId = this.getUserIdFromToken(); // Get userId from the token in localStorage
    this.getCartDataByUserId();
    this.isTokenAvailable();
    this.userName()
  }

  getCartDataByUserId() {
    this.cartService.getCartData(this.userId).subscribe(
      (data: any) => {
        this.cartData = data;
        console.log('Cart Data:headers', this.cartData.order[0].items.length);
        // console.log('cartitem',this.cartData.items);
      },
      (error) => {
        console.error("Error fetching cart data:", error);
      }
    );
  }

  getUserIdFromToken(): string {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.userId) {
        return decodedToken.userId;
      }
    }
    return ""; // Return an empty string if the userId is not found in the token
  }

  submitSearch(val: any) {
    if (val.length >= 3) {
      this.searchValue.emit(val);
      // console.log("val", val);
      this.productService.getProducts(1, val).subscribe((response) => {
        // console.log("resp",response);
        this.searchService.setSearchProducts(response); // Store in the service
      });
    } else {
      this.searchService.setSearchProducts([]); // Empty search, store an empty array
    }
    return (this.isSearch = true);
  }

  redirectToForm() {
    // console.log("sign",this.isSign);

    this.router.navigate(["/registration/login"]);
    // this.isSign = true;
    // console.log("sign",this.isSign);
  }

  redirectToCart() {
    this.router.navigate(["/cart"]);
  }

  isTokenAvailable() {
    const token = localStorage.getItem("token");
    if (token) {
      this.isSign = true;
    } else {
      this.isSign = false;
    }
    // return token !== null;
  }

  signOut() {
    // console.log("sign",this.isSign);
    // Remove the token from localStorage
    localStorage.removeItem("token");
    // this.cartData = null;
    // this.getCartDataByUserId()
    this.router.navigate(["/registration/login"]);
    // this.isSign = false
    // console.log("sign",this.isSign);
  }
}

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {
//   searchInput: any;

//   constructor(private route: Router) {}
//   submitSearch(val: string) {
//     console.log("val",val);
//     this.route.navigate([`search/${val}`]);
//   }

// }
// import { Component } from '@angular/core';
// import { ProductService } from '../services/product.service';
// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {
//   searchProducts: any;

//   constructor(private productService: ProductService) {}
//   submitSearch(val: string) {
//     if (val.length >= 3) {
//       console.log("val", val);
//       this.productService.getProducts(1, val).subscribe(response => {
//         this.searchProducts = response;
//         console.log("res", this.searchProducts);
//       });
//     }
//   }
// }
// import { Component } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css'],
// })
// export class HeaderComponent {
//   searchProducts$: Observable<any> | undefined; // Observable variable

//   constructor(private productService: ProductService,) {
//     this.searchProducts$ = undefined;
//   }

//   submitSearch(val: string) {
//     console.log("val", val);
//     this.searchProducts$ = this.productService.getProducts(1, val);
//     this.searchProducts$.subscribe(response => {
//       console.log("res", response);
//     });
//   }
// }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {
//   searchQuery: string = '';

//   constructor(private router: Router) {}

//   submitSearch(): void {
//     if (this.searchQuery.trim()) {
//       this.router.navigate(['/search'], { queryParams: { search: this.searchQuery } });
//     }
//   }
// }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { ProductService } from '../services/product.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent {
//  searchTerm: string = '';
// searchValue: any;

//   constructor(private productService: ProductService, private router: Router) {}

//   searchProducts() {
//     if (this.searchTerm) {
//       this.productService.getProductsByName(this.searchTerm).subscribe(
//         (response) => {
//           this.router.navigate([''], { state: { sproducts: response } });
//         },
//         (error) => {
//           console.error('Error fetching search results', error);
//         }
//       );
//     } else {
//       this.productService.getProducts().subscribe(
//         (response) => {
//           this.router.navigate([''], { state: { products: response } });
//         },
//         (error) => {
//           console.error('Error fetching products', error);
//         }
//       );
//     }
//   }

// }
