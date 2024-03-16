import { Todo } from "../models/Todo.js";
import express from "express";


const router = express.Router();

//Create a new todo
router.post('/create', async (request,response) => {
    console.log(request.body);
    try{
        const {text} = request.body;
        const todo = await Todo.create({text})
        return response.status(200).json({status:'ok', message:"Successfully created"});

    }
    catch(error){
        return response.json({status : 'error',error:error.message});
    }
})

// Get all todos
router.get('/get', async (request, response) => {
    try {
        const todos = await Todo.find();
        return response.status(200).json({ status: 'ok', todos });
    } catch (error) {
        return response.json({ status: 'error', error: error.message });
    }
});

// Delete a todo by ID
router.delete('/delete/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return response.status(404).json({ status: 'error', message: 'Todo not found' });
        }
        return response.status(200).json({ status: 'ok', message: 'Todo deleted successfully' });
    } catch (error) {
        return response.json({ status: 'error', error: error.message });
    }
});

// Toggle todo completion status by ID
router.put('/toggle/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return response.status(404).json({ status: 'error', message: 'Todo not found' });
        }
        todo.completed = !todo.completed;
        await todo.save();
        return response.status(200).json({ status: 'ok', message: 'Todo toggled successfully', todo });
    } catch (error) {
        return response.json({ status: 'error', error: error.message });
    }
});

export default router;
