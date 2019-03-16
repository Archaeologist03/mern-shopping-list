const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// BodyParser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('mongo connected');
  })
  .catch(err => {
    console.log(err);
  });

app.use('/api/items', items);

// Serve static assets if in prod
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server started on ${port}`));
