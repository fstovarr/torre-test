import bodyParser from "body-parser";
import routes from "./src";
import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/v1/", routes);

app.listen(8001, () => console.log(`API Gateway listening on port 8001`));
