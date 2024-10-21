import { Component, OnInit } from '@angular/core';
import { CategoriaProductoService } from '../../../Services/categoriaProducto/categoria-producto.service';  // Asegúrate de ajustar la ruta
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-producto',
  templateUrl: './categoria-producto.component.html',
  styleUrls: ['./categoria-producto.component.css']
})
export class CategoriaProductoComponent implements OnInit {
  categorias: any[] = [];
  categoria: any = {};  // Objeto que almacena la categoría actual
  editMode: boolean = false;  // Modo edición (por defecto está desactivado)

  constructor(private categoriaProductoService: CategoriaProductoService) { }

  ngOnInit(): void {
    this.getCategorias();  // Cargamos todas las categorías al iniciar
  }

  // Método para obtener todas las categorías
  getCategorias() {
    this.categoriaProductoService.getCategorias().subscribe(
      res => {
        this.categorias = res;
      },
      err => console.error(err)
    );
  }

  // Método para guardar una nueva categoría
  saveNewCategoria() {
    this.categoriaProductoService.createCategoria(this.categoria).subscribe(
      res => {
        this.getCategorias();  // Actualizamos la lista de categorías
        this.categoria = {};  // Limpiamos el formulario
      },
      err => console.error(err)
    );
  }

  // Método para iniciar la edición de una categoría
  editCategoria(categoria: any) {
    this.categoria = { ...categoria };  // Copiamos la categoría seleccionada
    this.editMode = true;  // Activamos el modo edición
  }

  // Método para actualizar una categoría existente
  updateCategoria() {
    this.categoriaProductoService.updateCategoria(this.categoria.id_categoria, this.categoria).subscribe(
      res => {
        this.getCategorias();  // Actualizamos la lista de categorías
        this.editMode = false;  // Desactivamos el modo edición
        this.categoria = {};  // Limpiamos el formulario
      },
      err => console.error(err)
    );
  }

  // Método para cancelar la edición
  cancelEdit() {
    this.editMode = false;  // Desactivamos el modo edición
    this.categoria = {};  // Limpiamos el formulario
  }

  // Método para eliminar una categoría
  deleteCategoria(id: number) {
    this.categoriaProductoService.deleteCategoria(id).subscribe(
      res => {
        this.getCategorias();  // Actualizamos la lista de categorías
      },
      err => console.error(err)
    );
  }
}