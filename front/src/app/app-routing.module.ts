import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BrandsComponent } from './components/brands/brands.component';
import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { ProviderComponent } from './components/provider/provider.component';
import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [AuthGuard] },
  { path: 'brand/:id', component: BrandDetailComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'categories/:id', component: CategoryDetailComponent, canActivate: [AuthGuard] },
  { path: 'providers', component: ProviderComponent, canActivate: [AuthGuard] },
  { path: 'providers/:id', component: ProviderDetailComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
