import { Connection } from "typeorm";

export interface GQLContext {
    dbConnection: Connection
}
