import { DeepPartial, EntityRepository, Repository } from "typeorm";
import { IClass } from "../interfaces/iClassInterface";
import { Classes } from "../models/classes";

@EntityRepository(Classes)
export class ClassRepository extends Repository<Classes> {
    async createClass(classProps: Partial<Classes>) : Promise<Partial<Classes>> 
	{
		await this.save(classProps);
		
		return classProps;
	}

    async getClasses(skipIndex: number) : Promise<DeepPartial<IClass[]>>
    {
        const classes = await this.find({take: 50, skip: skipIndex});
		return classes;
    }

    async getClassById(id: string) : Promise<Partial<Classes>>
    {
        try {
            const classProps = await this.findOne(id);
            return classProps;
        } catch {
            return null;
        }
    }

    async updateClass(classProps: Partial<Classes>) : Promise<Partial<Classes>> 
	{
        const id = classProps.id;
		await this.update(id, classProps);
		return classProps;
	}

    async deleteClassById(id: string) : Promise<boolean>
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