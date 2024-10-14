import {Request, Response } from 'express';
import pool from '../database'

class ProductoController {

   public async list (req: Request, res: Response) {
        const productos = await pool.query('SELECT * FROM producto');
        res.json(productos)

}

public getOne (req: Request, res: Response) {
    res.json({text: 'This is the game' + req.params.id});

}

    public async create(req: Request,res: Response): Promise<void>{
        await pool.query('INSERT INTO producto set ?', [req.body]);
        res.json({messsage: 'Product saved'});
    }

    public update(req: Request,res: Response){
        res.json({text: 'updating a product' + req.params.id });
    }

    public deleate(req: Request,res: Response){
        res.json({text: 'deleating a product' + req.params.id });
    }


}

const productoController = new ProductoController();
export default productoController;