import express from "express";
import routes from "./routes";
import { generateRoutes } from "../util/routes_generator";

const app = express();

let api = express();
api = generateRoutes(api, routes);
app.use("/", api);

console.log("R ", routes);

export default app;
