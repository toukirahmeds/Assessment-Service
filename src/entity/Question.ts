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

    @Field(() => String)
    @Column()
    question: string;

    @Field(() => String)
    @Column()
    type: string;

    @Field(type => [Choice], { nullable: true })
    @OneToMany(type => Choice, choice => choice.question)
    choiceOptions?: Choice[];

    @Field(type => NestedQuestion, { nullable: true })
    @OneToOne(type => NestedQuestion)
    @JoinColumn()
    nestedQuestion?: NestedQuestion;
}
