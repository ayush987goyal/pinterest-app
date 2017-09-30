import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { MasonryModule } from 'angular2-masonry';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';
import { DialogModule } from 'primeng/primeng';
import { MdCardModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';
import { MypicsComponent } from './core/mypics/mypics.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { MongoService } from './mongo.service';
import { UserService } from './user.service';
import { InterestComponent } from './core/interest/interest.component';
import { SocketService } from './socket.service';
import { DummyComponent } from './core/dummy/dummy.component';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.localUrl + '/graphql'
  }),
});

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    MypicsComponent,
    InterestComponent,
    DummyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MasonryModule,
    DialogModule,
    MdCardModule,
    ApolloModule.forRoot(provideClient)
  ],
  providers: [AuthService, AuthGuard, MongoService, UserService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
