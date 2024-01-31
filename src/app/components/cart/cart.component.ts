import { Component, OnInit } from '@angular/core';
import { CartService } from '../../api/cart.service';
import { AuthService } from '../../api/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
  public products!:any[];
  public grandTotal:number = 0;
  constructor(private cart:CartService,private authService:AuthService,private toastr:ToastrService){

  }
  ngOnInit(): void {
    this.cart.getProduct().subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cart.getTotalPrice();
    })
  }
  // empty cart
  emptyCart(){
    
    this.cart.removeAllItemsFromCart();
    this.toastr.info('Your cart is empty');
  }

  //remove single item form cart
  removeItemFromCart(item:any){
    this.cart.removeCartItem(item);
  }
  logout() {
    this.authService.logout();
  }
}
