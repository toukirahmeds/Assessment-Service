import { CreateQuestionResponseInput } from "../../../models/assessmentResponse/createAssessmentResponseInput";
import { QuestionType } from "../../../models/question/questionType";
import { Question } from "../../../entity/Question";

/**
 * Validate the answers for the assessment going to be submitted.
 * 
 * @param question Question
 * @param qResponseInput CreateQuestionResponseInput
 */
export function validateAnswer(
    question: Question,
    qResponseInput: CreateQuestionResponseInput
) {
    switch(question.type) {
        case QuestionType.TrueFalse:
            if(qResponseInput.answer !== "true" && qResponseInput.answer !== "false") {
                throw new Error("For Yes or No type, answer must be either 'true' or 'false'");
            }
            break;

        case QuestionType.SingleChoice:
            const answerExists = question.choiceOptions.some((option) => option.choice === qResponseInput.answer);
            if(!answerExists) {
                throw new Error("The given answer does not exist in the question choice options.");
            }
            break;

        case QuestionType.MultipleChoice:
            const answersArr: string[] = JSON.parse(qResponseInput.answer);
            const allAnswersExist = answersArr.every((answer) => {
                return question.choiceOptions.some((option) => option.choice === answer);
            });
            if(!allAnswersExist) {
                throw new Error("For Multiple choice, all the chosen options must exist in the question option choices.");
            }
            break;
        default:
    }
}
