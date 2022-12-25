import { User } from "src/users/user.entity";
import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";


@Entity({ name: "EPost" })
export class EPost {
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column()
    body: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
}