const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const { connectDB } = require('./config/db');
const cors = require('cors');
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
};

const app = express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/summaries', require('./routes/summaryRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  });
