#!/bin/bash

# filepath: database/setup_db.sh

echo "Starting PostgreSQL database setup..."

# --- 1. Install and Start PostgreSQL (macOS using Homebrew) ---
echo "Checking for Homebrew..."
if ! command -v brew &> /dev/null; then
    echo "Homebrew is not installed. Please install Homebrew first from https://brew.sh/"
    exit 1
fi

echo "Installing/Updating PostgreSQL via Homebrew..."
brew install postgresql || { echo "Failed to install postgresql. It might already be installed."; }
brew services start postgresql || { echo "Failed to start postgresql service. It might already be running."; }
echo "PostgreSQL service started."

# --- Prompt for Database User and Password ---
read -p "Enter desired PostgreSQL username (e.g., jobscraper_user): " PG_USER
read -s -p "Enter desired PostgreSQL password: " PG_PASSWORD
echo # Newline after password prompt

# --- 2. Create the Database 'job_results' ---
echo "Creating database 'job_results'..."
# Connect as the default postgres user to create the database
psql -U postgres -c "CREATE DATABASE job_results;" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "Database 'job_results' might already exist or there was an error creating it. Continuing..."
else
    echo "Database 'job_results' created."
fi

# --- 3. Create a Database User and Grant Privileges ---
echo "Creating user '$PG_USER' and granting privileges..."
# Connect as the default postgres user to create the new user
psql -U postgres -c "CREATE USER $PG_USER WITH PASSWORD '$PG_PASSWORD';" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "User '$PG_USER' might already exist or there was an error creating it. Attempting to grant privileges anyway..."
fi
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE job_results TO $PG_USER;"
if [ $? -ne 0 ]; then
    echo "Failed to grant privileges to user '$PG_USER'. Please check permissions manually."
    exit 1
else
    echo "User '$PG_USER' created and privileges granted."
fi

# --- 4. Create the 'job_posts' Table ---
echo "Creating 'job_posts' table in 'job_results' database..."
# Connect as the newly created user to the job_results database
psql -U "$PG_USER" -d job_results -c "CREATE TABLE IF NOT EXISTS job_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    link TEXT UNIQUE,
    snippet TEXT,
    position VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    source VARCHAR(255),
    archived BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    
);"
if [ $? -ne 0 ]; then
    echo "Failed to create 'job_posts' table. Please check the SQL command or user permissions."
    exit 1
else
    echo "'job_posts' table created successfully (or already existed)."
fi

# --- 5. Configure Environment Variables ---
echo "Creating/Updating .env file with PostgreSQL credentials in the project root..."
# The .env file should typically reside in the project root, not the database subfolder
echo "PG_USER=$PG_USER" > .env
echo "PG_PASSWORD=$PG_PASSWORD" >> .env
echo "DATABASE_URL=postgresql://$PG_USER:$PG_PASSWORD@localhost:5432/job_results" >> .env
echo ".env file updated in the project root."

echo "Database setup complete! You can now run your application."