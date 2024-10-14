import { Router, Request, Response } from 'express';

class GameRoutes {

    public router: Router;

    constructor() {
        this.router = Router();
        this.config();
    }

    config(): void {
        this.router.get('/', (req: Request, res: Response) => {
            res.send('Games');
        });
    }
}

// Inicializa la clase para asegurarte de que se configuren las rutas
const gameRoutes = new GameRoutes();
export default gameRoutes.router;
