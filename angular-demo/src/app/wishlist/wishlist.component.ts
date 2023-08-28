import { Component } from "@angular/core";
import { WishlistService } from "../services/wishlist.service";
import jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
import { CartService } from "../services/cart.service";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"],
})
export class WishlistComponent {
  wishlistProduct: any; // You might want to create an interface for a better type definition

  constructor(private wishlistService: WishlistService,private router: Router,
    private cartService: CartService,) {}

  ngOnInit(): void {
    this.getWishlist();
  }

  redirectToCart(item:any){
      console.log("item",item);
      console.log("item",item.productId.id);



      // console.log("item",this.wishlistProduct);

      const productId = item.productId.id;
        const price = item.productId.price;
      const quantity = 1;
  
      // Get the token from the localStorage
      const token = localStorage.getItem("token");
      if (token !== null) {
        // Decode the token to obtain the userId
        const decodedToken: any = jwt_decode(token);
  
        // Get the userId from the decoded token
        const userId = decodedToken.userId;
        // console.log("pID",productId);
        // console.log("pri",price);
        // console.log("qua",quantity);
        // console.log("uId",userId);
  
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
  
              if (typeof response === "string") {
                jsonResponse = JSON.parse(response);
              } else {
                jsonResponse = response;
              }
  
              console.log("Product added to cart successfully:", jsonResponse);
              this.router.navigate(["/cart"]);
            } catch (error) {
              console.log("err", error);
            }
          },
          (error) => {
            console.error("Error while adding product to cart:", error);
            // this.router.navigate(['/cart']);
          }
        );
      } else {
        console.error("Token not found in localStorage.");
      }
    }
      
  

  getWishlist() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const decodedToken: any = jwt_decode(token);
      const userId = decodedToken.userId;

      this.wishlistService.getWishlistProduct(userId).subscribe(
        (data: any) => {
          this.wishlistProduct = data.product;
          console.log("wishList",this.wishlistProduct);
          // console.log("wishList",this.wishlistProduct.items.productId);

        },
        (error) => {
          console.error("Error adding product to wishlist:", error);
        }
      );
    } else {
      console.error("Token not found in localStorage.");
    }
  }
}
