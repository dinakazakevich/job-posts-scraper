<h1 align="center">Welcome to job-posts-scraper 👋</h1>
<p>
  <img
    alt="Version"
    src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000"
  />
  <a href="#" target="_blank">
    <img
      alt="License: ISC"
      src="https://img.shields.io/badge/License-ISC-yellow.svg"
    />
  </a>
</p>

> ABOUT: A job posts scraper that uses SerpAPI to surface relevant job posts for a given
input. Designed for the community of 7K remote workers that I run on Telegram. 

> WORK-IN-PROGRESS: I have added the underlying script, an Express.js backend, a
PostgreSQL database, and I'm currently still working out the React frontend.

> LIMITATIONS: Using custom inputs for search query and exclude query is not yet supported yet. 

### Set up a local database instance using a script

Make `database/setup_db.sh` executable: Open your terminal, navigate to the project root (job-posts-scraper), and run:

```bash
chmod +x database/setup_db.sh
```
Run the script: From the project root, execute the script:

```bash 
./database/setup_db.sh
```
The script will prompt you for the username and password.


## Setup Database Manually 

This project uses PostgreSQL to store job post data. Follow these steps to set up a local PostgreSQL instance:

### 1. Install PostgreSQL

If you don't have PostgreSQL installed, you can download it from the official website or use a package manager:

**macOS (using Homebrew):**
```bash
brew install postgresql
brew services start postgresql
```
### 2. Create the Database

The application expects a database named job_results. You can create it using the psql command-line tool.

First, connect to your PostgreSQL server (you might need to switch to the postgres user or use sudo -u postgres):

```bash
psql postgres
```

Then, create the database:
```sql
CREATE DATABASE job_results;
\q
```
### 3. Create a Database User (Optional, but recommended)

If you want to use a specific user other than the default postgres user, create one and grant it privileges.

Connect to PostgreSQL again (e.g., psql job_results or psql postgres):

```sql 
CREATE USER your_pg_user WITH PASSWORD 'your_pg_password';
GRANT ALL PRIVILEGES ON DATABASE job_results TO your_pg_user;
\q
```
Replace your_pg_user and your_pg_password with your desired username and password.

### 4. Create the job_posts Table
Connect to the job_results database:

```sql 
psql job_results
```

Then, create the job_posts table with the following schema:

```sql
CREATE TABLE IF NOT EXISTS job_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    link TEXT UNIQUE,
    snippet TEXT,
    position VARCHAR(255),
    company VARCHAR(255),
    location VARCHAR(255),
    source VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
\q
```
The `link` column is set to UNIQUE to prevent duplicate job posts.

### 5. Configure Environment Variables

Create a .env file in the root of the project to store your PostgreSQL credentials.

```
DATABASE_URL=postgresql://your_pg_user:your_pg_password@localhost:5432/job_results
PG_USER=your_pg_user
PG_PASSWORD=your_pg_password
```

Replace `your_pg_user` and `your_pg_password` with the credentials you configured (or postgres if you are using the default user).

