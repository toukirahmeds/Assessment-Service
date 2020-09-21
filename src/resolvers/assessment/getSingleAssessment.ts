import { GQLContext } from "../../models/gqlContext";
import { Assessment } from "../../entity/Assessment";

/**
 * Get the details of an assessment using assessmentId.
 * 
 * @param context GQLContext
 * @param assessmentId string
 */
export async function getSingleAssessment(
    context: GQLContext,
    assessmentId: string
) {
    // Find the assessment details using assessmentId value.
    // Inner Join to get all the question details in the assessment.
    // Left joins for both choiceOptions and nestedQuestion field that exist in the questions.
    const assessment: Assessment = await context.dbConnection.getRepository(Assessment).createQueryBuilder("assessment")
        .where(`assessment.assessmentId = '${assessmentId}'`)
        .innerJoinAndSelect("assessment.questions", "questions")
        .leftJoinAndSelect("questions.choiceOptions", "choiceOptions")
        .leftJoinAndSelect("questions.nestedQuestion", "nestedQuestion").getOne();
    
    if(!assessment) {
        throw new Error("Assessment not found.");
    }

    return assessment;
}
