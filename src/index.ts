import "reflect-metadata";
import {ApolloServer} from "apollo-server";
import { QuestionResolver } from "./resolvers/question/resolver";
import { AssessmentResolver } from "./resolvers/assessment/resolver";
import { AssessmentResponseResolver } from "./resolvers/assessmentResponse/resolver";
import { buildSchema } from "type-graphql";
import { GQLContext } from "./models/gqlContext";
import { getDbConnection } from "./utils/db-helper";

async function runServer() {
    console.log("Starting the GQL Server");
    let schema;
    try {
        schema = await buildSchema({
            resolvers: [QuestionResolver, AssessmentResolver, AssessmentResponseResolver]
        });
    } catch(error) {
        console.error(error);
        throw error;
    }

    const gqlContext: GQLContext = {
        dbConnection: await getDbConnection(),
    };

    // Initialization of the Apollo Server
    // Set gqlContext to pass to the resolvers.
    const server = new ApolloServer({ schema, context: (): GQLContext => {
        return gqlContext;
    }});

    try {
        await server.listen(3000);
    } catch(error) {
        console.error(error);
        throw error;
    }
    console.log("GQL Server has started");
    
}

runServer();
