import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "vuln",
    password: "",
    port: 3306,
});

const db = drizzle(connection);

export { db };