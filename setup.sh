#!/bin/bash

# Set your PostgreSQL connection details
DB_HOST=localhost
DB_USER=komil
DB_PASSWORD=komil008I
DB_NAME=crud_rest
DB_PORT=5432

# Function to check if Node.js dependencies are installed
dependencies_installed() {
  [ -d "node_modules" ]
}

# Function to check if a database exists
database_exists() {
  psql -U $DB_USER -h $DB_HOST -p $DB_PORT -lqt | cut -d \| -f 1 | grep -qw $DB_NAME
}

# Function to check if tables exist in the database
tables_exist() {
  psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -c '\dt' | grep -qw 'users\|posts'
}

# Check if Node.js dependencies are installed
if ! dependencies_installed; then
  # Install Node.js dependencies
  npm install
fi

# Create database if it doesn't exist
if ! database_exists; then
  createdb -U $DB_USER -h $DB_HOST -p $DB_PORT $DB_NAME
fi

# Connect to database and execute SQL script if tables don't exist
if ! tables_exist; then
  psql -U $DB_USER -d $DB_NAME -h $DB_HOST -p $DB_PORT -f "database.sql"
fi

# Run your Node.js application
npm run dev
