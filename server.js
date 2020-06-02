const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path')

const items = require('./routes/api/items')

// Config mongoose for URL parser
mongoose.set('useNewUrlParser', true);
mongoose.set( 'useUnifiedTopology', true )

const app = express();

// BodyParser MiddleWare
app.use(bodyParser.json());

// DB CONFIG
const { mongoURI } = require('./config/keys');

// Connect to Mongo
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDb Connected'))  
  .catch(err => console.log(err));

// Use Routes
app.use('/api/items',items);

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
