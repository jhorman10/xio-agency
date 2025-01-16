import { useMemo, useState } from 'react';
import { PhotoGallery } from '../interfaces';

const useSearchGallery = (data: PhotoGallery[], searchKey: keyof PhotoGallery) => {
    const [ searchTerm, setSearchTerm ] = useState<string>('');

    const filteredData = useMemo(() => {
        if (!searchTerm.trim()) return data;
        return data.filter((item) =>
            item[ searchKey ]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [ data, searchKey, searchTerm ]);

    return { searchTerm, setSearchTerm, filteredData };
};

export default useSearchGallery;
