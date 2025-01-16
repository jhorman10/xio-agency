import { useEffect, useState } from 'react';
import { useGallery } from '../context';
import { PhotoGallery } from '../interfaces';

const useGetGallery = (fetchDataFunction: (page: number, limit: number) => Promise<PhotoGallery[]>) => {
    const { data, setData, page, setPage, limit } = useGallery();
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await fetchDataFunction(page, limit);
                setData(result); // Actualiza los datos en el contexto.
                localStorage.setItem('galleryData', JSON.stringify(result)); // Actualiza localStorage con nuevos datos.
                localStorage.setItem('galleryPage', JSON.stringify(page)); // Guarda la página actual.
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [ fetchDataFunction, page, limit, setData ]); // Se ejecuta cuando cambia la página.

    return { data, loading, error, page, setPage };
};

export default useGetGallery;
