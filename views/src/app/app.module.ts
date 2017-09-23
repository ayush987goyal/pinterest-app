import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { MasonryModule } from 'angular2-masonry';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { MypicsComponent } from './core/mypics/mypics.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { MongoService } from './mongo.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MypicsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MasonryModule
  ],
  providers: [AuthService, AuthGuard, MongoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
