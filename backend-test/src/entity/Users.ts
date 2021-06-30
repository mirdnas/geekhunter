import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate} from "typeorm";
import { MinLength, IsEmail, IsNotEmpty  } from 'class-validator';
import bcrypt from 'bcryptjs';

@Entity()
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(8,{message:'length must be at least 8 characters long'})
    display_name: string;

    @Column({ unique: true })
    @Column({ name: 'email' })
    @IsEmail({}, { message: 'must be a valid email' })
    @IsNotEmpty({ message: 'is required' })
    email!: string;

    @Column({ select: false })
    @MinLength(6)
    @IsNotEmpty({ message: 'is required' })
    password: string;

    @Column()
    image: string

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
      this.password = bcrypt.hashSync(this.password, 8 );
    }
}
