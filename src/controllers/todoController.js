const Todo = require('../models/todo');
const User = require('../models/user');

module.exports = {
  async index(req, res) {
    const todos = await Todo.find({ user: req.userId });
    if (!todos) return res.status(404).json({ error: 'Todo not found!' });
    res.json(todos);
  },

  async createTodos(req, res) {
    try {
      const { description } = req.body;
      const user = await User.findById(req.userId);
      if (!user)
        return res.status(400).json({ error: 'You can not create a todo' });
      const todos = await Todo.create({
        description,
        user: req.userId,
      });
      return res.json(todos);
    } catch (error) {
      console.log(error);
    }
  },

  async updateTodos(req, res) {
    const { id } = req.params;
    const todoUpdate = await Todo.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });

    if (!todoUpdate) return res.status(404).json({ error: 'Todo not found!' });

    return res.json(todoUpdate);
  },

  async deleteTodo(req, res) {
    const { id } = req.params;
    const deleteTodo = await Todo.findOneAndDelete({ _id: id });

    if (!deleteTodo)
      return res.status(404).json({ error: 'This Todo does not exists!' });

    return res.json({ success: 'Todo deleted' });
  },
};
