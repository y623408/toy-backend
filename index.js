const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./DbConnection/DbConfig");
const userRoute = require("./Routes/UserRouter");

const app = express();
app.use(bodyparser.json());
app.use(
  cors({
    origin: "https://hostel-frontend-delta.vercel.app",
    credentials: true,
  })
);
app.use("/user", userRoute);
/*
app.listen(
  process.env.PORT,
  console.log(`server listening to the port ${process.env.PORT}`)
);
*/
/*
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN, // Set this environment variable to your frontend URL
    credentials: true,
  })
);*/
// Export the express app for Vercel to use
module.exports = app;
