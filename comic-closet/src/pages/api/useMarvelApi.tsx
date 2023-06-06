import { useEffect, useState } from 'react';
import { ComicData } from '../types/shared_types'

export default function useFetch(url: string): {isLoading: boolean, comics: ComicData[], serverError: string | unknown} {
	const [isLoading, setIsLoading] = useState(true);
	const [comics, setComics] = useState<ComicData[]>([]);
	const [serverError, setServerError] = useState<string | unknown>('');
    
    const fetchApiData = async () => {
        try {
          
            const res = await fetch(url);
            const data = await res.json();

            setComics(data.data.results);          
            setIsLoading(false)
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

    return { comics, isLoading, serverError }

};