// // import Booking from '../models/BookingSchema.js';
// // import Doctor from '../models/DoctorSchema.js'
// // //for update Doctors
// // export const updateDoctor = async (req, res)=>{
// //     const id = req.params.id;
// //     try {
// //         const updatedDoctor = await Doctor.findByIdAndUpdate(id, 
// //             {$set: req.body}, {new:true})
// //         res.status(200).json({success:true, message:"Sucessfully updated", 
// //         data:updatedDoctor})    

// //     } catch (err) {
// //         res.status(500).json({success:false, message:"Failed to updated"})    
// //     }
// // };
// // //for delete Doctors
// // export const deleteDoctor = async (req, res)=>{
// //     const id = req.params.id;
// //     try {
// //         await Doctor.findByIdAndDelete(id)
// //         res.status(200).json({
// //             success:true, message:"Sucessfully deleted",
// //             })    

// //     } catch (err) {
// //         res.status(500).json({success:false, message:"Failed to deleted"})    
// //     }
// // };
// // //for single Doctors
// // export const getSingleDoctor = async (req, res)=>{
// //     const id = req.params.id;
// //     try {
// //         const doctor = await Doctor.findById(id)
// //         .populate("reviews")
// //         .select('-password');
// //         res.status(200).json({success:true, message:"Doctor found", data:doctor})    

// //     } catch (err) {
// //         res.status(404).json({success:false, message:"No Doctor found"})    
// //     }
// // };

// // //for all Doctors
// // export const getAllDoctor = async (req, res)=>{
// //     //const id = req.params.id;
// //     try {
// //         //Query for filters doctor (find the doctors )
// //         const {query} = req.query
// //         let doctors;

// //         if(query){
// //             doctors = await Doctor.find({isApproved:'approved', 
// //             $or:[
// //             {name:{$regex:query, $options:"i"}},
// //             {specialization:{$regex:query, $options:"i"}},
// //         ],
// //         }).select('-password');
// //     } else{
// //         doctors = await Doctor.find({isApproved:'approved'}).select('-password');
// //     }

        
// //         res.status(200).json({success:true, message:"Doctors found", data:doctors})    

// //     } catch (err) {
// //         res.status(404).json({success:false, message:"Not found"})    
// //     }
// // };

// // //function for doctor profile
// // export const getDoctorProfile = async(req, res)=>{
// //     const doctorId = req.doctorId
// //     try {
// //         const doctor = await doctor.findById(doctorId)

// //         if(!doctor){
// //             return res.status(404).json({success:false, message:"Doctor not found"})
// //         }

// //         const {password, ...rest} = doctor._doc; 
// //         const appointments = await Booking.find({doctor:doctorId})

// //         res.status(200).json({success:true, 
// //         message:'Profile info is getting',
// //         data: {...rest, appointments},
// //     });
// //     } catch (err) {
// //         res.status(500).json({ success:false, message:"Something went wrong cannot get"})           
// //     }
// // };

// Import necessary modules
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';

// Update doctor by ID
// export const updateDoctor = async (req, res) => {
//     const id = req.params.id;
//     try {
//         const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });
//         if (!updatedDoctor) {
//             return res.status(404).json({ success: false, message: "Doctor not found" });
//         }
//         res.status(200).json({ success: true, message: "Successfully updated", data: updatedDoctor });
//     } catch (err) {
//         res.status(500).json({ success: false, message: "Failed to update" });
//     }
// };
//----------------pyiush code------------
export const updateDoctor = async (req, res) => {
    const id = req.params.id;
    
    // Check if id is undefined or null
    if (!id) {
        return res.status(400).json({ success: false, message: "Doctor ID is missing" });
    }

    try {
        // Find and update the doctor by ID
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, req.body, { new: true });

        // Check if the doctor is not found
        if (!updatedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Return success response with updated doctor data
        res.status(200).json({ success: true, message: "Successfully updated", data: updatedDoctor });
    } catch (err) {
        // Handle any errors that occur during the update process
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update" });
    }
};

// Delete doctor by ID
export const deleteDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);
        if (!deletedDoctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({ success: true, message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to delete" });
    }
};

// Get single doctor by ID
export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id).populate("reviews").select('-password');
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        res.status(200).json({ success: true, message: "Doctor found", data: doctor });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get all doctors
export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query;
        let doctors;
        if (query) {
            doctors = await Doctor.find({ isApproved: 'approved', $or: [{ name: { $regex: query, $options: "i" } }, { specialization: { $regex: query, $options: "i" } },], }).select('-password');
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select('-password');
        }
        res.status(200).json({ success: true, message: "Doctors found", data: doctors });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Get doctor profile along with appointments
export const getDoctorProfile = async (req, res) => {
    const doctorId = req.doctorId;
    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }
        const { password, ...rest } = doctor._doc;
        const appointments = await Booking.find({ doctor: doctorId });
        res.status(200).json({ success: true, message: 'Profile info retrieved', data: { ...rest, appointments } });
    } catch (err) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
