# Challenge Chapter 6 Submission

Binar Academy Bootcamp Chapter 6 Submission by Bonaventura Sunu

## Demo

Link for demo
https://binar-ch6-bona.herokuapp.com/

## Description

This is CRUD app using NodeJS, ExpressJS, Sequelize, PostgreSQL, and EJS. There are 4 tables on the database after installation: `user_game`, `user_game_biodata`, `user_game_history`, `SequelizeMeta` (stores postgres setting).

Routes:

```
/ """Login page"""
/players
/players/:id
/create-player """Create player Form"""
/players/create
/players/delete/:id
/players/update-player/:id """Update player Form"""
/players/update/:id
```

RESTful API:

```
GET - /players
GET - /players/:id
POST - /players/create
DELETE - /players/delete/:id
PUT - /players/update/:id
```

Info

- `/db/migrations` contains sequelize migration files
- `db/seeders` contains sequelize seeders
- `db/models` contains sequelize models for tables inside database
- `config.js` setting for sequelize
- `utils/logger.js` logging handler middleware
- `utils/middleware.js` unknown endpoints and error handler middleware
- `.sequelizerc` setting for sequelize initialization

## Installation

**Step 1. Clone the code into a fresh folder.**

```
$ git clone git@github.com:bonasunu/binar-ch6-bona.git
$ cd binar-ch6-bona
```

**Step 2. Install Dependencies.**

Next, we need to install the project dependencies, which are listed in `package.json`.

```
$ npm install
```

or

```
$ yarn
```

**Step 3: Update environment variables.**

Create a new file named `.env`. Update the new file with your database credentials. It should look similar to this:

```
# .env file
USER="[INSERT_DATABASE_USER]"
PASS="[INSERT_DATABASE_PASSWORD]"
HOST="[INSERT_DATABASE_HOST]"
DB_DEV="[INSERT_DATABASE_DEVELOPMENT]"
DB_TEST="[INSERT_DATABASE_TEST]"
USER_PROD="[INSERT_USER_PRODUCTION]"
PASS_PROD="[INSERT_PASSWORD_PRODUCTION]"
HOST_PROD="[INSERT_HOST_PRODUCTION]"
DB_PROD="[INSERT_DATABASE_PRODUCTION]"
PORT=8080
```

**Step 4. Run sequelize**

Run sequelize to migrate and create table with seeders.

```
$ npx sequelize db:migrate
$ npx sequelize db:seed:all
```

**Step 5. Run the Server**
Now we're ready to start our server which is as simple as:

```
$ npm run dev
```

or

```
$ yarn run dev
```

Open http://localhost:8080 or http://localhost:3000 (default port if there is no PORT on .env file) to view it in your browser.

The app will automatically reload if you make changes to the code.
You will see the build errors and warnings in the console.
