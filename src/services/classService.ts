import { DeepPartial, getCustomRepository } from "typeorm";
import { NotAcceptableException } from "../erros/notAcceptableException";
import { NotFoundException } from "../erros/notFoundException";
import { IClass } from "../interfaces/iClassInterface";
import { Classes } from "../models/classes";
import { ClassRepository } from "../repositories/classRepository";
import { CommentRepository } from "../repositories/commentRepository";

export class ClassService {
    classesRepository = getCustomRepository(ClassRepository)
    commentRepository = getCustomRepository(CommentRepository)
    async createClass(classesProps: Partial<Classes>) : Promise<Partial<Classes>>
	{
		//Verificação campo nome por ser obrigatório e não ter aulas sem nome no banco de dados
		if(classesProps.name.trim() == "") {
            throw new NotAcceptableException("Preencha todos os campos obrigatórios");
        }
		//Sempre que é criação gerar o total comments como 0 e data de atualização como a data atual, a data de criação é colocada automaticamente
		classesProps.total_comments = 0;
		classesProps.data_updated = new Date();
		
		return await this.classesRepository.createClass(classesProps);
	}

	async getClasses(skipIndex: number) : Promise<DeepPartial<IClass[]>>
	{
		const aulas = await this.classesRepository.getClasses(skipIndex);
		//Percorre o array de aulas
		for (const element of aulas) {
			const id = element.id;
			//Verifica o comentário relacionado à aula
			const item = await this.commentRepository.getLasCommentByClassId(id.toString());
			//Se o item não for nulo a variável last_comment e last_comment_date receberam os valores
			if(item) {
				element.last_comment = item.comment;
				element.last_comment_date = item.data_created;
			}
		}
		return aulas;
	}

	async getClassById(id: string) : Promise<Partial<IClass>>
	{
		const findClass = await this.classesRepository.getClassById(id) as IClass;
		//Se a aula for nula uma exceção é disparada
		if(!findClass) {
			throw new NotFoundException("Aula não encontrada");
		}
		const idClass = findClass.id.toString();
		const findComments = await this.commentRepository.getThreeLastcommentsByClassId(idClass);
		//Busca comentários e se não for nulo itera sobre eles e coloca o texto dos comentários no vetor comentários
		//Que depois será atribuído aos comentários da aula
		if(findComments) {
			const comentarios:string[] = [];
			for (const iterator of findComments) {
				comentarios.push(iterator.comment);
			}
			findClass.comments = comentarios;
		}
		return findClass;
	}

	async updateClass(classesProps: Partial<Classes>) : Promise<Partial<Classes>>
	{
		const findClass = await this.classesRepository.getClassById(classesProps.id);
		if(!findClass) {
			throw new NotFoundException("Aula não encontrada");
		}
		classesProps.data_updated = new Date();

		return await this.classesRepository.updateClass(classesProps);
	}

	async deleteClassById(id: string) : Promise<boolean>
	{
		const findClass = await this.classesRepository.getClassById(id);
		if(!findClass) {
			throw new NotFoundException("Aula não encontrada");
		}
		return await this.classesRepository.deleteClassById(id);
	}
}