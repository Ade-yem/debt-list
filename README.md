# ToluwaNiose Records

This project consists of a backend server and a frontend client for a debt list application.

## Backend (server)
The backend server is built using Node.js and Express.js.It provides APIs for managing debts and users.The server uses MongoDB as the database and Mongoose as the ODM (Object Data Modeling) library.It also includes authentication using JSON Web Tokens and password hashing using bcrypt.The server is written in TypeScript and includes type definitions for the dependencies.

### Prerequisites
Node.js (version 16.0.0 or higher)
MongoDB

Installation

Clone the repository:
`git clone https://github.com/Ade-yem/debt-list.git`


Navigate to the server directory:

`cd debt-list/server`

Install the dependencies:

`npm install`

Create a .env file in the server directory and configure the following environment variables:

PORT=3000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>

npm start
The server will start running on http://localhost:3000.

API Endpoints
`POST /api/auth/register`: Register a new user.
`POST /api/auth/login`: Log in an existing user.
`GET /api/debts`: Get all debts.
`GET /api/debts/:id`: Get a specific debt by ID.
`POST /api/debts`: Create a new debt.
`PUT /api/debts/:id`: Update a specific debt by ID.

`DELETE /api/debts/:id`: Delete a specific debt by ID.
For detailed information about the API endpoints and request/response formats, please refer to the server code and API documentation.

## Frontend (client)
The frontend client is built using Vue.js 3 and Vite.It provides a user interface for managing debts.The client uses TypeScript for type checking and includes various dependencies for UI components and HTTP requests.

### Prerequisites
Node.js (version 16.0.0 or higher)

### Installation
Navigate to the client directory:

`cd debt-list/client`

Install the dependencies:

`npm install`

### Development
To start the development server, run the following command:

`npm run dev`

The client will be served at http://localhost:3000.

### Build
To build the client for production, run the following command:

`npm run build`

The built files will be generated in the dist directory.

### Preview
To preview the built client locally, run the following command:

`npm run preview`

The client will be served at http://localhost:5000.

## IDE Setup
For the best development experience, it is recommended to use Visual Studio Code (VS Code) with the following extensions:

## Volar: Provides enhanced Vue.js support.
TypeScript Vue Plugin (Volar): Enables TypeScript support for Vue files.

## Contributing
If you would like to contribute to this project, please follow the guidelines in the CONTRIBUTING.md file.

## Issues
If you encounter any issues or have suggestions for improvements, please report them in the issue tracker.

## License
This project is licensed under the MIT License.See the LICENSE file for more information.

## Contact
For any inquiries or questions, you can reach out to the project maintainer:

Name: Adeyemi Adejumo
Email: adejumoadeyemi@gmail.com

## Acknowledgements
This project makes use of the following open-source libraries and resources:

Express.js
Mongoose
Vue.js
Vite
Tailwind CSS
Axios
FontAwesome
Vue Toastification

We would like to express our gratitude to the maintainers and contributors of these projects for their valuable work.
