import { InputType, Field } from "type-graphql";

@InputType()
export class CreateAssessmentInput {
    @Field(type => String)
    name: string;

    @Field(type => String)
    assessmentId: string;

    @Field(type => [String])
    questions: string[];
}
