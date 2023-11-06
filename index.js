const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connectDB = require('./db');
const cors = require('cors');

const userRoutes = require('./routes/user.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use('/api/user', userRoutes);
app.use('/api/file', require('./routes/files'));

connectDB();

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
