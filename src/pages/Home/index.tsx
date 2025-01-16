import { useCallback } from 'react';
import { MagicMotion } from 'react-magic-motion';
import { galleryApi } from '../../api';
import { CardGallery } from '../../components';
import { useGetGallery, useSearchGallery } from '../../hooks';
import { PhotoGallery } from '../../interfaces';

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
  const { searchTerm, setSearchTerm, filteredData } = useSearchGallery(
    data,
    'title'
  );

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="gallery">
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

      {/* Gallery Grid with MagicMotion */}
      <MagicMotion>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredData.map((photo: PhotoGallery) => (
            <CardGallery key={photo.id} photo={photo} />
          ))}
        </div>
      </MagicMotion>

      {/* Pagination */}
      <div className="pagination flex justify-center items-center mt-6 gap-4">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span className="font-bold">Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};
