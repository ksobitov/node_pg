#!/bin/bash

# Set your PostgreSQL connection details as environment variables
export PGHOST="localhost"
export PGPORT="5432"
export PGDATABASE="crud_rest"
export PGUSER="komil"
export PGPASSWORD="komil008I"

# Function to check if Node.js dependencies are installed
dependencies_installed() {
  [ -d "node_modules" ]
}

# Function to check if a database exists
database_exists() {
  psql -lqt | cut -d \| -f 1 | grep -qw $PGDATABASE
}

# Function to check if tables exist in the database
tables_exist() {
  psql -d $PGDATABASE -c '\dt' | grep -qw 'users\|posts'
}

# Check if Node.js dependencies are installed
if ! dependencies_installed; then
  # Install Node.js dependencies
  npm install
fi

# Create database if it doesn't exist
if ! database_exists; then
  createdb
fi

# Connect to database and execute SQL script if tables don't exist
if ! tables_exist; then
  psql -f "database.sql"
fi

# Run your Node.js application
npm run dev

# Function to delete PostgreSQL database
delete_database() {
  echo "Deleting PostgreSQL database..."
  dropdb
}

# Uncomment the line below to delete the database after running the application
# delete_database
