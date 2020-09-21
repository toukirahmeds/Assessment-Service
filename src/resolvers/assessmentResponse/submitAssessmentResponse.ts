import { GQLContext } from "../../models/gqlContext";
import { CreateAssessmentResponseInput } from "../../models/assessmentResponse/createAssessmentResponseInput";
import { Assessment } from "../../entity/Assessment";

import { AssessmentResponse } from "../../entity/AssessmentResponse";
import { QuestionResponse } from "../../entity/QuestionResponse";
import { validateAnswer } from "./utils/validateAnswer";
import { EntityManager } from "typeorm";

/**
 * Submit the assessment response
 * 
 * @param context GQLContext
 * @param input CreateAssessmentResponseInput
 */
export async function submitAssessmentResponse(
    context: GQLContext,
    input: CreateAssessmentResponseInput
) {
    // Find the assessment details using assessmentId value.
    // Inner Join to get all the question details in the assessment.
    // Left joins for both choiceOptions and nestedQuestion field that exist in the questions.
    const assessment = await context.dbConnection.getRepository(Assessment).createQueryBuilder("assessment")
        .where(`assessment.assessmentId = '${input.assessmentId}'`)
        .innerJoinAndSelect("assessment.questions", "questions")
        .leftJoinAndSelect("questions.choiceOptions", "choiceOptions")
        .leftJoinAndSelect("questions.nestedQuestion", "nestedQuestion")
        .getOne();

    const answeredQuestions = assessment.questions.filter((question) => {
        return input.questionResponses.findIndex((qResponse) => qResponse.questionId === question.id) > - 1;
    });

    const assessmentResponse = new AssessmentResponse();
    assessmentResponse.assessorId = input.assessorId;
    assessmentResponse.assessmentId = input.assessmentId;
    assessmentResponse.questionResponses = input.questionResponses.map((qResponse) => {
        const question = answeredQuestions.find((answeredQ) => answeredQ.id === qResponse.questionId);
        validateAnswer(question, qResponse);

        const finalQResponse = new QuestionResponse();
        finalQResponse.assessmentId = input.assessmentId;
        finalQResponse.question = question;
        finalQResponse.answer = qResponse.answer;
        finalQResponse.nestedAnswer = qResponse.nestedAnswer;
        finalQResponse.assessmentResponse = assessmentResponse;

        return finalQResponse;
    });
    
    try {
        await context.dbConnection.transaction(async (transactionManager: EntityManager) => {
            await transactionManager.save(assessmentResponse);
            await transactionManager.save(assessmentResponse.questionResponses);
        });
    } catch(error) {
        throw error;
    }

    return assessmentResponse;
}
