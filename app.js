const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();
const DB_CONNECT = require('./src/db/db.js');
const userRouter = require('./src/routes/user.routes.js');
DB_CONNECT()

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/user', userRouter);

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({ error: "Internal Server Error" });
// });

module.exports = app;
