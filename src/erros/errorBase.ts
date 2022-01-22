export interface ErrorBaseDTO {
	message: string | unknown,
	status: number
}

//Model base de erro, todas as personalizadas chamam esse construtor para atribuir a message e status
export class ErrorBase {
	message = {}
	status = 400
	isBackendThrowableError = true

	constructor({ message, status }: ErrorBaseDTO) { 
		this.message = message; 
		this.status = status || this.status;
	}
}