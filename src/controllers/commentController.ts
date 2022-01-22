import {Request, Response, Router} from 'express';
import asyncHandler from "express-async-handler";
import authMiddleware from '../middlewares/authMiddlewares';
import { Comments } from '../models/comments';
import { CommentService } from '../services/commentService';

export const commentRouter = Router();
const path = "/classes/comments";

//Post Comments, recebe um objeto de Comments
commentRouter.post(`${path}`, authMiddleware, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const commentService = new CommentService();
    const newComment : Partial<Comments> = {
        id_class: req.body.id_class,
        comment: req.body.comment,
        data_created: req.body.data_created
    };
    const retorno = await commentService.createComment(newComment);
    res.json(retorno);
}));

//get Comments, recebe apenas o token e retorna paginado os resultados
commentRouter.get(`${path}`, authMiddleware, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const commentService = new CommentService();
    const id = req.query.id as string;
    const page = parseInt(req.query.page as string);
    const skipIndex = (page - 1) * 50;
    const retorno = await commentService.getCommentByClassId(id, skipIndex);
    res.json(retorno);
}));

//delete Comments, recebe um id
commentRouter.delete(`${path}/:id`, authMiddleware, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const commentService = new CommentService();
    const id = req.params.id as string;
    const retorno = await commentService.deleteCommentById(id);
    res.json(retorno);
}));
