import {Pool} from 'pg';
import {DB_PORT, DB_HOST, DB_PASSWORD, DB_NAME, DB_USERNAME} from "../constants/env"


const pool = new Pool({
    port: parseInt(DB_PORT, 10),
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
});
export default pool;



