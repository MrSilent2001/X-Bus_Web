import express, {Application, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import cors from "cors";
import {PORT, APP_ORIGIN} from "./constants/env";
import pool from "./config/connectDB";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import {OK} from "./constants/http";

dotenv.config();

const app:Application = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);
app.use(cookieParser());

//Routes
app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.status(OK).json({
            status: "success",
        });
    }
);

app.use(errorHandler);

/*
app.get("/users", async(req, res) => {
    try{
        const client = await pool.connect();
        console.log("Database Connection Successful");
        const result = await client.query("SELECT * FROM user");
        client.release();
        res.json(result.rows);
    }catch(err){
        console.error("Error executing query",err);
        res.status(500).json({
            status: "Internal Server Error"
        });
    }
});
* */

//Initialize Database
const DBConnection = (async () => {
    try {
        const client = await pool.connect();
        console.log("Database connection successful");
        client.release();
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1);
    }
});
DBConnection();


//Start the Server
const port: number = parseInt(PORT,10);
app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});