import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-orderpage',
  templateUrl: './orderpage.component.html',
  styleUrls: ['./orderpage.component.css']
})
export class OrderpageComponent {

orderData:any;
    
  constructor(private cartService: CartService) { 
  
  }

  ngOnInit(): void {
    this.getOrderData();
  }

  getOrderData(){
    this.cartService.getOrder().subscribe((data:any)=>{
      this.orderData = data;
      console.log("ordata",this.orderData);
      
    })
  }
}
