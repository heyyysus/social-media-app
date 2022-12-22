import { Role } from 'src/auth/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({ name: "User" })
export class User {
    @PrimaryGeneratedColumn()
    user_id: Number;

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
    
}