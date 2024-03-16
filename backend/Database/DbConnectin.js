import mongoose from "mongoose";


import { mongoDBURL } from "../config.js";


const DBConnect = () => { mongoose
                    .connect(mongoDBURL)
                    .then(() => {
                        console.log("Connected");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                }

export default DBConnect;