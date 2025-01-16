import './App.css';
import { GalleryProvider } from './context';
import { Home } from './pages';

function App() {
  return (
    <GalleryProvider>
      <Home />
    </GalleryProvider>
  );
}

export default App;
