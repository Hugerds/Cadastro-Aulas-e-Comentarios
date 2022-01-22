import {Request, Response, Router} from 'express';
import { Classes } from '../models/classes';
import { ClassService } from '../services/classService';
import asyncHandler from "express-async-handler";
import authMiddleware from '../middlewares/authMiddlewares';

export const classRouter = Router();
const path = "/classes";

//Post classes, recebe um objeto de Classes
classRouter.post(`${path}`, authMiddleware, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const classService = new ClassService();
    const newClass : Partial<Classes> = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        video: req.body.video,
        data_init: req.body.data_init,
        data_end: req.body.data_end,
        data_created: req.body.data_created,
        data_updated: req.body.data_updated,
        total_comments: req.body.total_comments,
    };
    const retorno = await classService.createClass(newClass);
    res.json(retorno);

}));

//get classes, recebe apenas o token e retorna paginado os resultados
classRouter.get(`${path}`, authMiddleware, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const classService = new ClassService();
    const page = parseInt(req.query.page as string);
    const skipIndex = (page - 1) * 50;
    const retorno = await classService.getClasses(skipIndex);
    res.json(retorno);

}));

//get classes, recebe apenas um id de uma aula
classRouter.get(`${path}/:id`, authMiddleware, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const classService = new ClassService();
    const id = req.params.id as string;
    const retorno = await classService.getClassById(id);
    res.json(retorno);

}));

//put classes, recebe um objeto de Classes
classRouter.put(`${path}`, authMiddleware, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const classService = new ClassService();
    const newClass : Partial<Classes> = {
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        video: req.body.video,
        data_init: req.body.data_init,
        data_end: req.body.data_end,
        total_comments: req.body.total_comments,
    };
    const retorno = await classService.updateClass(newClass);
    res.json(retorno);

}));

//delete classes, recebe um id
classRouter.delete(`${path}/:id`, authMiddleware, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const classService = new ClassService();
    const id = req.params.id as string;
    const retorno = await classService.deleteClassById(id);
    res.json(retorno);

}));