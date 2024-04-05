import express from 'express'
import cookiesParser from 'cookie-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';


dotenv.config()
const port = process.env.PORT || 8000;
const app = express()
// const port = process.env.PORT || 8000;

const corsOptions ={
    origin:true
}

app.get('/',(req, res)=> {
    res.send('Api is Working')
})

// app.listen(port, () =>{
//     console.log("Server is running on prot" + 8000);
// })

//database connection
mongoose.set('strictQuery', false)
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MonogoDB database is connected');
    } catch (error) {
        console.log('MonogoDB connected failed');
    }
}

//middleware
app.use(express.json());
app.use(cookiesParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoute); //domain/api/v1/register
app.use('/api/v1/users', userRoute); //domain/api/v1/users
app.use('/api/v1/doctors', doctorRoute); //domain/api/v1/doctor


app.listen(port, ()=>{
    connectDB();
    console.log('Server is running on port' + port);
})