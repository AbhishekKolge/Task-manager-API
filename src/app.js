require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const tasks = require('./routes/tasks');

const app = express();
//middleware
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(morgan('tiny'));

//routes
app.use('/api/v1/tasks', tasks);

//not found middleware
app.use(notFound);
//error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

//start the server
start();
