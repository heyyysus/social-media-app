import { Pool } from "pg"
import * as dotenv from "dotenv"
dotenv.config();

export const usePool = async (): Promise<Pool> => {
    try {
        const pool = new Pool({
            user: process.env.PGUSER,
            password: process.env.PGPASSWORD,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            port: parseInt(process.env.PGPORT),
        });
        return pool;
    } catch (e) {
        console.log(e);
    }
}
