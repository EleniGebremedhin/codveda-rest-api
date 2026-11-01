# Codveda REST API

A simple REST API built with Node.js and Express.js as part of the Codveda Technologies Full-Stack Development Internship.

## Features

- Create new tasks.
- Retrieve all tasks.
- Update existing tasks.
- Delete tasks.
- Validate task titles and IDs.
- Handle invalid requests and errors.
- Return appropriate HTTP status codes.

## Technologies Used

- Node.js
- Express.js
- JavaScript
- Thunder Client for API testing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EleniGebremedhin/codveda-rest-api.git
   ```

2. Navigate to the project folder:

   ```bash
   cd codveda-rest-api
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   node server.js
   ```

The server runs at:

`http://localhost:3000`

## API Endpoints

| Method | Endpoint     | Description        |
| ------ | ------------ | ------------------ |
| GET    | `/`          | Welcome message    |
| GET    | `/tasks`     | Retrieve all tasks |
| POST   | `/tasks`     | Create a task      |
| PUT    | `/tasks/:id` | Update a task      |
| DELETE | `/tasks/:id` | Delete a task      |

## Example Request

Create a new task:

**POST** `/tasks`

```json
{
  "title": "Learn Express.js"
}
```

Example response:

```json
{
  "id": 3,
  "title": "Learn Express.js",
  "completed": false
}
```

## Error Handling

The API handles invalid task titles, invalid task IDs, nonexistent tasks, missing request bodies, and malformed JSON.

## Storage

Tasks are currently stored in an in-memory JavaScript array. Data resets when the server restarts.

## Author

Developed by Eleni Gebremedhin

As part of the Codveda Technologies Full-Stack Development Internship.
