const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 8000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

// Connect to the database
connectDB();

// Create an express app
const app = express();

// Setup app to use the json parser
app.use(express.json());

// Setup app to use the urlencoded parser
app.use(express.urlencoded({ extended: false }));

// Setup app to use the errorHandler middleware
app.use(errorHandler);

// Setup app to use the routes
app.use("/api/users", require("./routes/userRouter"));
app.use("/api/orders", require("./routes/orderRouter"));

// Setup app listen on port
app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
