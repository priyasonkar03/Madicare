import Doctor from '../models/DoctorSchema.js'
//for update Doctors
export const updateDoctor = async (req, res)=>{
    const id = req.params.id;
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, 
            {$set: req.body}, {new:true})
        res.status(200).json({success:true, message:"Sucessfully updated", 
        data:updatedDoctor})    

    } catch (err) {
        res.status(500).json({success:false, message:"Failed to updated"})    
    }
};
//for delete Doctors
export const deleteDoctor = async (req, res)=>{
    const id = req.params.id;
    try {
        await Doctor.findByIdAndDelete(id)
        res.status(200).json({
            success:true, message:"Sucessfully deleted",
            })    

    } catch (err) {
        res.status(500).json({success:false, message:"Failed to deleted"})    
    }
};
//for single Doctors
export const getSingleDoctor = async (req, res)=>{
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id).select('-password');
        res.status(200).json({success:true, message:"Doctor found", data:doctor})    

    } catch (err) {
        res.status(404).json({success:false, message:"No Doctor found"})    
    }
};

//for all Doctors
export const getAllDoctor = async (req, res)=>{
    //const id = req.params.id;
    try {
        //Query for filters doctor
        const {query} = req.query
        let doctors;

        if(query){
            doctors = await Doctor.find({isApproved:'approved', 
            $or:[
            {name:{$regex:query, $options:"i"}},
            {specialization:{$regex:query, $options:"i"}},
        ],
        }).select('-password');
    } else{
        doctors = await Doctor.find({isApproved:'approved'}).select('-password');
    }

        
        res.status(200).json({success:true, message:"Doctors found", data:doctors})    

    } catch (err) {
        res.status(404).json({success:false, message:"Not found"})    
    }
};