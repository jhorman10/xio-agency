import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react';

import { useNavigate } from 'react-router-dom';
import fallbackImage from '../../assets/img/no-img.webp';
import { PhotoGallery } from '../../interfaces';

interface PhotoCardProps {
  photo: PhotoGallery;
}

export const CardGallery = ({ photo }: PhotoCardProps) => {
  // const { imageUrl } = useGetImg(photo);
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/detail/${photo.id}`);
  };

  return (
    <Card className="card-gallery py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{photo.title}</p>
        <small className="text-default-500">Album # {photo.albumId}</small>
        <h4 className="font-bold text-large">'Daily Mix' - {photo.id}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt={photo.title || 'Card background'}
          className="object-cover rounded-xl"
          src={fallbackImage}
          width={270}
        />
      </CardBody>
      <CardFooter className="flex justify-end align-bottom mt-6">
        <Button
          className="text-tiny text-white bg-slate-800"
          color="default"
          radius="lg"
          size="sm"
          variant="flat"
          onClick={handleViewMore}
        >
          Show more{' '}
        </Button>
      </CardFooter>
    </Card>
  );
};
