import dbConnection from './db/dbConnection.js';
import hotelRoute from './routers/hotels.js';
import usersRoute from './routers/users.js';
import Users from './models/Users.js';
import roomsRoute from './routers/rooms.js';
import authRoute from './routers/auth.js';
import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));


// http:localhost:3000/auth
// http:localhost:3000/hotels
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelRoute);
app.use('/api/users', usersRoute);
app.use('/api/rooms', roomsRoute);


// MiddleWares || for common, Details Error Message...
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    dbConnection()
    console.log('Server Start on port :', PORT, 'Successful!');
});


// default welcome message at root/index page...
const showInfo = (req, res) => {
    res.send(` 
    <head>
        <title>Server is running...</title> 
    </head>

    <body>
        <h1> Hotel Booking - Server is running...</h1>
    </body>
    `);
    // <img src='server.png'/>
}
app.get('/', showInfo);