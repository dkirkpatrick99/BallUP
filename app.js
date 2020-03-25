const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/keys').mongoURI;
const passport = require('passport');
const path = require('path');

const users = require("./routes/api/users");
const games = require("./routes/api/games");

// if (process.env.NODE_ENV === 'production') {
//   app.use('/',express.static(path.join(__dirname, 'frontend/build')));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
//   })
// }

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}



mongoose
  .connect(process.env.MONGODB_URI || db, {
    useNewUrlParser: true, useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

  
app.get("/", (req, res) => res.send("Hello World!!"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/games", games);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));



