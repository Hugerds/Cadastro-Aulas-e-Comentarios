import { ErrorBase } from "./errorBase";

export class NotAcceptableException extends ErrorBase {

	constructor(message: string | unknown){
		const status = 406;

		super({ message, status });
	}
}