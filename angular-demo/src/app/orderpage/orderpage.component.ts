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
      // console.log("ordata",this.orderData);
      
      
    })
  }

  updateItemStatus(orderId: string, itemId: string) {
    
    const updatedStatus = this.orderData.orders
      .find((order: { _id: string; }) => order._id === orderId)
      .items.find((item: { _id: string; }) => item._id === itemId).status;
    // console.log("upd",updatedStatus);
    
    this.cartService.updateOrderItemStatus(orderId, itemId, updatedStatus)
      .subscribe(response => {
        // Handle the response if needed
        console.log('Item status updated:', response);
      });
  }
}
