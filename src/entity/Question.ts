import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Tree } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Choice } from "./Choice";

@Entity()
@ObjectType()
export class Question {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => String)
    @Column()
    question: string;

    @Field(() => String)
    @Column()
    type: string;

    @Field(type => [Choice], { nullable: true })
    @OneToMany(type => Choice, choice => choice.question)
    choiceOptions?: Choice[];

    @Field(type => ID, { nullable: true })
    @Column({nullable: true})
    @OneToOne(type => Question, question => question.id)
    nestedQuestion?: string;
}
