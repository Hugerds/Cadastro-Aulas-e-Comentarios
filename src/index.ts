import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';
import { classRouter } from './controllers/classController';
import { errorHandler } from './erros/errorHandler';
import { commentRouter } from './controllers/commentController';
import { userRouter } from './controllers/userController';

Application();
const app = express();
async function Application() {
    const connection = createConnection().then(() => console.log("Banco Conectado"));
      
	connection.catch(error => console.log(error));
	await connection;
    const port = process.env.PORT ?? 3000;

    app.use(express.json());
    app.use(commentRouter);
    app.use(classRouter);
    app.use(userRouter);
    
	app.use(errorHandler);
    app.listen(port, async () => {
		console.log(`Example app listening at http://localhost:${port}`);
	});
}

export {app};