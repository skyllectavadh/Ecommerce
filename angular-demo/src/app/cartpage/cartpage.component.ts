// import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.css']
})
export class CartpageComponent  {

  userId: string = '';
  cartData: any;
  quantities: number[] = [1, 2, 3, 4, 5,6,7,8,9,10];
  isUpdate:boolean = true;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.userId = this.getUserIdFromToken(); // Get userId from the token in localStorage
    this.getCartDataByUserId();
  }

  getCartDataByUserId() {
    this.cartService.getCartData(this.userId).subscribe(
      (data: any) => {
        // this.cartData = data.map((item: any) => ({ ...item, editQuantity: false }));
        this.cartData = data;
        // console.log('Cart Data:', this.cartData);
        // console.log('cartitem',this.cartData.items);
      },
      (error) => {
        console.error('Error fetching cart data:', error);
      }
    );
  }



  getUserIdFromToken(): string {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken && decodedToken.userId) {
        return decodedToken.userId;
      }
    }
    return ''; // Return an empty string if the userId is not found in the token
  }

  removeItemFromCart(itemId: string) {
    this.cartService.removeItemFromCart(this.userId, itemId).subscribe(
      (response: any) => {
        // Item removed successfully, update the cartData
        this.getCartDataByUserId();
        console.log('Item removed from cart:', response);
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }


//  onQuantityChange(item: any) {
//   console.log("qcheck",item.quantity);
//   if (item.quantity === 5) {
//     console.log("ifonQchange");

//     item.editQuantity = true;
//   } else {
//     console.log("elseonQchange");
//     item.editQuantity = true;
//     this.updateCartItem(item);
//   }
// }

// updateCartItem(item: any) {
//   // console.log('item');

//   this.cartService.updateCartItem(this.userId, item.id, item.quantity).subscribe(
//     (response: any) => {
//       console.log('Cart item updated:', response);
//       item.editQuantity = false;
//     },
//     (error) => {
//       console.error('Error updating cart item:', error);
//     }
//   );
// }


  updateCartItem(item: any) {
    console.log("item");

    this.cartService.updateCartItem(this.userId, item.id, item.quantity).subscribe(
      (response: any) => {
        console.log('Cart item updated:', response);
        this.isUpdate = true;
      },
      (error) => {
        console.error('Error updating cart item:', error);
        this.isUpdate = false;
      }
    );
  }


  goBack() {
    console.log("windo",window.history);

    window.history.back();
  }
}


  // updateCartItem(item: any) {//or 1
  //   this.cartService.updateCartItem(this.userId, item.id, item.quantity).subscribe(
  //     (response: any) => {
  //       console.log('Cart item updated:', response);
  //       // Optionally, you can update the cart data after successful update
  //       // this.getCartDataByUserId();
  //     },
  //     (error) => {
  //       console.error('Error updating cart item:', error);
  //     }
  //   );
  // }

  // itemId:string = '';
  // getItemsId(itemId:string) {
  //   console.log("itemid",itemId);
  //   this.cartService.deleteCartItem(this.userId,this.itemId).subscribe(
  //     (data:any) => {

  //     }
  //   )
  // }
  // quantityChanged(item: any) {
  //   // If the quantity is -1 (Other), set the flag to show the custom input box
  //   if (item.quantity === -1) {
  //     item.showCustomInput = true;
  //     // If you want to clear the custom quantity input when selecting "Other":
  //     // item.customQuantity = '';
  //   } else {
  //     // Otherwise, hide the custom input box and set the item.quantity to the selected value
  //     item.showCustomInput = false;
  //   }

  //   // Call the CartService to update the cart item quantity using the backend API
  //   this.cartService.updateCartItem(this.userId, item.id, item.quantity).subscribe(
  //     (response: any) => {
  //       console.log('Cart item updated:', response);
  //       // Optionally, you can update the cart data after successful update
  //       // this.getCartDataByUserId();
  //     },
  //     (error) => {
  //       console.error('Error updating cart item:', error);
  //     }
  //   );
  // }

  // onQuantityChange(item: any) {
  //   if (item.quantity === 5) {
  //     // If user selects "5+", show the input field for custom quantity
  //     // You can add validation logic here if needed
  //     item.quantity = 5; // Reset to 5 to show "5+" in the dropdown
  //   } else {
  //     // Handle other quantity options
  //   }
  // }

  // userId!: string;
  // cartData: any;

  // constructor(private cartService: CartService, private jwtHelper: JwtHelperService) { }

  // ngOnInit(): void {
  //   this.getUserIdFromToken();
  //   this.getCartDataByUserId();
  // }

  // getUserIdFromToken(): void {
  //   const token = localStorage.getItem('token');

  //   if (token) {
  //     const decodedToken = this.jwtHelper.decodeToken(token);
  //     this.userId = decodedToken.userId;
  //   } else {
  //     // Handle the case when there's no token or token is invalid
  //     console.error('Token not found or invalid');
  //   }
  // }

  // getCartDataByUserId(): void {
  //   this.cartService.getCartData(this.userId).subscribe(
  //     (data: any) => {
  //       this.cartData = data;
  //       console.log('Cart Data:', this.cartData);
  //     },
  //     (error) => {
  //       console.error('Error fetching cart data:', error);
  //     }
  //   );
  // }




// @Input() cartdetail: any = [];
// @Input() selectedQuantity: number = 1;
// // productId!: string;
// // product: any;

// // constructor(private route: ActivatedRoute) {}

// // ngOnInit() {
// //   // this.productId = this.route.snapshot.params['id'];
// //   // console.log("productId", this.productId);

// //   this.product = history.state.product;
// //   // console.log("product", this.product);
// // }



// // product: any;

// // constructor(private route: ActivatedRoute) {

// // }

// // ngOnInit() {
// //   this.product = history.state.product;
// //   console.log(this.product);
// // }

// constructor(private router: Router) {

// }

//   redirectToRegistration(): void {
//   const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage

//   if (token) {
//     console.log('Token found:', token);
//     this.router.navigate(['/buypage']);
//     // Perform any other actions if the token is present
//   } else {
//     console.log('Token not found. Redirecting to registration page...');
//     this.router.navigate(['/registration']); // Replace '/registration' with the actual route path of your registration page
//   }
// }
// ngOnInit() {
//   console.log("cartdetail",this.cartdetail);

// }

