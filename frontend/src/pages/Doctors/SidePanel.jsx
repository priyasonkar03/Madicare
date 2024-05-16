// import convertTime from "../../utils/convertTime";
// import { BASE_URL, token } from './../../config';
// import { toast } from 'react-toastify';

// const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

//    const bookingHandler = async () => {
//     try {
//         // const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`,{
//         //     method: 'POST',
//         //     headers: {
//         //         Authorization: `Bearer ${token}`
//         //     }
//         // });
//         const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });

//         const data = await res.json();

//         if (!res.ok) {
//             throw new Error((data && data.message) ? data.message + " Please try again" : "Failed to fetch checkout session. Please try again.");
//         }

//         if (data.session && data.session.url) {
//             window.location.href = data.session.url;
//         } 
//         // else {
//         //     throw new Error('Session URL not found in the response.'); // Handle missing URL
//         // }
//     } catch (err) {
//        // console.error(err); // Log the error for further investigation
//         toast.error(err.message || 'An error occurred. Please try again.');
//     }
//    }
    
//   return (
//     <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
//         <div className='flex items-center justify-between'>
//             <p className='text__para mt-0 font-semibold'>Ticket Price</p>
//             <span className='text-[16px] leading-7 lg:text-[22px]
//             lg:leading-8 text-headingColor font-bold'>
//                 {ticketPrice}</span>
//         </div>
//         <div className="mt-[30px]">
//             <p className="text__para mt-0 font-semibold text-headingColor">
//                 Available Time Slots:
//             </p>
//             <ul className="mt-3">
//                 {timeSlots?.map((item, index)=>(
//                     <li key={index} className="flex items-center justify-between mb-2">
//                     <p className='text-[15px] leading-6 text-textColor font-semibold'>
//                         {item.day.charAt(0).toUpperCase() + item.day.slice(1)}</p>
//                     <p className='text-[15px] leading-6 text-textColor font-semibold'>
//                         {convertTime(item.startingTime)} - {convertTime(item.endingTime)}</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//         <button onClick={bookingHandler} className='btn px-2 w-full rounded-md' type='button'>
//             Book Appointment</button>
//     </div>
//   );
// }

// export default SidePanel;

import convertTime from "../../utils/convertTime";
import { BASE_URL, token } from './../../config';
import { toast } from 'react-toastify';

const SidePanel = ({ doctorId, ticketPrice, timeSlots }) => {

   const bookingHandler = async () => {
    try {
        const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            // Check if response status is not okay, throw an error
            throw new Error((data && data.message) ? data.message + " Please try again" : "Failed to fetch checkout session. Please try again.");
        }

        if (data.session && data.session.url) {
            // If session URL exists, redirect to it
            window.location.href = data.session.url;
        } else {
            throw new Error('Session URL not found in the response.'); // Handle missing URL
        }
    } catch (err) {
        // If any error occurs, display it using toast
        toast.error(err.message || 'An error occurred. Please try again.');
    }
   }
    
  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>Ticket Price</p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                {ticketPrice}</span>
        </div>
        <div className="mt-[30px]">
            <p className="text__para mt-0 font-semibold text-headingColor">
                Available Time Slots:
            </p>
            <ul className="mt-3">
                {timeSlots?.map((item, index)=>(
                    <li key={index} className="flex items-center justify-between mb-2">
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        {item.day.charAt(0).toUpperCase() + item.day.slice(1)}</p>
                    <p className='text-[15px] leading-6 text-textColor font-semibold'>
                        {convertTime(item.startingTime)} - {convertTime(item.endingTime)}</p>
                    </li>
                ))}
            </ul>
        </div>
        <button onClick={bookingHandler} className='btn px-2 w-full rounded-md' type='button'>
            Book Appointment</button>
    </div>
  );
}

export default SidePanel;
