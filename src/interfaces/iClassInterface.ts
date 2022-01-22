//Interface criada para retornar um objeto de Classes com os comentários, last_comment e last_comment_date
export interface IClass {
    id: string;
    name: string;
    description: string;
    video: string;
    data_init: Date;
    data_end: Date;
    data_created: Date;
    data_updated: Date;
    total_comments: number;
    last_comment: string;
    last_comment_date: Date;
    comments: string[]
}