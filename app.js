const express = require('express');
const mongoose = require('mongoose');
const authRoutes=require('./routes/authRoutes')
const characterRoutes=require('./routes/characterRoutes')

const cookieParser = require('cookie-parser')
const {requireAuth, checkUser}=require('./middlewares/authMiddleware')
const {characters_get}=require('./controllers/characterController')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'enter mongodb connection address';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('*',checkUser)
app.get('/', (req, res) => res.render('home'));
app.get('/characters',requireAuth,characters_get);
app.use(authRoutes);
app.use(characterRoutes);

