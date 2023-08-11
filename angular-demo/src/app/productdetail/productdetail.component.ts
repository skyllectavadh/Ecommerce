import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css'],
})
export class ProductdetailComponent implements OnInit {
  @Input() productdetail: any = {};

  selectedQuantity: number = 1;

  cartDetail: any[] = [];
  isCart: boolean = false;
  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    console.log('productdetail', this.productdetail);
  }
  addToCart() {
    const productId = this.productdetail.id;
    const quantity = this.selectedQuantity;
    const price = this.productdetail.price;

    // Get the token from the localStorage
    const token = localStorage.getItem('token');
    if (token !== null) {
      // Decode the token to obtain the userId
      const decodedToken: any = jwt_decode(token);

      // Get the userId from the decoded token
      const userId = decodedToken.userId;

      // Prepare the product data to send to the server
      const productData = {
        items: [
          {
            productId: productId,
            quantity: quantity,
            price: price,
          },
        ],
        userId: userId,
      };
      
      this.cartService.saveProduct(productData).subscribe(

        (response: any) => {

          try {
            let jsonResponse: any;

            if (typeof response === 'string') {
              jsonResponse = JSON.parse(response);
            } else {
              jsonResponse = response;
            }

            console.log('Product added to cart successfully:', jsonResponse);
            this.router.navigate(['/cart']);

          } catch (error) {
            console.log("err",error);
          }
        },
        (error) => {
          console.error('Error while adding product to cart:', error);
          // this.router.navigate(['/cart']);
        }
      );
    } else {
      console.error('Token not found in localStorage.');
    }
  }

  // addToCart() {
  //   const productId = this.productdetail.id;
  //   const quantity = this.selectedQuantity;
  //   const price = this.productdetail.price;

  //   // Get the token from the localStorage
  //   const token = localStorage.getItem('token');

  //   if (token !== null) {
  //     const decodedToken: any = jwt_decode(token); //token is key where the token is stored in local sto

  //     const userId = decodedToken.userId;

  //     const productData = {
  //       items: [
  //         {
  //           productId: productId,
  //           quantity: quantity,
  //           price: price,
  //         },
  //       ],
  //       userId: userId,
  //     };

  //     this.cartService.saveProduct(productData).subscribe(
  //       (response) => {
  //         // Handle the response from the server if needed.
  //         console.log('Product added to cart successfully:', response);
  //       },
  //       (error) => {
  //         // Handle errors if any.
  //         console.error('Errors while adding product to cart:', error);
  //       }
  //     );
  //   } else {
  //     console.error('Token not found in localStorage.');
  //   }
  // }
}

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-productdetail',
//   templateUrl: './productdetail.component.html',
//   styleUrls: ['./productdetail.component.css']
// })
// export class ProductdetailComponent implements OnInit{

//   product: any;

//   constructor(private route: ActivatedRoute) {}

//   ngOnInit() {
//     // this.productId = this.route.snapshot.params['id'];
//     // console.log("productId", this.productId);

//     this.product = history.state.product;
//     // console.log("product", this.product);
//   }
// }

// import { ActivatedRoute } from '@angular/router';
// import { Component, OnInit ,Input } from '@angular/core';
// import { Router } from '@angular/router';
// import {CartService} from '../services/cart.service'

// @Component({ //1
//   selector: 'app-productdetail',
//   templateUrl: './productdetail.component.html',
//   styleUrls: ['./productdetail.component.css']
// })
// export class ProductdetailComponent implements OnInit{

//   @Input() productdetail: any = {};

//   selectedQuantity: number = 1;

//   cartDetail: any[] = [];
//   isCart: boolean = false;
//   constructor(private router: Router,private cartService:CartService) {

//   }

//   ngOnInit() {
//     console.log('productdetail', this.productdetail);
//   }
//     // this.productId = this.route.snapshot.params['id'];
//     // console.log("productId", this.productId);

//     // this.product = history.state.product;
//     // console.log("product", this.product);

//   // sendToCart(productdetail: any) {
//   //   this.cartDetail = productdetail;
//   //   this.isCart = true;

//   //   this.router.navigate(['/cart']);

//   //   const cartItemJSON = localStorage.getItem('cartItem');
//   //   const cartItem = cartItemJSON ? JSON.parse(cartItemJSON) : [];
//   //   cartItem.push(productdetail);
//   //   localStorage.setItem('cartItem', JSON.stringify(cartItem));
//   // }

//   addToCart() {
//     const productId = this.productdetail.id;

//     const quantity = this.selectedQuantity;

//     const price = this.productdetail.price;

//     // Prepare the product data to send to the server
//     const productData = {
//       items: [
//         {
//           productId: productId,
//           quantity: quantity,
//           price: price,
//         },
//       ],
//       userId: "648ff670aeff42b047a22556", // Replace this with the actual userId from your app's logic
//     };

//     // Call the CartService to add the product to the cart.
//     this.cartService.saveProduct(productData).subscribe(
//       (response) => {
//         // Handle the response from the server if needed.
//         console.log('Product added to cart successfully:', response);
//       },
//       (error) => {
//         // Handle errors if any.
//         console.error('Error while adding product to cart:', error);
//       }
//     );
//   }

// //   addToCart() {

// //   const productId = this.productdetail.id;
// //   const productPrice = this.productdetail.price;
// //   const quantity = this.selectedQuantity;

// //   const productData = {
// //     productId: productId,
// //     quantity: quantity,
// //     price:productPrice
// //   };

// //   this.cartService.saveProduct(productData).subscribe(
// //     (response) => {
// //       console.log('Product added to cart successfully:', response);
// //     },
// //     (error) => {
// //       console.error('Error while adding product to cart:', error);
// //     }
// //   );
// // }
// }

// sendToCart(productdetail:any){
//   this.cartDetail = productdetail
//   this.isCart = true
//   const cartItemJSON = localStorage.getItem('cartItem');
//   // console.log("zzz",cartItemJSON);
//   // console.log("l",localStorage);

//   const cartItem = cartItemJSON ? JSON.parse(cartItemJSON) : [];
//   // console.log("ci",cartItem);

//   // Add the productdetail to the cart items array
//   cartItem.push(productdetail);

//   // Save the updated cart items to local storage
//   localStorage.setItem('cartItem', JSON.stringify(cartItem));
// }
