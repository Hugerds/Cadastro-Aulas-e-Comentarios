import { getCustomRepository } from "typeorm";
import { BadRequestException } from "../erros/badRequestException";
import { NotAcceptableException } from "../erros/notAcceptableException";
import { NotFoundException } from "../erros/notFoundException";
import { Comments } from "../models/comments";
import { ClassRepository } from "../repositories/classRepository";
import { CommentRepository } from "../repositories/commentRepository";

export class CommentService {
    commentRepository = getCustomRepository(CommentRepository)
    classRepository = getCustomRepository(ClassRepository)
    async createComment(commentProps: Partial<Comments>) : Promise<Partial<Comments>>
	{
		//Verificação de campos obrigatórios
		if(commentProps.id_class.trim() == "" || commentProps.comment.trim() == "") {
            throw new NotAcceptableException("Preencha todos os campos obrigatórios");
        }
		const findClass = await this.classRepository.getClassById(commentProps.id_class);
		if(!findClass) {
			throw new NotFoundException("Aula não encontrada");
		}
		//Adiciona um valor a mais no total_comments a cada comentário cadastrado
		findClass.total_comments+=1;
		await this.classRepository.updateClass(findClass);
		return await this.commentRepository.createComment(commentProps);
	}

	async getCommentByClassId(id: string, skipIndex: number) : Promise<Partial<Comments[]>>
	{
		try {
			const findClass = await this.classRepository.getClassById(id);
			if(!findClass) {
				throw new NotFoundException("Aula não encontrada");
			}
			return await this.commentRepository.getCommentByClassId(id, skipIndex);
		} catch {
            throw new BadRequestException("Erro ao procurar comentário");
		}
	}

	async deleteCommentById(id: string) : Promise<boolean>
	{
		const findComment = await this.commentRepository.getCommentById(id);
		if(!findComment) {
			throw new NotFoundException("Comentário não encontrado");
		}
		const findClass = await this.classRepository.getClassById(findComment.id_class);
		//Deleta um valor a mais no total_comments a cada comentário cadastrado
		findClass.total_comments-=1;
		await this.classRepository.updateClass(findClass);
		return await this.commentRepository.deleteCommentById(id);
	}
}