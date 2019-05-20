# Making Sense Blog

## Installation

1. You need `Node.js` (at least 10.x version) installed on your machine, if you don't have it, you should install it - download [link](https://nodejs.org/en/download/)
2. [Clone the project from github](https://github.com/elbrodelche/making-sense)
3. `cd` to your downloaded app
4. Install necessary dependencies:
    - **Via node `npm` package manager** - Run `npm install` on the project root
5. Configure your Database.
6. Check your ``./env-files`` values. 

##  Docker (database)
1. Install **Docker** on your machine
2. Run `docker-compose up -d` in a terminal on the project root. This will start 3 containers:
    - database(PostgreSQL) container;

## Start Demo

Once yoy have the app and db configured, you need to run the following:

```bash
# Migrate latest schema and seed the db
npm run demo

# Display full logs
npm run watch 

# Production
npm run start 

```

## Endpoints
| **Verb** | **Endpoint** |**Docs**|
|----------|-------|---|
|GET|http://localhost:8000/api/v1/posts|List all public posts|
|PUT|http://localhost:8000/api/v1/posts|Create new Post|
|DELETE|http://localhost:8000/api/v1/posts/:postId|Delete posts|
|GET|http://localhost:8000/api/v1/posts?search=:searchTerm|Search Post|
|GET|http://localhost:8000/api/v1/posts/:postId|Single Post|
|GET|http://localhost:8000|Api Root|
|POST|http://localhost:8000/api/v1/auth/login|Login user|
|GET|http://localhost:8000/api/v1/auth/me|Logged user data|
|GET|http://localhost:8000/api/v1/auth/logout|Logout|
|GET|http://localhost:8000/api/v1/author/:authorId|List specific author|
|GET|http://localhost:8000/api/v1/me/drafts|List authors drafts|

Demo users
```
// Chuck Norris
user:norris@makingsense.com
pass:secret

// Bruce Lee
user:lee@makingsense.com
pass:secret

// Jackie Chan
user:chan@makingsense.com
pass:secret
```

You can filter any list of posts passing the search parameter to the URL ex: ``?search=someTerm``. It can be paginated defining the pgSize parameter as well.

## Docs (important)
You can find a testing file for import on Insomnia or Postman in ``/docs``.
## Troubleshooting
 
 Remember that knex client is under ``./db`` folder, so if you want to use it, must be under this folder to execute.
