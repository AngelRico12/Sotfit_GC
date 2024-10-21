import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { ProductoService } from '../app/Services/producto.service';
import { CategoriaProductoComponent } from './Components/categoriaProducto/categoria-producto/categoria-producto.component';
import { CategoriaProductoService } from './Services/categoriaProducto/categoria-producto.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductoComponent,
    CategoriaProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ProductoService, CategoriaProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
