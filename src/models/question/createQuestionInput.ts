import { InputType, Field } from "type-graphql";
import { QuestionType } from "./questionType";

@InputType()
export class CreateQuestionInput {

    @Field(() => String)
    question: string;

    @Field(type => String)
    type: QuestionType;

    @Field(type => [String], { nullable: true })
    choiceOptions?: [string];

    @Field(type => String, { nullable: true })
    nestedQuestion?: string;

    @Field(() => String, { nullable: true })
    nestedQuestionTriggerFor?: string;
}
