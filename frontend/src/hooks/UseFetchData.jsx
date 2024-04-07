import {useEffect, useState} from 'react'
import { token } from '../../config'


const useFetchData = (url) => {
    const [data,setData] = useState([])
    const [loading, setLoading] =  useState(false)
    const [error , setError] = useState(null)
    
    //this function use for handling the data and fatching the data
    useEffect(()=>{
        const fetchData = async () =>{
            
            setLoading(true)

            try {
                const res = await fetch(url, {
                    headers:{Authorization :`Bearer ${token}`},
                })
    
                const result = await res.json()
    
                if (!res.ok){
                    throw new Error(result.message + "🥺")
                    // return toast.error(result.message)
                }

                setData(result.data)
                setLoading(false)

            } catch (err) {
               setLoading(false)
               setError(err.message)                     
            }
        }

        fetchData()
    },[url])

    return {
        data, loading, error
    }
}

export default useFetchData