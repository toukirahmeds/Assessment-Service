import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, Tree, JoinColumn, JoinTable } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Question } from "./Question";

@Entity()
@ObjectType()
export class Assessment {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => String)
    @Column()
    name: string;

    @Field(type => String)
    @Column({
        unique: true
    })
    assessmentId: string;

    @Field(type => [Question])
    @ManyToMany(type => Question)
    @JoinTable()
    questions: Question[];
}
