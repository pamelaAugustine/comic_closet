import { useEffect, useState } from 'react';

type Data = {
    isLoading: boolean,
    apiData: {
        key: number,
        title: string,
        issueNumber: number,
        publishDate: string,
        creators: string[],
        thumbnail: string
    },
    isError: string
}

export default function useMarvelApi(url: string): Data {
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