import { EntityRepository, Repository } from "typeorm";
import { Comments } from "../models/comments";

@EntityRepository(Comments)
export class CommentRepository extends Repository<Comments> {
    async createComment(commentProps: Partial<Comments>) : Promise<Partial<Comments>> 
	{
		await this.save(commentProps);
		
		return commentProps;
	}

    async getCommentByClassId(id: string, skipIndex: number) : Promise<Partial<Comments[]>>
    {
        try {
            const classProps = await this.find({where: {id_class: id}, take: 50, skip: skipIndex});
            return classProps;
        } catch {
            return null;
        }
    }

    //Método para buscar o último comentário baseado num id_class
    async getLasCommentByClassId(id: string) : Promise<Partial<Comments>>
    {
        try {
            const classProps = await this.find({where: {id_class: id}, take: 1, order: {data_created: "DESC"}});
            return classProps[0];
        } catch {
            return null;
        }
    }

    async getThreeLastcommentsByClassId(id: string) : Promise<Partial<Comments[]>>
    {
        try {
            const classProps = await this.find({where: {id_class: id}, take: 3, order: {data_created: "DESC"}});
            return classProps;
        } catch {
            return null;
        }
    }

    async getCommentById(id: string) : Promise<Partial<Comments>>
    {
        try {
            const classProps = await this.findOne(id);
            return classProps;
        } catch {
            return null;
        }
    }

    async deleteCommentById(id: string) : Promise<boolean>
    {
        try {
            const classProps = await this.delete(id);
            if(!classProps)
                return false;
            return true;
        } catch {
            return false;
        }
    }
}