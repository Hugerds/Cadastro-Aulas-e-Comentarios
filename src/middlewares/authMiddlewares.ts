import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { UnauthorizedException } from "../erros/unauthorizedException";

interface TokenPayLoad {
    id: string,
    iat: number,
    exp: number
}

//Middleware para autenticação, é chamado em todas as rotas autenticadas
export default function authMiddleware(req :Request, res: Response, next: NextFunction) {
    const {authorization} = req.headers;

    if(!authorization) {
        throw new UnauthorizedException("Não Autorizado");
    }

    const token = authorization.replace('Bearer', '').trim();

    try {
        const data = jwt.verify(token, process.env.TOKEN_JWT);
        
        const {id} = data as TokenPayLoad;

        req.userId = id;
        return next();
    } catch {
        throw new UnauthorizedException("Não Autorizado");
    }
}