import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { DashboardComponent } from './dashboardpage/dashboardpage.component';
import { EditpageComponent } from './editpage/editpage.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { BuypageComponent } from './buypage/buypage.component';
import { SearchComponent } from './search/search.component';
import { OrderpageComponent } from './orderpage/orderpage.component';
import { PopularproductComponent } from './popularproduct/popularproduct.component';
// import { SearchResultsComponent } from './search-results/search-results.component';

const routes: Routes = [
  {
    path: 'registration/login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'admin',
    component: AdminpageComponent,
  },
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path:'search/:name',
    component:SearchComponent,
  },

  {
    path: 'edit/:id',
    component: EditpageComponent,
   },
   {
    path: 'cart',
    component: CartpageComponent,
   },
   {
    path: 'productdetail',
    component: ProductdetailComponent,
   },
   {
    path: 'buypage',
    component: BuypageComponent,
   },
   {
    path: 'order',
    component: OrderpageComponent,
   },
   {
    path: 'popularproduct',
    component: PopularproductComponent,
   },
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
