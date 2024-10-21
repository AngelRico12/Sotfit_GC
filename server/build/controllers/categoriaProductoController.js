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

class CategoriaProductoController {
    // Listar todas las categorías
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categorias = yield database_1.default.query('SELECT * FROM categoria_producto');
            res.json(categorias);
        });
    }

    // Obtener una categoría por ID
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categoria = yield database_1.default.query('SELECT * FROM categoria_producto WHERE id_categoria = ?', [id]);
            if (categoria.length > 0) {
                res.json(categoria[0]);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        });
    }

    // Crear una nueva categoría
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO categoria_producto set ?', [req.body]);
            res.json({ message: 'Category saved' });
        });
    }

    // Actualizar una categoría existente
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedCategoria = req.body;
            yield database_1.default.query('UPDATE categoria_producto SET ? WHERE id_categoria = ?', [updatedCategoria, id]);
            res.json({ message: 'Category updated' });
        });
    }

    // Eliminar una categoría por ID
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM categoria_producto WHERE id_categoria = ?', [id]);
            res.json({ message: 'Category deleted' });
        });
    }
}

const categoriaProductoController = new CategoriaProductoController();
exports.default = categoriaProductoController;
