# API Chuva - ToDo List

## Technologies used
  - NodeJs
  - express
  - MongoDB
  - JsonWebTokens
  - REST API
  - Docker Container
  - middlewares

# Initial Config
  ## Install all dependencies
      - run command **yarn** or **npm install**
  ## Create docker container for MongoDB
      - sudo docker run --name <database name> -p 27017:27017 -d -t mongo 
  ## Run container
      - sudo docker start <container id>

# User Routes
  **User Register** - http://localhost:3333/auth/register </br>
  **Authenticate** - http://localhost:3333/auth/authenticate</br>
  **Update User** - http://localhost:3333/auth/user-update</br>
  **Delete User** - http://localhost:3333/auth/user-delete</br>

# ToDO Routes
  **Create  ToDo** - http://localhost:3333/user/create-todos</br>
  **Update ToDo** - http://localhost:3333/user/update-todo/id</br>
  **Delete ToDo** - http://localhost:3333/user/delete-todo/id</br>
  **List ToDos** - http://localhost:3333/user/todos</br>
  
  
# Link for mobile app
  - https://github.com/eltonMoraisD/mobile-chuva-Todo
