const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/mongoDB');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
connectDB().catch(console.dir);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(express.json());
//API Endpoints
app.get('/', (req, res) => {
    res.send('Welcome to the server');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
});