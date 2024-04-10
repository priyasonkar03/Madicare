import User from '../models/UserSchema.js'
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js'
//for update users
export const updateUser = async (req, res)=>{
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, 
            {$set: req.body}, {new:true})
        res.status(200).json({success:true, message:"Sucessfully updated", data:updatedUser})    

    } catch (err) {
        res.status(500).json({success:false, message:"Failed to updated"})    
    }
};
//for delete users
export const deleteUser = async (req, res)=>{
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({
            success:true, message:"Sucessfully deleted",
            })    

    } catch (err) {
        res.status(500).json({success:false, message:"Failed to deleted"})    
    }
};
//for single users
export const getSingleUser = async (req, res)=>{
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");
        res.status(200).json({success:true, message:"User found", data:user})    

    } catch (err) {
        res.status(404).json({success:false, message:"No user found"})    
    }
};

//for all users
export const getAllUser = async (req, res)=>{
    //const id = req.params.id;
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({success:true, message:"Users found", data:users})    

    } catch (err) {
        res.status(404).json({success:false, message:"Not found"})    
    }
};


//new function for userprofile
export const getUserProfile = async (req, res) =>{
    const userId = req.userId; // Assuming userId is extracted correctly

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { password, ...rest } = user._doc;
        res.status(200).json({ success: true, message: 'Profile info retrieved', data: rest });   // chat gpt corrected
        // res.status(200).json({ success: true, message: 'Profile info is getting', data: [...rest] });   this is the incorret
    } catch (err) {
        // res.status(500).json({ success: false, message: "Something went wrong while fetching profile" });           
        res.status(500).json({ success: false, message: "Something went wrong, cannot get" });           
    }
};

//now function call get my appointments

export const getMyAppointments = async(req, res)=>{
    try {
        
        //step-1 : retrive appointments from booking for specific user
        const bookings = await Booking.find({user:req.userId})

        //step-2 : retrive doctor ids from appointment bookings
        const doctorIds = bookings.map(el=>el.doctor.id)

        //step-3 : retrive doctors using doctor ids
        const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')

        res
        .status(200)
        .json({
            success:true, 
            message:"Appointments are getting", 
            data:doctors})

    } catch (err) {
        res.status(500).json({ success:false, message:"Something went wrong cannot get"})                  
    }
}