import { EPost } from '../posts/epost.entity';
import { Role } from 'src/auth/enums/role.enum';
import { 
    Entity, 
    Column,
    PrimaryGeneratedColumn, 
    Unique, 
    OneToMany, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn, 
    ManyToMany,
    JoinTable,
    RelationCount,
    ManyToOne
} from 'typeorm';

@Entity({ name: "User" })
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    handle: string;

    @Column({ select: false })
    pw_hash: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @OneToMany(() => EPost, post => post.user)
    posts: EPost[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;

    @DeleteDateColumn()
    deletedDate: Date;
    
    @ManyToMany((type) => EPost, (post) => post.likes)
    likes: EPost[]

    @ManyToMany(type => User, user => user.following)
    @JoinTable()
    followers: User[];

    @ManyToMany(type => User, user => user.followers)
    following: User[];

}