import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { responseHandler } from "./helpers/responseHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}

app.use(helmet());

app.get("/", (req, res) => {
    // res.status(200).json("Welcome");
    return responseHandler(res, 200, true, "Welcome to Nest Api");
})
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`App is running on port ${ port }`)
})
