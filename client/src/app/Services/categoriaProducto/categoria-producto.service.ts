import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {

  API_URL = 'http://localhost:3000/api/categoriaProducto';  // Ajusta según tu backend

  constructor(private http: HttpClient) { }

  // Obtener todas las categorías
  getCategorias(): Observable<any> {
    return this.http.get(`${this.API_URL}`);
  }

  // Obtener una categoría por ID
  getCategoria(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }

  // Crear una categoría
  createCategoria(categoria: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, categoria);
  }

  // Actualizar una categoría
  updateCategoria(id: number, categoria: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, categoria);
  }

  // Eliminar una categoría
  deleteCategoria(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
