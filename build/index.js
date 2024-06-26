"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const responseHandler_1 = require("./helpers/responseHandler");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
if (process.env.NODE_ENV !== "production") {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, helmet_1.default)());
app.use('/api/v1/', routes_1.default);
app.get("/", (req, res) => {
    return (0, responseHandler_1.responseHandler)(res, 200, true, `Welcome to Nest Api`);
});
app.use("*", (req, res) => {
    return (0, responseHandler_1.responseHandler)(res, 500, false, "Invalid Route");
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
