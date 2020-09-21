import { GQLContext } from "../../models/gqlContext";
import { EntityManager } from "typeorm";
import { CreateQuestionInput } from "../../models/question/createQuestionInput";
import { QuestionType } from "../../models/question/questionType";
import { Question } from "../../entity/Question";
import { NestedQuestion } from "../../entity/NestedQuestion";
import { Choice } from "../../entity/Choice";

/**
 * Creates a new question.
 * 
 * @param context GQLContext
 * @param inputData CreateQuestionInput
 */
export async function createQuestion(
    context: GQLContext,
    inputData: CreateQuestionInput
): Promise<Question> {

    const question = new Question();
    question.question = inputData.question;
    question.type = inputData.type;
    
    if(question.type === QuestionType.TrueFalse && !inputData.nestedQuestion) {
        throw new Error("TrueFalse types must have 'nestedQuestion'");
    } else if(question.type === QuestionType.TrueFalse && !inputData.nestedQuestionTriggerFor) {
        throw new Error("TrueFalse types must have 'nestedQuestionTriggerFor'");
    } else if(
        question.type === QuestionType.TrueFalse && 
        inputData.nestedQuestionTriggerFor && 
        inputData.nestedQuestionTriggerFor !== "true" && 
        inputData.nestedQuestionTriggerFor !== "false") 
    {
        throw new Error("nestedQuestionTriggerFor must have either value of 'true' or 'false'");
    } else if(
        (question.type === QuestionType.MultipleChoice || question.type === QuestionType.SingleChoice)
        && !inputData.choiceOptions
    ) {
        throw new Error("Mutiple/Single Choice question must have 'choiceOptions'");
    }

    if(question.type === QuestionType.MultipleChoice || question.type === QuestionType.SingleChoice) {
        question.choiceOptions = inputData.choiceOptions.map((option: string) => {
            const choice = new Choice();
            choice.choice = option;
            choice.question = question;
            return choice;
        });
    }

    try {
        await context.dbConnection.transaction(async (transactionManager: EntityManager) => {
            // Save the nested question if type is TrueFalse
            if(question.type === QuestionType.TrueFalse) {
                const nestedQuestion = new NestedQuestion();
                nestedQuestion.question = inputData.nestedQuestion;
                nestedQuestion.type = QuestionType.TextInput;
                nestedQuestion.nestedQuestionTriggerFor = inputData.nestedQuestionTriggerFor;
                await transactionManager.save(nestedQuestion);
                
                // set the nestedQuestion field in the question modal.
                question.nestedQuestion = nestedQuestion;
            }

            // Save the question;
            await transactionManager.save(question);

            // Save the multiple choices if question type is MultipleChoice or SingleChoice
            if(question.type === QuestionType.MultipleChoice || question.type === QuestionType.SingleChoice) {
                await transactionManager.save(question.choiceOptions);
            }
            
        });
        return question;
    } catch(error) {
        throw error;
    }
}
