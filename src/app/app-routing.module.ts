import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { AdminAddproductComponent } from './admin-addproduct/admin-addproduct.component';
import { ProductResolveService } from './product-resolve.service';
import { AdminOrderInformationComponent } from './admin-order-information/admin-order-information.component';
import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BuyProductResolverService } from './buy-product-resolver.service';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { OrderComfirmaionComponent } from './order-comfirmaion/order-comfirmaion.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminShowproductdetailsComponent } from './admin-showproductdetails/admin-showproductdetails.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},

  {path:'register',component:SignupComponent},
  {path:'about',component:AboutComponent},
  {path:'contact-us',component:ContactComponent},

  { path: 'user', component: UserComponent, canActivate: [AuthGuard], data: { roles: ['User'] } },
  { path: 'forbidden', component: ForbiddenComponent },

  { path: 'buyProduct', component: BuyProductComponent,canActivate: [AuthGuard], data: { roles: ['User'] }, resolve: { productDetails: BuyProductResolverService } },

  { path: 'productViewDetails', component: ProductDetailsComponent, resolve: { product: ProductResolveService } },


  { path: 'orderConfirm', component: OrderComfirmaionComponent,canActivate: [AuthGuard], data: { roles: ['User'] }},

  { path: 'myOrders', component: MyOrdersComponent,canActivate: [AuthGuard], data: { roles: ['User'] }},

  {path:'cart',component:CartComponent},

  { path: 'orderInformation', component: AdminOrderInformationComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

  { path: 'showProductDetails', component: AdminShowproductdetailsComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] } },

  {
    path: 'addNewProduct', component: AdminAddproductComponent, canActivate: [AuthGuard], data: { roles: ['Admin'] },

    resolve: {
      product: ProductResolveService
    }
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
