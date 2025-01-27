# Postgres Stored Procedure testing

- This project is for testing Postgres stored procedures.
- Running `docker-compose up --abort-on-container-exit --exit-code-from bun` will start 2 containers - Postgres and bun.js, and it will run bun tests which will test stored procedures of Postgres.
- `ddl.sql` script is used to create initial Database Objects. This should be same as the one you are using for production.

Note:

- This project needs `docker` to be installed in your machine.
- Run `docker-compose down --volumes` to remove docker volumes.
