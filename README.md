# Cowlar Test

A Full-stack Movie application where user can signup to view most reviewed movies, can add new movies and provide feedback on existing ones.

## Requirements for Running the project

- Docker

## Setting up the Project 

1. Clone the project

```bash
  git clone https://github.com/Syed-Talha-Bukhari/cowlar-movie-web-app
```

2. Go to the project directory

```bash
  cd cowlar-movie-web-app
```

3. Build and Run the Docker Container


```bash
  docker compose up --build
```

## Accessing the Application

Frontend will be accessible at:

```bash
http://localhost:5173/
```

Backend is hosted at:

```bash
http://localhost:5000/
```

## Running Tests

To run tests, you have to go to the terminal of each `frontend` and `backend`, and run the test command there.

### Frontend and Backend Testing

- Open Docker Desktop App
- Check the `cowlar-movie-web-app` network
- Open the `backend` or `frontend` container
- Click on Terminal to access the bash.
- Run the following

```bash
  npm run test
```

