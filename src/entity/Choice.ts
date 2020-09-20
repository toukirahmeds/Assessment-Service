import { Field, ObjectType, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Question } from "./Question";

@Entity()
@ObjectType()
export class Choice {
    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(type => String)
    @Column()
    choice: string;

    @Field(() => Question)
    @ManyToOne(type => Question, question => question.choiceOptions)
    question: Question;
}
