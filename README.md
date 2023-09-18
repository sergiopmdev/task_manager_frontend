# Task manager frontend

Frontend of the task manager web application 🗒️💻

## Run Locally

Clone the project

```bash
  https://github.com/sergiopmdev/task_manager_frontend
```

Go to the project directory

```bash
  cd task_manager_frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_API_URL`

It is important to know that in the development environment this environment variable must point to http://0.0.0.0:8000 and that the backend of the application must be running at that address ([link](https://github.com/sergiopmdev/task_manager_backend) to the backend repository)

## Features

- Create an account and log in
- Log out of your account
- Temporary authorization based on tokens
- Rendering of user tasks
- Elimination of tasks
- Edition of tasks (coming soon...)
- Mark tasks as completed (coming soon...)

## Tech Stack

**Client:** Next, Zustand, Tailwind CSS
