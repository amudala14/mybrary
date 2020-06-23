const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const indexRoute = require('./routes/index');
const authorsRoute = require('./routes/authorRoute')

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false }));

app.use('/', indexRoute);
app.use('/authors', authorsRoute);

// GET THE .ENV
dotenv.config({ path: './.env' });

const DB = process.env.DATABASE_URL.replace('<password>', process.env.DATABASE_PASSWORD)
// const DB_LOCAL = process.env.DATABASE_LOCAL;
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch(error => console.error(error))

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
})