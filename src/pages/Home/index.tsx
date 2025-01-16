import { useCallback } from 'react';
import { galleryApi } from '../../api';
import noResults from '../../assets/img/no-results.webp';
import { CardGallery, Loader } from '../../components';
import { useGetGallery, useSearchGallery } from '../../hooks';
import { PhotoGallery } from '../../interfaces';
import ErrorBoundary from '../ErrorBoundary';

export const Home = () => {
  const fetchPhotos = useCallback(
    async (page: number, limit: number): Promise<PhotoGallery[]> => {
      const response = await galleryApi.get<PhotoGallery[]>('/photos', {
        params: { _page: page, _limit: limit },
      });
      return response.data;
    },
    []
  );

  const { data, loading, error, page, setPage } = useGetGallery(fetchPhotos);
  const {
    searchTerm,
    setSearchTerm,
    filteredData = [],
    isSearching,
  } = useSearchGallery(data, 'title');

  const handleNextPage = () => {
    if (data.length > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gallery fade-in">
      <h1 className="mb-6">Photo Gallery</h1>

      {/* Search Input */}
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search images by title..."
          className="w-full py-3 px-4 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        />
      </div>

      {/* Gallery Grid or No Results */}
      {isSearching ? (
        <Loader />
      ) : filteredData && filteredData.length > 0 ? (
        <ErrorBoundary>
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredData.map((photo: PhotoGallery) => (
              <div key={photo.id} className="fade-in">
                <CardGallery photo={photo} />
              </div>
            ))}
          </div>
        </ErrorBoundary>
      ) : (
        <div className="fade-in flex flex-col items-center justify-center mt-12">
          <img
            src={noResults}
            alt="No results found"
            className="max-w-xs md:max-w-md lg:max-w-lg"
          />
          <p className="text-lg text-gray-500 mt-4">
            No results found. Try adjusting your search.
          </p>
        </div>
      )}

      {/* Pagination */}
      <div className="pagination flex justify-center items-center mt-6 gap-4">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        <span className="font-bold">Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};
