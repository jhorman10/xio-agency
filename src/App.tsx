import { useCallback } from 'react';
import './App.css';
import { galleryApi } from './api';
import reactLogo from './assets/react.svg';
import { useGetGallery } from './hooks';
import useSearchGallery from './hooks/useSearchGallery';
import { PhotoGallery } from './interfaces';
import viteLogo from '/vite.svg';

function App() {
  const fetchPhotos = useCallback(
    (page: number, limit: number) =>
      galleryApi.get<PhotoGallery[]>('/photos', {
        params: { _page: page, _limit: limit },
      }),
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
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Photo Gallery</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search images by title..."
        className="search-bar"
      />
      <ul>
        {filteredData.map((photo) => (
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

export default App;
