# Human Language for DB Query

This project demonstrates a Node.js backend architecture for modifying databases using human language commands. The structure follows best practices for maintainability and scalability.

## Project Structure
- `models/`: Contains OOP classes representing data entities (e.g., Customer, Order, etc.).
- `services/`: Handles business logic and data access (read/write operations).
- `controllers/`: Manages HTTP requests and responses, calling services as needed.
- `router/`: Maps API endpoints to controller functions.
- `middleware/`: Handles validation, logging, authentication, and other request/response processing.
- `utils/`: Utility functions (e.g., email, logging helpers).
- `data/`: Temporary storage for JSON data (simulating a database).

## How It Works
1. **Request Flow:**
   - A user sends a request (e.g., to modify or query data using natural language).
   - The request is routed via `router/` to the appropriate controller in `controllers/`.
   - The controller interprets the request and calls the relevant service in `services/`.
   - The service interacts with models in `models/` and reads/writes data from `data/`.
   - Middleware in `middleware/` can process requests for validation, logging, or authentication.
   - Utility functions in `utils/` support common tasks.
2. **Example:**
   - To add a new customer, a POST request is sent to `/api/customers`.
   - The router maps this to a controller, which calls a service to create the customer and store it in `data/customers.json`.

## Getting Started
1. Install dependencies: `npm install`
2. Start the server: `npm run dev` or `npm start`

This structure makes it easy for your team to extend functionality and keep code organized as you build a human language interface for database operations.
