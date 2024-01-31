import { Component, OnInit } from '@angular/core';
import { CartService } from '../../api/cart.service';
import { LoginHeadersService } from '../../api/login-headers.service';
import { AuthService } from '../../api/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public totalItem = 0;
  constructor(private cart:CartService,private loginHeaders:LoginHeadersService,
    private authService: AuthService,private toastr:ToastrService){}
  // Use a method to retrieve the hidden state
  clickOnEmptyCart(){
    if(this.totalItem == 0){
      this.toastr.info("Your cart is empty...")
    }
  }
  areButtonsHidden() {
    return this.loginHeaders.getButtonsHiddenState();
  }
  ngOnInit(): void {
    this.cart.getProduct().subscribe(res=>{
      this.totalItem=res.length;
    })
  }
  logout() {
    this.authService.logout();
  }
}
