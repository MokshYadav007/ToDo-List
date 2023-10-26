const mongoose = require("mongoose");
const Todos = require("../dbTodos");

// get Todos List
const getTodos = async (req, res) => {
    try {
        const allTodos = await Todos.find({}).sort({ createAt: -1 });
        res.status(204).send(allTodos);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

//create a new a Todo
const createTodo = async (req, res) => {
    const dbTodo = req.body;
    try {
        const newTodo = await Todos.create(dbTodo);
        res.status(201).send(newTodos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// update a todo
const updateTodo = async (req, res) => {
    const {id} = req.params
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('There is todo with id of ${id}')
        }
    const todoID = {_id: id};
    const update = { completed: true};
       const updateTools = await Todos.findOneAndUpdate(todoID, update);
       if(!updateTodo){
        return res.status(404).send('there is todo with id of ${id}')
       }
       res.status(200).send(updateTodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// delete a todo
const deleteTodo = async (req, res) => {
    const { id } = req.params
    try {
      if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).send('There is todo with id of ${id}')
        }
       const deleteTools = await Todos.findOneAndDelete({_id: id});
       res.status(200).send(deleteTodo);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
};