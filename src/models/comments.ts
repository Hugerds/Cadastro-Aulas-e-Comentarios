import {Column, Entity, ObjectIdColumn, CreateDateColumn} from 'typeorm';

@Entity('Comments')
export class Comments {
    @ObjectIdColumn()
    id: string;
    
    @Column()
    id_class: string;

    @Column()
    comment: string;
    
	@Column({ type: "date" })
	@CreateDateColumn()
    data_created: Date;
}