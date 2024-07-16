## A basic CRUD TODO with users app API with Node.js and Express

### Install Dependencies

```bash
npm install
```

### Setup .env file

Create .env file with the help of .env.example to configure the port

### Run the server

```bash
npm start
```

## OR

### Docker setup

```bash
docker pull kalexrt/todo:0.6.0
```

### Setup .env file

Create .env file with the help of .env.example to configure the port

### Run the server

```bash
docker run -p <PORT>:<PORT> --env-file=<path_to_env> kalexrt/todo:0.6.0
```

### Routes

| Endpoint      | HTTP Method | Description                |
| ------------- | ----------- | -------------------------- |
| /auth/login   | POST        | User login                 |
| /auth/refresh | POST        | Refresh access token       |
| /tasks        | GET         | Get all tasks              |
| /tasks/:id    | GET         | Get a task by ID           |
| /tasks        | POST        | Create a task              |
| /tasks/:id    | PUT         | Update a task by ID        |
| /tasks/:id    | DELETE      | Delete a task by ID        |
| /users        | GET         | Get all users (auth)       |
| /users        | POST        | Create a user (auth)       |
| /users/:id    | GET         | Get a user by ID (auth)    |
| /users/:id    | PUT         | Update a user by ID (auth) |
| /users/:id    | DELETE      | Delete a user by ID (auth) |

