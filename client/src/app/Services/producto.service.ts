// producto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  API_URL = 'http://localhost:3000/api/productos';  // Ajusta según tu backend

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getProducts(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  // Obtener un producto por ID
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  // Crear un producto
  createProduct(producto: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, producto);
  }

  // Actualizar un producto
  updateProduct(id: number, producto: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, producto);
  }

  // Eliminar un producto
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  getCategorias(): Observable<any> {
    return this.http.get(`${this.API_URL}/categorias`);
  }
  
}
