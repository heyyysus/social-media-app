import { User } from "src/users/user.entity";
import { 
    Column, 
    CreateDateColumn, 
    DeleteDateColumn, 
    Entity, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    OneToMany, 
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

    @ManyToMany((type) => User, (user) => user.posts)
    @JoinTable()
    likes: User[]
}