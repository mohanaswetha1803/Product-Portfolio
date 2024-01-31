import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './api/auth-guard.service';
const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'products',
    component:ProductsComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'cart',
    component:CartComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[AuthGuardService]
  },
  {
    path:'aboutUs',
    component:AboutUsComponent,
    canActivate:[AuthGuardService]  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
