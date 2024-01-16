import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SliderComponent } from './slider/slider.component';
import { CategoriesComponent } from './categories/categories.component';
import { FlashComponent } from './flash/flash.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { PopularProductsComponent } from './popular-products/popular-products.component';
import { ProductReviewComponent } from './product-review/product-review.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAddproductComponent } from './admin-addproduct/admin-addproduct.component';
import { AuthGuard } from './_auth/auth.guard';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_services/user.service';
import { AdminShowproductdetailsComponent } from './admin-showproductdetails/admin-showproductdetails.component';
import { AdminOrderInformationComponent } from './admin-order-information/admin-order-information.component';
import { DragDirective } from './drag.directive';
import { ShowProductImagesDialogComponentComponent } from './show-product-images-dialog-component/show-product-images-dialog-component.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { OrderComfirmaionComponent } from './order-comfirmaion/order-comfirmaion.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { LogoutComponent } from './logout/logout.component';
import { LogoutPopupComponent } from './logout-popup/logout-popup.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductDetailsComponent,
    LoginComponent,
    SignupComponent,
    SliderComponent,
    CategoriesComponent,
    FlashComponent,
    AllCategoriesComponent,
    PopularProductsComponent,
    ProductReviewComponent,
    CartComponent,
    UserComponent,
    ForbiddenComponent,
    AdminComponent,
    AdminAddproductComponent,
    AdminShowproductdetailsComponent,
    AdminOrderInformationComponent,
    DragDirective,
    ShowProductImagesDialogComponentComponent,
    MyOrdersComponent,
    BuyProductComponent,
    OrderComfirmaionComponent,
    AboutComponent,
    ContactComponent,
    FooterComponent,
    MenuComponent,
    LogoutComponent,
    LogoutPopupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    //
    FormsModule,
    HttpClientModule

  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
