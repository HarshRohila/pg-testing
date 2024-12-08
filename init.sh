#!/bin/sh

# # Wait for PostgreSQL to be ready
# until pg_isready -p 5432 -U user; do
# 	echo "Waiting for PostgreSQL..."
# 	sleep 2
# done

# Run the SQL script
psql -U user -d postgres -f /ddl.sql
