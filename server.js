const express = require('express');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: './config/.env' })
const mongoose = require('mongoose');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET, HEAD, PUT, PATCH, POST, DELETE',
    'preflightContinue': false
}


app.use(cors(corsOptions));

//connection bdd
mongoose.connect("mongodb://localhost/INPT", (err) => {
    if (!err) console.log("connected");
    else console.log("error");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//security jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    if (res.locals.user!==null) {
        res.status(200).send(res.locals.user._id)
    }
   return;
    
});

//routes
app.use('/user', userRoutes);
app.use('/post', postRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})