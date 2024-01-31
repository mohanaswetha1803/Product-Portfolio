import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  // wallpapers = [
  //   'src/app/comoponents/home/wallpapers/Company landsca 0c25e895-1cc4-4753-a236-4c78e6fd0fc0.png',
  //   'src/app/comoponents/home/wallpapers/Company landsca 63ed3af1-63fb-4515-9b99-e9dc4fa9a2a0.png',

  //   // Add more wallpaper URLs as needed
  // ];
  constructor(private router: Router, private authService: AuthService) { }
  navigateToElectricalProducts() {
    const selectedOption = 'Electronics';
    this.router.navigate(['/products'], { queryParams: { option: selectedOption } });
  }
  navigateToFootwearProducts() {
    const selectedOption = 'Footwear';
    this.router.navigate(['/products'], { queryParams: { option: selectedOption } });
  }
  navigateToPersonalCareProducts() {
    const selectedOption = 'Personal Care';
    this.router.navigate(['/products'], { queryParams: { option: selectedOption } });
  }
  logout() {
    this.authService.logout();
  }
}
