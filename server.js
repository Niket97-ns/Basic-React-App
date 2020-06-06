const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const items = require('./routes/api/items')
const users = require('./routes/api/users');
const auths = require('./routes/api/auths');

// Config mongoose for URL parser
mongoose.set('useNewUrlParser', true);
mongoose.set( 'useUnifiedTopology', true);
mongoose.set('useCreateIndex',true);

const app = express();

// BodyParser MiddleWare
app.use(express.json());

// DB CONFIG
const mongoURI = config.get('mongoURI')

// Connect to Mongo
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDb Connected'))  
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auths);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
