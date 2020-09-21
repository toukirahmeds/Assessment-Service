import { InputType, Field, ID } from "type-graphql";

@InputType()
export class CreateQuestionResponseInput {
    @Field(type => String)
    questionId: string;

    @Field(type => String)
    answer: string;

    @Field(type => String, { nullable: true })
    nestedAnswer: string;
}

@InputType()
export class CreateAssessmentResponseInput {
    @Field(() => String)
    assessorId: string;

    @Field(() => ID)
    assessmentId: string;

    @Field(() => [CreateQuestionResponseInput])
    questionResponses: CreateQuestionResponseInput[];
}
