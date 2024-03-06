require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./DBConnection/DbConfig");

const userRoute = require("./Routes/UserRouter");
const PORT = process.env.PORT || 3500;

// Connect to MongoDB
connectDB;

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false /* true, limit:'10mb'  */ }));

// built-in middleware for json
app.use(
  express.json({
    /* limit:'10mb' */
  })
);

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", userRoute);
/* 
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout')); 
*/
/* 
app.use(verifyJWT);
app.use('/employees', require('./routes/api/employees'));
 */

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, "0.0.0.0", () =>
    console.log(`Server running on port ${PORT}`)
  );
});

/* const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./DbConnection/DbConfig");
const userRoute = require("./Routes/UserRouter");
require('dotenv').config();
const app = express();
const path = require('path');

const connectDB = require('./DbConnection/DbConfig');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(bodyparser.json());

/* app.use(
  cors({
    origin: "https://hostel-frontend-delta.vercel.app",
    credentials: true,
  })
);

app.use("/user", userRoute); 

app.listen(
  process.env.PORT,
  console.log(`server listening to the port ${process.env.PORT}`)
);

app.use(
  cors({
    origin: "http://localhost:3000",//process.env.ALLOWED_ORIGIN, // Set this environment variable to your frontend URL
    credentials: true,
  })
);
// Export the express app for Vercel to use
module.exports = app;
 */
