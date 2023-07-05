const express = require('express');
require('dotenv').config();
const colors = require('colors');
const connectDB = require('./db');
const { notFound, errorHandler } = require('./middlewares/errorHandling');
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('<h1 style="text-align:center;">Hello from Your Notes server👋</h1>');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB().then(() => {
  const port = process.env.PORT || 6060;
  app.listen(port, () => {
    console.log(`server is now running on port: ${port}....`.blue);
  });
});
