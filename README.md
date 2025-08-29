# BookStore
A local bookstore project created as part of Vibe Coding using GHCP , also includes api as well as API tests in cypress
# Vibe Coding Project: Local Book Store API & UI

This project is a full-stack Node.js + React application for a community-driven library book inventory, created as part of the Vibe Coding initiative.

## Features
- Node.js Express REST API for managing a book inventory
- In-memory storage, seeded from `books.json` and `location.json`
- GET and POST endpoints for books, with filtering by author, name, and location
- GET endpoint for available locations
- Modern React UI with:
  - Home, About Us, and Contact Us sections
  - Location-based book browsing and donation
  - Goodreads review links for each book
  - Responsive, clean design with navigation and footer

## User Prompts & Requirements Used to Build This Project
- Setup a Node.js project and create REST API for library book inventory
- Support GET and POST operations for books (by author, book name, and location)
- Use in-memory storage for book data
- Add a sample `books.json` and `location.json` with multiple locations and books
- Create a Cypress project to test GET and POST API calls
- Build a React UI with:
  - Welcome message and buttons to view books or donate books
  - Form to add new books, including location
  - Dropdowns for location selection (fetched from backend)
  - Home, About Us, and Contact Us sections
  - Footer with copyright
  - Goodreads search/review link for each book

## How to Run
1. Install backend dependencies:
   ```sh
   npm install
   ```
2. Start the backend server:
   ```sh
   node index.js
   ```
3. In a new terminal, start the React UI:
   ```sh
   cd client
   npm install
   npm start
   ```
4. Visit [http://localhost:3000](http://localhost:3000) for API, [http://localhost:3000/locations](http://localhost:3000/locations) for locations, and [http://localhost:3001](http://localhost:3001) (or the port React chooses) for the UI.

## Testing
- Run Cypress tests with:
  ```sh
  npx cypress run --e2e
  ```

---

This project was built iteratively using user prompts and requirements, and is ready to be showcased on your GitHub as "Vibe Coding Project".
