import React, { createContext, useContext, useEffect, useState } from 'react';
import { PhotoGallery } from '../interfaces';

interface GalleryContextProps {
  data: PhotoGallery[];
  setData: React.Dispatch<React.SetStateAction<PhotoGallery[]>>;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const GalleryContext = createContext<GalleryContextProps | undefined>(
  undefined
);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<PhotoGallery[]>(() => {
    const savedData = localStorage.getItem('galleryData');
    return savedData ? JSON.parse(savedData) : [];
  });

  const [page, setPage] = useState<number>(() => {
    const savedPage = localStorage.getItem('galleryPage');
    return savedPage ? JSON.parse(savedPage) : 1;
  });

  const limit = 10;

  // Persistir datos y página en localStorage
  useEffect(() => {
    localStorage.setItem('galleryData', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('galleryPage', JSON.stringify(page));
  }, [page]);

  return (
    <GalleryContext.Provider value={{ data, setData, page, setPage, limit }}>
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
