import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, Tree, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Choice } from "./Choice";
import { NestedQuestion } from "./NestedQuestion";

@Entity()
@ObjectType()
export class Question {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // Contains question text
    @Field(() => String)
    @Column()
    question: string;

    @Field(() => String)
    @Column()
    type: string;

    // Field to store the options for single or multiple choice questions
    @Field(type => [Choice], { nullable: true })
    @OneToMany(type => Choice, choice => choice.question)
    choiceOptions?: Choice[];

    // Field to store the nestedQuestion if the type is 'true_false'
    @Field(type => NestedQuestion, { nullable: true })
    @OneToOne(type => NestedQuestion)
    @JoinColumn()
    nestedQuestion?: NestedQuestion;
}
