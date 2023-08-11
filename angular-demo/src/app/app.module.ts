import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { DashboardComponent } from './dashboardpage/dashboardpage.component';
import { EditpageComponent } from './editpage/editpage.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BuypageComponent } from './buypage/buypage.component';
// import { SearchPipePipe } from './pipes/search-pipe.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { SearchService } from './services/search.service';

// import { SearchResultsComponent } from './search-results/search-results.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    AdminpageComponent,
    DashboardComponent,
    EditpageComponent,
    CartpageComponent,
    ProductdetailComponent,
    HeaderComponent,
    BuypageComponent,
    SearchComponent
    // SearchResultsComponent,
    // SearchPipePipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgbModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }



