import { useEffect, useState } from 'react';
import { PhotoGallery } from '../interfaces';

const useSearchGallery = (data: PhotoGallery[], searchKey: keyof PhotoGallery) => {
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ filteredData, setFilteredData ] = useState<PhotoGallery[]>(data);
    const [ isSearching, setIsSearching ] = useState<boolean>(false);

    useEffect(() => {
        const performSearch = async () => {
            setIsSearching(true);

            const results =
                !searchTerm.trim()
                    ? data
                    : data.filter((item) =>
                        item[ searchKey ]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    );

            await new Promise((resolve) => setTimeout(resolve, 500));

            setFilteredData(results);
            setIsSearching(false);
        };

        performSearch();
    }, [ data, searchKey, searchTerm ]);

    return { searchTerm, setSearchTerm, filteredData, isSearching };
};

export default useSearchGallery;
