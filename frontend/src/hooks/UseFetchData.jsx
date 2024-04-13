import { useEffect, useState } from 'react';
import { token } from '../config'; // Corrected import assuming token is a default export from '../config'

const useFetchData = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url, {
                    headers: { 
                        Authorization: `Bearer ${token}` // Use token directly without curly braces
                    }
                });
                const result = await res.json();

                if (!res.ok) {
                    throw new Error(result.message);
                    // You might want to handle the error here
                }

                setData(result.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                setError(err.message);
            }
        };

        fetchData();

        // Cleanup function to handle component unmounting or URL change
        return () => {
            // Abort fetch if it's still ongoing to prevent memory leaks
            // and also handle setState on unmounted component
        };
    }, [url]);

    return {
        data,
        loading,
        error
    };
};

export default useFetchData;



