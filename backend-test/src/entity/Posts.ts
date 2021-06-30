import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
} from "typeorm";

import { Users } from "./Users";
@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @ManyToOne(() => Users)
    @JoinColumn()
    user: Users;

    @CreateDateColumn()
    published: Date;

    @UpdateDateColumn()
    updated: Date;

}
