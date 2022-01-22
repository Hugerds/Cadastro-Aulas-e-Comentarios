import { getCustomRepository } from "typeorm";
import { Users } from "../models/users";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from 'bcryptjs';
import { UnauthorizedException } from "../erros/unauthorizedException";

export class UserService {
    userRepository = getCustomRepository(UserRepository)
    async loginUser(userProps: Partial<Users>) : Promise<Partial<Users>>
	{
		const findUser = await this.userRepository.findByName(userProps.name);
        if(!findUser) {
			throw new UnauthorizedException("Usuário ou senha inválidos");
        }

        const isValidPassword = await bcrypt.compare(userProps.password, findUser.password);
        if(!isValidPassword) {
			throw new UnauthorizedException("Usuário ou senha inválidos");
        }
        //Deletando password e id para não retornar essas informações para o front
        delete findUser.password;
        delete findUser.id;
		return findUser;
	}
}