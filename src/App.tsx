import { useCallback } from 'react';
import './App.css';
import { galleryApi } from './api';
import { GalleryProvider } from './context';
import { useGetGallery } from './hooks';
import { PhotoGallery } from './interfaces';

function AppContent() {
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

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <h1>Photo Gallery</h1>
      <ul>
        {data.map((photo) => (
          <li key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </>
  );
}

function App() {
  return (
    <GalleryProvider>
      <AppContent />
    </GalleryProvider>
  );
}

export default App;
