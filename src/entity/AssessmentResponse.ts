import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToOne, Tree, JoinColumn, JoinTable, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { QuestionResponse } from "./QuestionResponse";

@Entity()
@ObjectType()
export class AssessmentResponse {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => String)
    @Column()
    assessorId: string;

    @Field(() => ID)
    @Column()
    assessmentId: string;

    @Field(type => [QuestionResponse])
    @OneToMany(type => QuestionResponse, questionResponse => questionResponse.assessmentResponse)
    questionResponses: QuestionResponse[];
}
