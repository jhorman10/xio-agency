import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import { GalleryProvider } from './context';
import { Detail, Home } from './pages';

function App() {
  return (
    <GalleryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </Router>
    </GalleryProvider>
  );
}

export default App;
