const express = require("express");
// const bcrypt = require('bcryptjs');

const authMidlleware = require("./midllewares/auth");
const AuthController = require("./controllers/authController");
const TodoController = require("./controllers/todoController");

const router = express.Router();

//Rotas User
//POST Sign up
router.post("/auth/register", AuthController.register);

//POST login
router.post("/auth/authenticate", AuthController.login);

//PUT update user
router.put("/auth/user-update", authMidlleware, AuthController.updateUser);

//DELETE delete user
router.delete("/auth/user-delete", authMidlleware, AuthController.deleteUser);

//-----------------------------------------------------------------------------

//Rotas ToDos
//GET toDos
router.get("/user/todos", authMidlleware, TodoController.index);

//Post Todos
router.post("/user/create-todos", authMidlleware, TodoController.createTodos);

//PUT:id update todos
router.put(
  "/user/update-todos/:id",
  authMidlleware,
  TodoController.updateTodos
);

//DELETE:id delete todo
router.delete(
  "/user/delete-todos/:id",
  authMidlleware,
  TodoController.deleteTodo
);

module.exports = router;
