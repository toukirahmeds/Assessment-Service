import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {Question} from "./entity/Question";
import {ApolloServer} from "apollo-server";
import { QuestionResolver } from "./resolvers/question/resolver";
import { buildSchema } from "type-graphql";
import { GQLContext } from "./models/gqlContext";
import { getDbConnection } from "./utils/db-helper";

async function runServer() {
    console.log("Starting the GQL Server");
    let schema;
    try {
        schema = await buildSchema({
            resolvers: [QuestionResolver]
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

// createConnection().then(async connection => {

//     // console.log("Inserting a new user into the database...");
//     // const user = new User();
//     // user.firstName = "Timber";
//     // user.lastName = "Saw";
//     // user.age = 25;
//     // await connection.manager.save(user);
//     // console.log("Saved a new user with id: " + user.id);

//     // console.log("Loading users from the database...");
//     // const users = await connection.manager.find(User);
//     // console.log("Loaded users: ", users);
//     const question = new Question();
//     question.question = "Whats your name?";
//     question.type = "text_input";
//     question.questionIdentifier = "Q1";
//     await connection.manager.save(question);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));
