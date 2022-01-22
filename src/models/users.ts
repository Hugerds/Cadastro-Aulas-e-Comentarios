import {Column, Entity, BeforeInsert, BeforeUpdate, ObjectIdColumn} from 'typeorm';
import bcrypt from 'bcryptjs';

@Entity('Users')
export class Users {
    @ObjectIdColumn()
    id: string;

    @Column()
    name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;
    
    @BeforeInsert()
    @BeforeUpdate()
    hashPasswords() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}