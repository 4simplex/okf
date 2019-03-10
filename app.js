const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database, { useNewUrlParser: true })
.then(db => console.log('DB is connected'))
.catch(err => console.error(err))

const app = express();

const users = require('./routes/users');

//Port Number
const port = process.env.PORT || 3000;

//CORS Middleware
app.use(cors());

//Set public folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api', users);

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint.');
});

//Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});