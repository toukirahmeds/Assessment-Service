import { create } from "domain";
import {createConnection} from "typeorm";

export const getDbConnection = async () => {
    return await createConnection();
}
