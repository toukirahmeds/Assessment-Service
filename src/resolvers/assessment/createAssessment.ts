import { GQLContext } from "../../models/gqlContext";
import { Assessment } from "../../entity/Assessment";
import { Question } from "../../entity/Question";
import { CreateAssessmentInput } from "../../models/assessment/createAssessmentInput";

/**
 * Create a new assessment
 * 
 * @param context GQLContext
 * @param inputData CreateAssessmentInput
 */
export async function createAssessment(
    context: GQLContext,
    inputData: CreateAssessmentInput
): Promise<Assessment> {
    
    const assessment = new Assessment();
    assessment.name = inputData.name;
    assessment.assessmentId = inputData.assessmentId;

    if(inputData.questions.length === 0) {
        throw new Error("questions array cannot be empty.");
    }

    let questions: Question[] = [];
    try {
        // Find all the questions using question id array
        // Left joins for both nestedQuestion and choiceOptions to get the joined values.
        questions = await context.dbConnection.getRepository(Question).createQueryBuilder("question").andWhereInIds(
            inputData.questions
        ).leftJoinAndSelect("question.nestedQuestion", "nestedQuestion")
         .leftJoinAndSelect("question.choiceOptions", "choiceOptions").getMany();
        
        assessment.questions = questions;
    } catch(error) {
        throw error;
    }

    if(assessment.questions.length === 0) {
        throw new Error("No questions found with the given question id array.");
    }

    // Save the assessment
    try {
        await context.dbConnection.manager.save(assessment);
    } catch(error) {
        throw error;
    }
    
    return assessment;
}
