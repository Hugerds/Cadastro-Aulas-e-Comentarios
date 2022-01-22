import { ErrorBase } from "./errorBase";

export class NotFoundException extends ErrorBase {

	constructor(message: string){
		const status = 404;

		super({ message, status });
	}
}