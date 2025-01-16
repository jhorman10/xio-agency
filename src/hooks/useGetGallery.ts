import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { PhotoGallery } from '../interfaces';

const useGetGallery = (fetchDataFunction: (page: number, limit: number) => Promise<AxiosResponse<PhotoGallery[]>>) => {
    const [ data, setData ] = useState<PhotoGallery[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<string | null>(null);
    const [ page, setPage ] = useState<number>(1);
    const [ limit ] = useState<number>(10); // Número de elementos por página

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchDataFunction(page, limit);
                setData(result.data);
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ fetchDataFunction, page, limit ]);

    return { data, loading, error, page, setPage };
};

export default useGetGallery;
