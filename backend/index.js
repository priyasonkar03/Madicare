// import express from 'express';
// import cookiesParser from 'cookie-parser';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import authRoute from './Routes/auth.js';
// import userRoute from './Routes/user.js';
// import doctorRoute from './Routes/doctor.js';
// import reviewRoute from './Routes/review.js';
// import bookingRoute from './Routes/booking.js';


// dotenv.config()
// const port = process.env.PORT || 8000;
// const app = express()
// // const port = process.env.PORT || 8000;

// const corsOptions ={
//     origin:true
// }

// app.get('/',(req, res)=> {
//     res.send('Api is Working')
// })

// // app.listen(port, () =>{
// //     console.log("Server is running on prot" + 8000);
// // })

// //database connection
// mongoose.set('strictQuery', false)
// const connectDB = async()=>{
//     try {
//         await mongoose.connect(process.env.MONGO_URL,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MonogoDB database is connected');
//     } catch (error) {
//         console.log('MonogoDB connected failed');
//     }
// }

// //middleware this is very important for postman api
// app.use(express.json());
// app.use(cookiesParser());
// app.use(cors(corsOptions));
// app.use('/api/v1/auth', authRoute); //domain/api/v1/register
// app.use('/api/v1/users', userRoute); //domain/api/v1/users
// app.use('/api/v1/doctors', doctorRoute); //domain/api/v1/doctor
// app.use('/api/v1/reviews', reviewRoute); //domain/api/v1/review
// app.use('/api/v1/bookings', bookingRoute); //domain/api/v1/bookings


// app.listen(port, ()=>{
//     connectDB();
//     console.log('Server is running on port' + port);
// })


import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';
import reviewRoute from './Routes/review.js';
import bookingRoute from './Routes/booking.js';

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// Database connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB database connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        // Throw the error if you want to stop the server on connection failure
        // throw error;
    }
};
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true }));
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);
app.use('/api/v1/bookings', bookingRoute);

app.get('/', (req, res) => {
    res.send('API is Working');
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});
