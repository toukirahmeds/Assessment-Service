import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { GQLContext } from "../../models/gqlContext";
import {Question} from "../../entity/Question";
import { CreateQuestionInput } from "../../models/question/createQuestionInput";

import { createQuestion } from "./createQuestion";
import { getQuestions } from "./getQuestions";

@Resolver()
export class QuestionResolver {
    @Query(() => String)
    async hello(@Ctx() context: GQLContext) {
        return "world";
    }

    @Query(() => [Question])
    async getQuestions(@Ctx() context: GQLContext) {
        return getQuestions(context);
    }

    @Mutation(() => Question)
    async createQuestion(@Arg("data") data: CreateQuestionInput, @Ctx() context: GQLContext) {
        return createQuestion(context, data);
    }
}
