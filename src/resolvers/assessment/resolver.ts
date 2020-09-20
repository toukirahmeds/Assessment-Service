import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { GQLContext } from "../../models/gqlContext";
import { Assessment } from "../../entity/Assessment";
import { createAssessment } from "./createAssessment";
import { CreateAssessmentInput } from "../../models/assessment/createAssessmentInput";
import { getSingleAssessment } from "./getSingleAssessment";

/**
 * GraphQl resolver for Assessment
 */
@Resolver()
export class AssessmentResolver {
    /**
     * Get the details of an assessment
     * 
     * @param assessmentId string
     * @param ctx GQLContext
     */
    @Query(type => Assessment)
    async getAssessmentDetails(@Arg('assessmentId') assessmentId: string, @Ctx() ctx: GQLContext) {
        return getSingleAssessment(ctx, assessmentId);
    }

    /**
     * Create a new assessment.
     * 
     * @param data CreateAssessmentInput
     * @param ctx GQLContext
     */
    @Mutation(type => Assessment)
    async createAssessment(@Arg('data') data: CreateAssessmentInput, @Ctx() ctx: GQLContext) {
        return createAssessment(ctx, data);
    }
}
