import express from "express";
import { PORT1 } from "./config.js";
import DBConnect from "./Database/DbConnectin.js";
import todorouter from "./Routes/TodoRoutes1.js"
import morgan from 'morgan'
import cors from "cors";

const app = express();
app.use(express.json());
app.use(morgan())
app.use(cors({
    allowOrigin:'*'
}));

DBConnect();
 
app.use('/todo',todorouter);

// app.get('/', (request,response) => {
//     response.status(200).send("Successfully worked");
// })

app.listen(PORT1, async (request,response) => {
    console.log(`running : ${PORT1 }`);
})