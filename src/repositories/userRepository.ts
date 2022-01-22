import { EntityRepository, Repository } from "typeorm";
import { Users } from "../models/users";

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    async findByName(name: string) : Promise<Partial<Users>>
    {
        try {
            const userProps = await this.findOne({name});
            return userProps;
        } catch {
            return null;
        }
    }
}