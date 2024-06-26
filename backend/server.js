require('dotenv').config()
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errormiddleware = require('./middlewares/error-middleware');

// Middleware: Middleware functions are functions that have access to the request object (req), the response object (res), and the next function in the application's request-response cycle. They can execute any code, make changes to the request and the response objects, end the request-response cycle, and call the next middleware function in the stack.

app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);


// Error Middleware: Error middleware functions are functions that have access to the error object (err), the request object (req), the response object (res), and the next function in the application's request-response cycle. They can execute any code, make changes to the request and the response objects, end the request-response cycle, and call the next middleware function in the stack.
app.use(errormiddleware)

// app.get("/", (req, res) => {
// res.status(200).send("hello server is correctly running");
// });

// app.get("/register", (req, res) => {
// res.status(200).send("Welcome to Registration page");
// });

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
