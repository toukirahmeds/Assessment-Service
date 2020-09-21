import { GQLContext } from "../../models/gqlContext";
import { AssessmentResponse } from "../../entity/AssessmentResponse";

/**
 * Get an assessment response using assessmentId and assessorId
 * 
 * @param context GQLContext
 * @param assessmentId string
 * @param assessorId string
 */
export async function getSubmittedAssessment(
    context: GQLContext,
    assessmentId: string,
    assessorId: string
) {
    let assessmentResponse;
    try {
        assessmentResponse = await context.dbConnection
            .getRepository(AssessmentResponse)
            .createQueryBuilder("assessmentResponse")
            .where(`assessmentResponse.assessmentId = '${assessmentId}' AND assessmentResponse.assessorId = '${assessorId}'`)
            .innerJoinAndSelect("assessmentResponse.questionResponses", "questionResponses")
            .innerJoinAndSelect("questionResponses.question", "question")
            .getOne();
    } catch(error) {
        throw error;
    }

    if(!assessmentResponse) {
        throw new Error("The assessment response not found.");
    }
    return assessmentResponse;
}
