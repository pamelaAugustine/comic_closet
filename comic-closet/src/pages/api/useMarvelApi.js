import { useEffect, useState } from 'react';

export default function useMarvelApi(url) {
    const [ apiData, setApiData ] = useState(null);
    const [ isLoading, setIsLoading ]  = useState(false);
    const [ isError, setIsError ] = useState(null);
    
    const fetchApiData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(url);
            const data = await res.json();

            setApiData(data.data.results);          
            setIsLoading(false)
        }
        catch (error){
            console.error(error)
            setIsError(error)
            setIsLoading(false)
        }       
    }
        useEffect(() => {
            fetchApiData();
        }, []);

    return { apiData, isLoading, isError }

};