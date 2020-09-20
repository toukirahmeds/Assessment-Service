import { GQLContext } from "../../models/gqlContext";
import { Question } from "../../entity/Question";

/**
 * Get all the questions
 * 
 * @param context GQLContext
 */
export async function getQuestions(
    context: GQLContext
): Promise<Question[]> {
    try {
        return await context.dbConnection.getRepository(Question).createQueryBuilder("question")
            .leftJoinAndSelect("question.nestedQuestion", "nestedQuestion")
            .leftJoinAndSelect("question.choiceOptions", "choiceOptions").getMany();
    } catch(error) {
        throw error;
    }
}
