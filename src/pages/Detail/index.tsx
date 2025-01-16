import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react';
import { useNavigate, useParams } from 'react-router-dom';
import fallbackImage from '../../assets/img/no-img.webp';
import { PhotoGallery } from '../../interfaces';

export const Detail = () => {
  const { id } = useParams<{ id: string }>(); // Obtén el parámetro dinámico de la URL
  const navigate = useNavigate();

  const photos: PhotoGallery[] = JSON.parse(
    localStorage.getItem('galleryData') || '[]'
  );
  const photo = photos.find((p) => p.id === Number(id)) || null;

  const handleGoBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  if (!photo) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg font-bold">Photo not found</p>
        <Button onClick={handleGoBack} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="detail-card-gallery flex flex-col items-center px-4 py-8 max-w-3xl mx-auto">
      <Card className="w-full">
        <CardHeader className="flex flex-col items-start p-6">
          <h1 className="text-2xl font-bold">{photo.title}</h1>
          <small className="text-zinc-300">Album # {photo.albumId}</small>
        </CardHeader>
        <CardBody className="flex flex-col items-center p-6">
          <Image
            alt={photo.title || 'Photo'}
            // src={photo.url || fallbackImage}
            src={fallbackImage}
            className="rounded-xl object-cover"
            width="100%"
            height={400}
          />
          <p className="mt-6 text-zinc-300 text-center">
            This photo is part of album <strong>{photo.albumId}</strong>. Below
            are its details:
          </p>
          <ul className="list-disc mt-4 text-left text-zinc-300">
            <li>
              <strong>ID:</strong> {photo.id}
            </li>
            <li>
              <strong>Title:</strong> {photo.title}
            </li>
            <li>
              <strong>Thumbnail:</strong>{' '}
              <a
                href={photo.thumbnailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                View Thumbnail
              </a>
            </li>
          </ul>
        </CardBody>
        <CardFooter className="flex justify-end p-6">
          <Button
            color="default"
            radius="lg"
            size="md"
            variant="flat"
            onClick={handleGoBack}
          >
            Go Back
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
