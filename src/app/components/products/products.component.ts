import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../api/products.service';
import { CartService } from '../../api/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../api/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  // Storing product list
  public productList: any;
  public categories: string[] = [];
  public selectedCategory: string = '';
  public filteredProducts: any[] = [];
  posts: any[] = [];
  searchText: any;
  constructor(private api: ProductsService, private cart: CartService,
    private route: ActivatedRoute,private authService:AuthService,
    private toastr:ToastrService) {   }
  
  // logout() {
  //   this.authService.logout();
  // }
  ngOnInit(): void {
    this.api.getProduct().subscribe(res => {
      //console.log(res);
      this.productList = res;
      this.categories = Array.from(new Set(this.productList.map((item: any) => item.category)));
      this.filteredProducts = [...this.productList]; // initially, show all products
      
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
    });
    this.route.queryParams.subscribe(params => {
      this.selectedCategory = params['option'] || 'All Categories';
    });
    
  }
  filterProductsByCategory() {
    this.filteredProducts = this.selectedCategory ?
      this.productList.filter((item: any) => item.category === this.selectedCategory) :
      [...this.productList]; // show all products if no category selected
  }
  isDropdownOpen: boolean = false;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.isDropdownOpen = false;
    this.filterProductsByCategory();
  }
  
  //add to cart
  addToCart(item: any) {
    this.cart.addToCart(item);
    let itemName = item.title;
    this.toastr.success('Added to cart',itemName);
    console.log(item);
  }
  public likedProducts: Set<number> = new Set<number>(); // Set to store liked product ids

  likeProduct(item: any): void {
    // Check if the product has already been liked
    if (!this.likedProducts.has(item.id)) {
      let likesCount = item.likes;
      likesCount++;
      item.likes++;
      this.api.updateProduct(item, likesCount, item.dislikes).subscribe();
      // Add the product id to the likedProducts set
      this.likedProducts.add(item.id);
    }
  }
  public dislikedProducts: Set<number> = new Set<number>();
  dislikeProduct(item: any): void {
    if (!this.dislikedProducts.has(item.id)) {
      let dislikesCount = item.dislikes;
      item.dislikes++;
      dislikesCount++;
      this.api.updateProduct(item, item.likes, dislikesCount).subscribe();
      this.dislikedProducts.add(item.id);
    }

  }
  //sort
  sortIcon: string = 'bi-sort-numeric-down'; // Default sort icon
  sortField: string = 'price'; // Default sort field

  toggleSortOrder(field: string) {
    if (this.sortField === field) {
      this.sortIcon = this.sortIcon === 'bi-sort-numeric-down' ? 'bi-sort-numeric-up' : 'bi-sort-numeric-down';
    } else {
      this.sortIcon = 'bi-sort-numeric-down';
    }

    this.sortField = field;
    this.sortProducts();
  }

  sortProducts() {
    this.filteredProducts.sort((a: any, b: any) => {
      const valueA = this.sortField === 'price' ? a.price : a.likes;
      const valueB = this.sortField === 'price' ? b.price : b.likes;

      return this.sortIcon === 'bi-sort-numeric-down' ? valueA - valueB : valueB - valueA;
    });
  }
  resetFilters() {
    this.api.getProduct().subscribe(res => {
      //console.log(res);
      this.filteredProducts = res;
    });
    this.selectedCategory='';
    this.searchText = '';
    this.sortIcon = 'bi-sort-numeric-down';
    this.sortProducts();
  }
}
