To run the project, you need to have Node.js installed on your machine. If you don't have it, you can download it [here](https://nodejs.org/).

## Setup

Edit the env vars in the `src/main/config/env.ts` file to match your environment, but it should work with the default values.

Run the following commands to create the Postgres and Redis containers:
```bash
npm run up
```

Connect to the Postgres container and create the database `playvs-api`:
```bash
CREATE DATABASE playvs-api
```

Run the following command to start the project:
```bash
npm run start
```