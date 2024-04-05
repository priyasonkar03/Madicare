import User from '../models/UserSchema.js'
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
        const user = await User.findById(id).select('-password');
        res.status(200).json({success:true, message:"User found", data:user})    

    } catch (err) {
        res.status(404).json({success:false, message:"No user found"})    
    }
};

//for all users
export const getAllUser = async (req, res)=>{
    //const id = req.params.id;
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({success:true, message:"Users found", data:users})    

    } catch (err) {
        res.status(404).json({success:false, message:"Not found"})    
    }
};