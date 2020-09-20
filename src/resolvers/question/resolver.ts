import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { GQLContext } from "../../models/gqlContext";
import {Question} from "../../entity/Question";
import { CreateQuestionInput } from "../../models/question/createQuestionInput";

import { createQuestion } from "./createQuestion";
import { getQuestions } from "./getQuestions";

/**
 * Graphql resolver for Question.
 */
@Resolver()
export class QuestionResolver {
    /**
     * Get all the questions created.
     * 
     * @param context GQLContext
     */
    @Query(() => [Question])
    async getQuestions(@Ctx() context: GQLContext) {
        return getQuestions(context);
    }

    /**
     * Create a new Question.
     * 
     * @param data CreateQuestionInput
     * @param context GQLContext
     */
    @Mutation(() => Question)
    async createQuestion(@Arg("data") data: CreateQuestionInput, @Ctx() context: GQLContext) {
        return createQuestion(context, data);
    }
}
