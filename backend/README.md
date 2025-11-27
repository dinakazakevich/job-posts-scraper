# Job Posts Scraper Backend

This service is responsible for:

-   **API Endpoints**: Providing endpoints for the frontend to retrieve, filter, and manage job listings from the database.
-   **Data Retrieval**: Querying the PostgreSQL database and passing relevant job data to the frontend.
-   **Future Data Storage**: While not yet implemented, this service will eventually handle writing job data to the database.

The job scraping functionality is handled by a separate service located in the `scripts` folder (`/scripts`).

## Getting Started

To run the backend service locally, follow these steps:

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start the Development Server**:
    ```bash
    npm run dev
    ```

The server will typically run on `http://localhost:3000` (or another port specified in your configuration).

## Project Structure

-   `src/index.ts`: Main entry point of the application.
-   `src/controllers/jobsController.ts`: Handles business logic for job-related operations.
-   `src/database/index.ts`: Manages database connections and operations for the backend.
-   `src/routes/jobs.ts`: Defines API routes for job listings.

## Technologies Used

-   Node.js
-   Express.js
-   TypeScript
-   PostgreSQL (for database interaction)
-   Winston (for logging)