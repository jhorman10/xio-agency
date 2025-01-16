import { Card, CardBody, CardHeader, Image } from '@nextui-org/react';
import { PhotoGallery } from '../../interfaces';

interface PhotoCardProps {
  photo: PhotoGallery;
}

export default function App({ photo }: PhotoCardProps) {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">
          {photo.title || 'Daily Mix'}
        </p>
        <small className="text-default-500">almbum # {photo.albumId}</small>
        <h4 className="font-bold text-large">
          {photo.albumId || 'Frontend Radio'}
        </h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={photo.title || 'Card background'}
          className="object-cover rounded-xl"
          src={'https://nextui.org/images/hero-card-complete.jpeg' || photo.url}
          width={270}
        />
      </CardBody>
    </Card>
  );
}
