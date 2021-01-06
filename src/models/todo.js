const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },

  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'user',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
