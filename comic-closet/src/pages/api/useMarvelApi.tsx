import { useEffect, useState } from 'react';
import { ComicData } from '../types/shared_types'

export default function useFetch(url: string): {isLoading: boolean, ComicData: ComicData, serverError: string | unknown} {
	const [isLoading, setIsLoading] = useState(true);
	const [ComicData, setComicData] = useState<ComicData>([{id: 0}]);
	const [serverError, setServerError] = useState<string | unknown>('');
    
    const fetchApiData = async () => {
        try {
          
            const res = await fetch(url);
            const data = await res.json();

            setComicData(data.data.results);          
            setIsLoading(false)
            console.log(data.data.results)
        }
        catch (error){
            console.error(error)
            setServerError(error)
            setIsLoading(false)
        }       
    }
        useEffect(() => {
            fetchApiData();
        }, []);

    return { ComicData, isLoading, serverError }

};