import { NextFunction, Request, Response } from "express";
import { ErrorBase } from "./errorBase";

//Middleware para erro, sempre que há uam exceção personalizada ele passa por aqui para definir o response com o status e model
export function errorHandler(error: ErrorBase, request: Request, response: Response, next: NextFunction) : void {

	let status = 500;
	let body = {
		message: "Internal server error",
	};
    
    
	if(error.isBackendThrowableError){
		status = error.status;
		body = error as any;
	}
	else {
		console.error(error);
	}
    
	response.status(status).json(body);
}