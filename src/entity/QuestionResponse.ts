import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Question } from "./Question";
import { AssessmentResponse } from "./AssessmentResponse";

@Entity()
@ObjectType()
export class QuestionResponse {
    @Field(() => ID)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => ID)
    @Column()
    assessmentId: string;

    @Field(type => Question)
    @OneToOne(type => Question)
    @JoinColumn()
    question: Question;

    @Field(type => String)
    @Column(type => String)
    answer: string;

    @Field(type => String)
    @Column(type => String)
    nestedAnswer: string;

    @Field(() => AssessmentResponse)
    @ManyToOne(type => AssessmentResponse, assessmentResponse => assessmentResponse.questionResponses)
    assessmentResponse: AssessmentResponse;
}
