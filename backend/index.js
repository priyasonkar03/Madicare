import express from 'express'
import cookiesParser from 'cookie-parser'
import cors from 'cors'
import mongoose, { connect } from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
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

//middleware
app.use(express.json())
app.use(cookiesParser())
app.use(cors(corsOptions))
app.use('/api/v1/auth', authRoute) //domain/api/v1/register

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

app.listen(port, ()=>{
    connectDB();
    console.log('Server is running on port' + port);
})