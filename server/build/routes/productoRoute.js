"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const productoController_1 = __importDefault(require("../controllers/productoController"));

class ProductoRoutes {
    constructor() {
        this.router = Router();
        this.config();
    }

    config() {
        this.router.get('/', productoController_1.default.list);
        this.router.get('/:id', productoController_1.default.getOne);
        this.router.post('/', productoController_1.default.create);
        this.router.put('/:id', productoController_1.default.update);
        this.router.delete('/:id', productoController_1.default.delete); // Asegúrate de que delete está correctamente definido
    }
}

const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
