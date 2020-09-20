import { GQLContext } from "../../models/gqlContext";
import { EntityManager } from "typeorm";
import { CreateQuestionInput } from "../../models/question/createQuestionInput";
import { QuestionType } from "../../models/question/questionType";
import { Question } from "../../entity/Question";
import { Choice } from "../../entity/Choice";

export async function createQuestion(
    context: GQLContext,
    inputData: CreateQuestionInput
): Promise<Question> {

    const question = new Question();
    question.question = inputData.question;
    question.type = inputData.type;
    if(question.type === QuestionType.TrueFalse && !inputData.nestedQuestion) {
        throw new Error("TrueFalse types must have 'nestedQuestion'");
    } else if(
        (question.type === QuestionType.MultipleChoice || question.type === QuestionType.SingleChoice)
        && !inputData.choiceOptions
    ) {
        throw new Error("Mutiple/Single Choice question must have 'choiceOptions'");
    }

    try {
        await context.dbConnection.transaction(async (transactionManager: EntityManager) => {
            // Save the nested question if type is TrueFalse
            if(question.type === QuestionType.TrueFalse) {
                const nestedQuestion = new Question();
                nestedQuestion.question = inputData.nestedQuestion;
                nestedQuestion.type = QuestionType.TextInput;
                nestedQuestion.nestedQuestion = null;
                await transactionManager.save(nestedQuestion);
                question.nestedQuestion = nestedQuestion.id;
            }

            // Save the question;
            const q = await transactionManager.save(question);

            // Save the multiple choices if question type is MultipleChoice or SingleChoice
            if(question.type === QuestionType.MultipleChoice || question.type === QuestionType.SingleChoice) {
                question.choiceOptions = inputData.choiceOptions.map((option: string) => {
                    const choice = new Choice();
                    choice.choice = option;
                    choice.question = q.id;
                    return choice;
                });
                await transactionManager.save(question.choiceOptions);
            }
            
        });
        return question;
    } catch(error) {
        throw error;
    }
}
