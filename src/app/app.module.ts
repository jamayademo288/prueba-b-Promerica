import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Se realiza la separacion entre los modulos y los componentes
import { AppComponent } from './app.component';
import { TablaComponent } from './layout/tabla/tabla.component';
import { SvsvFormatPipe } from './shared/pipes/sv-sv-format.pipe';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  declarations: [
    AppComponent,
    TablaComponent,
    SvsvFormatPipe,
    HighlightDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //importacion del modulo http client para podes usar el http en los servicios
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
