import express from 'express';
import pageRoute from './routes/pageRoute.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash  from 'express-flash';
import mongoose from 'mongoose';
import courseRoute from './routes/courseRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import userRoute from './routes/userRoute.js';
import methodOverride from 'method-override';

const app = express();

//Connect DB
mongoose.connect('mongodb://localhost/smartedu-db').then(() => {
  console.log('DB Connected Successfully');
});

//Template Engine
app.set('view engine', 'ejs');

//Global Variable

global.userIN = null;

//Middlewares
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

//Routes
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});