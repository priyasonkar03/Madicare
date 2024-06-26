import jwt from 'jsonwebtoken'
import Doctor from '../models/DoctorSchema.js'
import User from '../models/UserSchema.js'

//this function is used for authentication or next parameter is function used
export const authenticate = async (req, res, next) =>{

    //get token from headers
    const authToken = req.headers.authorization
    //'Bearer' token in used
    //check token is exists or not
    if(!authToken || !authToken.startsWith("Bearer ")){
        return res.status(401).json({ success:false, message:'No token, authorization denied'})
    }

    try {
        //console.log(authToken);
        const token = authToken.split(" ")[1];
         //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.userId = decoded.id
        req.role = decoded.role

        next();     //must be call the next function
    } catch (err) {
        if (err.name === 'TokenExpiredError'){
            return res.status(401).json({ message:"Token is expired"})
        }
            return res.status(401).json({success:false, message:"Invalid token"})
    }
};

// export const restrict = roles => async (req, res, next) =>{
//     const userId = req.userId

//     let user;

//     const patient = await User.findById(userId)
//     const doctor = await Doctor.findById(userId)

//     if(patient){
//         user = patient 
//     }
//     if(doctor){
//         user = doctor 
//     }

//     if(!roles.includes(user.role)){
//         return res.status(401).json({success:false, message:"You're not authorized"});
//     }
//     next();
// };


export const restrict = roles => async (req, res, next) => {
    const userId = req.userId;

    try {
        let user;

        const patient = await User.findById(userId);
        const doctor = await Doctor.findById(userId);

        if (patient) {
            user = patient;
        } else if (doctor) {
            user = doctor;
        } else {
            return res.status(401).json({ success: false, message: "You're not authorized" });
        }

        if (!roles.includes(user.role)) {
            return res.status(401).json({ success: false, message: "You're not authorized" });
        }

        next(); //it must be used for authorized
    } catch (error) {
        console.error('Error in restrict middleware:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
