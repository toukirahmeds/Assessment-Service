import { create } from "domain";
import {createConnection} from "typeorm";

// Get the newly created db connection.
export const getDbConnection = async () => {
    return await createConnection();
}
