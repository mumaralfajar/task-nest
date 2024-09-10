<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript repository. This is a simple task management API built with NestJS. It allows users to create, retrieve, update, and delete tasks. The API also provides pagination for listing tasks, and is documented using Swagger.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test
```

## Swagger Documentation

Swagger documentation is available at:

```
http://localhost:3000/api
```

This provides an interactive interface to test the API endpoints.

## Project Structure

```
task-nest/
│
├── src/
│   ├── common/
│   │   ├── swagger/
│   │   │   └── swagger.response.ts      # Swagger API response schema
│   │   ├── utils/
│   │   │   └── response.util.ts         # Utility for creating general responses
│   ├── tasks/
│   │   ├── dto/
│   │   │   └── create-task.dto.ts       # Data Transfer Object for task creation
│   │   ├── task.model.ts                # Task model definition
│   │   ├── tasks.controller.ts          # Task Controller
│   │   ├── tasks.service.ts             # Task Service (business logic)
│   │   ├── tasks.module.ts              # Task Module
│   └── main.ts                          # Main entry point of the application
│
├── test/
│   ├── app.e2e-spec.ts                  # End-to-End (e2e) tests
├── jest-e2e.json                        # Jest configuration for e2e tests
├── package.json                         # Project dependencies and scripts
├── README.md                            # Project documentation
└── tsconfig.json                        # TypeScript configuration
```

### Routes and Endpoints

| Method   | Endpoint     | Description                              |
|----------|--------------|------------------------------------------|
| `GET`    | `/tasks`     | Retrieve all tasks (supports pagination) |
| `POST`   | `/tasks`     | Create a new task                        |
| `GET`    | `/tasks/:id` | Get a specific task by ID                |
| `PUT`    | `/tasks/:id` | Update a task by ID                      |
| `DELETE` | `/tasks/:id` | Delete a task by ID                      |

### Request and Response Examples

#### Create a Task (`POST /tasks`)

**Request:**

```json
{
  "title": "New Task",
  "description": "This is a new task"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Task created successfully",
  "time": 1725574760527,
  "data": {
    "id": 1,
    "title": "New Task",
    "description": "This is a new task"
  }
}
```

#### Get All Tasks (`GET /tasks`)

Supports pagination with query parameters `page` and `size`.

**Request:**

```
GET /tasks?page=1&size=5
```

**Response:**

```json
{
   "status": true,
   "message": "Tasks retrieved successfully",
   "time": 1725874151089,
   "data": {
      "page": 1,
      "size": 5,
      "totalItems": 10,
      "totalPages": 2,
      "items": [
         {
            "id": 1,
            "title": "Task 1",
            "description": "Description for task 1"
         },
         {
            "id": 2,
            "title": "Task 2",
            "description": "Description for task 2"
         },
         {
            "id": 3,
            "title": "Task 3",
            "description": "Description for task 3"
         },
         {
            "id": 4,
            "title": "Task 4",
            "description": "Description for task 4"
         },
         {
            "id": 5,
            "title": "Task 5",
            "description": "Description for task 5"
         }
      ]
   }
}
```

#### Update a Task (`PUT /tasks/:id`)

**Request:**

```json
{
  "title": "Updated Task",
  "description": "This task has been updated"
}
```

**Response:**

```json
{
  "status": true,
  "message": "Task updated successfully",
  "time": 1725574760527,
  "data": {
    "id": 1,
    "title": "Updated Task",
    "description": "This task has been updated"
  }
}
```

#### Delete a Task (`DELETE /tasks/:id`)

**Response:**

```json
{
  "status": true,
  "message": "Task deleted successfully",
  "time": 1725574760527,
  "data": null
}
```

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).
