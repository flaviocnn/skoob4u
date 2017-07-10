import { MaterializeModule } from 'angular2-materialize';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//modules
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './books/book-detail.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NavComponent } from './navbar/nav.component';

//services
import { AlertService } from './services/alert.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './services/auth.guard';
import { BookService } from './services/book.service';
import { DealService } from './services/deal.service';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';





@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookDetailComponent,
    DashboardComponent,
    NavComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
  ],
  imports: [
    MaterializeModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    DealService,
    MessageService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
