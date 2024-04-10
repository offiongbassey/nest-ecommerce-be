import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes";
import { responseHandler } from "./helpers/responseHandler";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV !== "production"){
    app.use(morgan("dev"));
}

app.use(helmet());

app.use('/api/v1/', router);

app.get("/", (req, res) => {
    return responseHandler(res, 200, true, `Welcome to Nest Api`);
});

app.use("*", (req, res) => {
    return responseHandler(res, 500, false, "Invalid Route");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${ port }`);
})
