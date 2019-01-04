const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//Add Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');


const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//DB config
const db = require('./config/keys').mongoURI;

//Connect To MongoDB
mongoose
  .connect(db)
  .then( () => console.log('mongoDB connected'))
  .catch(err => console.log(err))
app.get('/', (req,res)=> res.send('hello'));

//Use Routes
app.use('/api/users',users);
app.use('/api/posts',posts);
app.use('/api/profile',profile);


const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on ${port}`));
