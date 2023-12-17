import express from 'express';
import pageRoute from './routes/pageRoute.js';
import mongoose from 'mongoose';
import courseRoute from './routes/courseRoute.js';
import categoryRoute from './routes/categoryRoute.js';
import userRoute from './routes/userRoute.js';



const app = express();


//connect db
mongoose.connect('mongodb://localhost/smartedu-db')

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);


const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});

