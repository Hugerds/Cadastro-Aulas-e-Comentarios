
import {Request, Response, Router} from 'express';
import jwt from 'jsonwebtoken';
import { Users } from '../models/users';
import asyncHandler from "express-async-handler";
import { UserService } from '../services/userService';

export const userRouter = Router();
const path = "/users";

//Post Users, recebe um objeto com name e password
userRouter.post(`${path}`, asyncHandler( async(req: Request, res: Response) : Promise<void> => {
    const userService = new UserService();
    const newUser : Partial<Users> = {
        name: req.body.name,
        password: req.body.password,
    };
    const user = await userService.loginUser(newUser);
    const token = jwt.sign({id: user.name}, process.env.TOKEN_JWT, {expiresIn: '1d'});
    res.json({user, token});
}));

