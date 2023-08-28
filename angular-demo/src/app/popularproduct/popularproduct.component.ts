import { Component } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-popularproduct",
  templateUrl: "./popularproduct.component.html",
  styleUrls: ["./popularproduct.component.css"],
})
export class PopularproductComponent {
  popularProducts: any[] = [];
  productDetail: any;
  isProduct: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.getPopularProduct();
  }

  getPopularProduct() {
    this.productService.getPopularProduct().subscribe((data: any) => {
      this.popularProducts = data.popularProducts; // Extract the array from the response
      console.log("pop", this.popularProducts);
    });
  }

  back() {
    this.router.navigate(["/"]);
  }

  redirectToProductdetail(product: any) {
    this.productDetail = product;
    console.log("heloo", this.productDetail);
    this.isProduct = true;
  }

  goToPopularProduct() {
    this.isProduct = false;
  }
}
