const mongoose = require('../database');
const bcrypt = require('bcryptjs');
const Todo = require('../models/todo');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    select: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hashSync(this.password, 10);
  this.password = hash;
  next();
});

//Midlleware para deletar usuario e seus todos ---> bugado
// UserSchema.post('findOneAndDelete', async function (doc, next) {
//   console.log(doc);

//   if (doc) {
//     const deleteResult = await Todo.deleteMany({
//       user: doc._id,
//     });

//     next();

//     console.log('Child delete result: ', deleteResult);
//   }
// });

const User = mongoose.model('User', UserSchema);

module.exports = User;
