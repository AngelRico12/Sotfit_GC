import { Router, Request, Response } from 'express';
import productoController from '../controllers/productoController'

class ProductoRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/',productoController.list );
        this.router.get('/:id',productoController.getOne);
        this.router.post('/', productoController.create);
        this.router.put('/:id', productoController.update);
        this.router.delete('/:id', productoController.deleate);
    }
}

// Inicializa la clase para asegurarte de que se configuren las rutas
const productoRoutes = new ProductoRoutes();
export default productoRoutes.router;
