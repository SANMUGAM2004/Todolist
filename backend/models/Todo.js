import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type : String,
        required : true
    },
    completed: {
        type: Boolean,
        default: false // Default value is set to false
    }
});

export const Todo = mongoose.model('Todo', todoSchema);
