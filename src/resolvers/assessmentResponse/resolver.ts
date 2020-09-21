import { Resolver, Query, Ctx, Mutation, Arg } from "type-graphql";
import { GQLContext } from "../../models/gqlContext";
import { AssessmentResponse } from "../../entity/AssessmentResponse";
import { CreateAssessmentResponseInput } from "../../models/assessmentResponse/createAssessmentResponseInput";
import { submitAssessmentResponse } from "./submitAssessmentResponse";
import { getSubmittedAssessment } from "./getSubmittedAssessment";

/**
 * Resolver for Assessment Response
 */
@Resolver()
export class AssessmentResponseResolver {
    /**
     * Get the response for an assessment
     * 
     * @param assessmentId string
     * @param assessorId string
     * @param context GQLContext
     */
    @Query(type => AssessmentResponse)
    async getAssessmentResponse(
        @Arg("assessmentId") assessmentId: string,
        @Arg("assessorId") assessorId: string,
        @Ctx() context: GQLContext
    ) {
        return getSubmittedAssessment(context, assessmentId, assessorId);
    }

    /**
     * Create an assessment response
     * 
     * @param data CreateAssessmentResponseInput
     * @param ctx GQLContext
     */
    @Mutation(type => AssessmentResponse)
    async createAssessmentResponse(@Arg("data") data: CreateAssessmentResponseInput, @Ctx() ctx: GQLContext) {
        return submitAssessmentResponse(ctx, data);
    }
}
