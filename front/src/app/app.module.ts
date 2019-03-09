import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrandService } from './services/brand.service';
import { AppComponent } from './app.component';
// import { CategoryComponent } from './components/category/category.component';
// import { CategoryService } from './services/category.service';
import { HttpClientModule } from '@angular/common/http';
// import { ProductComponent } from './components/product/product.component';
// import { CategorySelectorComponent } from './components/category-selector/category-selector.component';
// import { BrandSelectorComponent } from './components/brand-selector/brand-selector.component';
// import { UploadImageComponent } from './components/upload-image/upload-image.component';
// import { ProviderComponent } from './components/provider/provider.component';
// import { ProviderService } from './services/provider.service';
// import { PriceComponent } from './components/price/price.component';
// import { PriceService } from './services/price.service';
// import { ProviderSelectorComponent } from './components/provider-selector/provider-selector.component';
import { AppRoutingModule } from './/app-routing.module';
// import { BrandsComponent } from './components/brands/brands.component';
// import { BrandDetailComponent } from './components/brand-detail/brand-detail.component';
// import { ProductDetailComponent } from './components/product-detail/product-detail.component';
// import { ProductSelectorComponent } from './components/product-selector/product-selector.component';
// import { PriceDetailComponent } from './components/price-detail/price-detail.component';
// import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
// import { ProviderDetailComponent } from './components/provider-detail/provider-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { StockComponent } from './components/stock/stock.component';
// import { SaleComponent } from './components/sale/sale.component';
// import { SpinnerComponent } from './components/spinner/spinner.component';
// import { StatsComponent } from './components/stats/stats.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';
// import { ChartgraphComponent } from './components/chartgraph/chartgraph.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { FlashMessagesModule } from 'angular2-flash-messages/module';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    // CategoryComponent,
    // ProductComponent,
    // CategorySelectorComponent,
    // BrandSelectorComponent,
    // UploadImageComponent,
    // ProviderComponent,
    // PriceComponent,
    // ProviderSelectorComponent,
    // BrandsComponent,
    // BrandDetailComponent,
    // ProductDetailComponent,
    // ProductSelectorComponent,
    // PriceDetailComponent,
    // CategoryDetailComponent,
    // ProviderDetailComponent,
    // StockComponent,
    // SaleComponent,
    // SpinnerComponent,
    // StatsComponent,
    // ChartgraphComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    ChartsModule,
    FlashMessagesModule.forRoot(),
    HttpModule
  ],

  providers: [
    // BrandService,
    // CategoryService,
    // ProviderService,
    // PriceService,
    ValidateService,
    AuthService,
    AuthGuard
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
