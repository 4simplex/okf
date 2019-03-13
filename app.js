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

//Port Number
const port = process.env.PORT || 3000;

app.use(express.json({ extended: true, limit: '50mb' }));

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

app.use('/api', require('./routes/users'));
app.use('/api/brand', require('./routes/brand.routes'));
app.use('/api/product', require('./routes/product.routes'));
app.use('/api/category', require('./routes/category.routes'));
app.use('/api/provider', require('./routes/provider.routes'));
app.use('/api/price', require('./routes/price.routes'));

//Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint.');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//Start server
app.listen(port, () => {
    console.log('Server started on port ' + port);
});