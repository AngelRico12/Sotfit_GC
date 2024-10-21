// producto.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../Services/producto.service';
import { CategoriaProductoService } from 'src/app/Services/categoriaProducto/categoria-producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto: any = {
    nombre: '',
    descripcion: '',
    id_categoria: null,
    precio: 0,
    estado: 'disponible',
    qr: ''  // Nuevo campo
  };

  productos: any = [];
categorias: any = [];

  constructor(private productoService: ProductoService,private categoriaProductoService: CategoriaProductoService) { }


  ngOnInit(): void {
    this.listProducts();
    this.listCategorias();  // Nueva función para cargar las categorías
  }

  // Función para cargar categorías
listCategorias() {
  this.categoriaProductoService.getCategorias().subscribe(
    res => this.categorias = res,
    err => console.error(err)
  );
}

  // Obtener lista de productos
  listProducts() {
    this.productoService.getProducts().subscribe(
      res => this.productos = res,
      err => console.error(err)
    );
  }

  // Guardar producto
  saveProduct() {
    if (this.producto.id_producto) {
      // Actualizar producto
      this.productoService.updateProduct(this.producto.id_producto, this.producto).subscribe(
        res => this.listProducts(),
        err => console.error(err)
      );
    } else {
      // Crear producto
      this.productoService.createProduct(this.producto).subscribe(
        res => this.listProducts(),
        err => console.error(err)
      );
    }
    this.resetForm();
  }

  // Editar producto
  editProduct(prod: any) {
    this.producto = Object.assign({}, prod);
  }

  // Eliminar producto
  deleteProduct(id: number) {
    this.productoService.deleteProduct(id).subscribe(
      res => this.listProducts(),
      err => console.error(err)
    );
  }

  // Resetear formulario
  resetForm() {
    this.producto = { nombre: '', descripcion: '', categoria: '', precio: 0, estado: 'disponible' };
  }
}
