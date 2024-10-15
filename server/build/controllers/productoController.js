"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductoController {

    // Obtener todos los productos
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productos = yield database_1.default.query('SELECT * FROM producto');
                res.json(productos);
            } catch (err) {
                res.status(500).json({ message: 'Error fetching products', error: err });
            }
        });
    }

    // Obtener un producto por ID
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const producto = yield database_1.default.query('SELECT * FROM producto WHERE id_producto = ?', [id]);
                if (producto.length > 0) {
                    res.json(producto[0]);
                } else {
                    res.status(404).json({ message: 'Product not found' });
                }
            } catch (err) {
                res.status(500).json({ message: 'Error fetching product', error: err });
            }
        });
    }

    // Crear un nuevo producto
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO producto SET ?', [req.body]);
                res.json({ message: 'Product saved' });
            } catch (err) {
                res.status(500).json({ message: 'Error creating product', error: err });
            }
        });
    }

    // Actualizar un producto existente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query('UPDATE producto SET ? WHERE id_producto = ?', [req.body, id]);
                res.json({ message: 'Product updated' });
            } catch (err) {
                res.status(500).json({ message: 'Error updating product', error: err });
            }
        });
    }

    // Eliminar un producto
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield database_1.default.query('DELETE FROM producto WHERE id_producto = ?', [id]);
                res.json({ message: 'Product deleted' });
            } catch (err) {
                res.status(500).json({ message: 'Error deleting product', error: err });
            }
        });
    }
}

const productoController = new ProductoController();
exports.default = productoController;