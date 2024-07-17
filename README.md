## A basic CRUD TODO app API with Node.js and Express

### Clone the repo

```bash
git clone https://github.com/kalexrt/todo7.0
```

### Setup .env file

Create .env file with the help of .env.example

## Instructions for setup

## Method 1

### Install Dependencies

```bash
npm install
```

### Run the server

```bash
npm start
```
## Method 2:Using Docker for Linux / Windows / Mac

```bash
docker pull kalexrt/todo:0.7.0
```

### Run the server

```bash
docker run -p <PORT>:<PORT> --env-file=<path_to_env> kalexrt/todo:0.7.0
```

### Routes

| Endpoint      | HTTP Method | Description                     | body                                              | Authorization     |
| ------------- | ----------- | ------------------------------- | ------------------------------------------------- | ----------------- |
| /tasks     | POST        | Create a todo                   | name:string<br>status:ongoing,todo,complete | User              |
| /tasks?q=     | GET         | Get all todos                   | q=string                                                  | Super Admin, User |
| /tasks/:id | GET         | Get a todo                      |                                                   | Super Admin, User |
| /tasks/:id | PUT         | Update a todo                   | name:string<br>status:ongoing,todo,complete | User              |
| /taskts/:id | DELETE      | Delete a todo                   |                                                   | User              |
| /users        | POST        | Create a user                   | name:string<br>email:string<br>password:string    | Super Admin       |
| /users/:id    | PUT         | Update a user                   | name:string<br>email:string<br>password:string    | Super Admin       |
| /users/:id    | DELETE      | Delete a user                   |                                                   | Super Admin       |
| /users        | GET         | Get all users                   |                                                   | Super Admin       |
| /users/:id    | GET         | Get a user                      |                                                   | Super Admin       |
| /users?q=     | GET         | Get a user by name              | q=string                                          | Super Admin       |
| /auth/login   | POST        | login a user                    | email:string<br>password:string                   |
| /auth/refresh | POST        | Create refresh and access token |                                                   |                   |

_Note: For Authentication provide Bearer `token` in headers_

### Steps

1. Get Super admin access token from /auth/login
2. Perform CRUD operations on users with that access token in /users
3. Get user access token from /auth/login using the created user credentials
4. Perform CRUD operation on Todo with that access token in /projects


## Database Migrations in Postgres

### Migrations

1. Make migrations

```bash
npm run migrate:make
```

2. Migrate

```bash
npm run migrate
```

### Seeding

1. Make seed

```bash
npm run seed:make
```

2. Run Seed

```bash
npm run seed:run
```

