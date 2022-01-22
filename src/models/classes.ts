import {Column, Entity, ObjectIdColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('Classes')
export class Classes {
    @ObjectIdColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    description: string;
    
    @Column()
    video: string;
    
	@Column({ type: "date" })
    data_init: Date;
    
	@Column({ type: "date" })
    data_end: Date;
    
	@Column({ type: "date" })
	@CreateDateColumn()
    data_created: Date;
    
	@Column({ type: "date" })
	@UpdateDateColumn()
    data_updated: Date;
    
    @Column()
    total_comments: number;
}