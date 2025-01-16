import { useCallback } from 'react';
import { galleryApi } from '../../api';
import CardGallery from '../../components/CardGallery';
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
      <h1>Photo Gallery</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search images by title..."
          className="search-bar"
        />
      </div>
      <div className="gallery-grid  gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredData.map((photo: PhotoGallery) => (
          <CardGallery key={photo.id} photo={photo} />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
};
