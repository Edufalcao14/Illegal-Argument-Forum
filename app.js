const express = require('express');

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const session = require('express-session')
const logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const questionpageRouter = require('./routes/questionspage');
const memberRouter = require('./routes/members');
const adminRouter = require('./routes/admin');

const { rmSync } = require('fs');


const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(logger('dev')); // Log each request
app.use(express.urlencoded({ extended: false })); // Decode form values
app.use(express.static(path.join(__dirname, 'public'))); // Get static files from public folder

// Uncomment the following line when you have setup the config file
app.use(session({ secret: "eduardo_fisnik", resave: false, saveUninitialized: false }));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/questions', questionsRouter);
app.use('/questionspage',questionpageRouter);
app.use('/members',memberRouter);
app.use('/admin',adminRouter);

app.use(express.static(__dirname + '/public'));


// Create error on page not found
app.use((req, res, next) => next(createError(404)) ); 

// Show error hbs page
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render('error', { error });
});

// Launch server
app.listen(PORT, () => console.log('Server is running in port ' + {PORT}) );
rmSync