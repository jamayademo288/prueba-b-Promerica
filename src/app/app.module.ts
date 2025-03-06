import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//Se realiza la separacion entre los modulos y los componentes
import { AppComponent } from './app.component';
import { TablaComponent } from './layout/tabla/tabla.component';

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //importacion del modulo http client para podes usar el http en los servicios
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
