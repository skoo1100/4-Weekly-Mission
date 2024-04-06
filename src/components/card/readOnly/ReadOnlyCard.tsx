import { useState } from 'react';
import Card from '@/components/card/Card';
import CardContent from '@/components/card/content/CardContent';
import CardImage from '@/components/card/image/CardImage';
import Link from 'next/link';

type ReadOnlyCardType = {
  url: string;
  image_source: string;
  title: string;
  elapsedTime: string;
  description: string;
  created_at: string;
};

const ReadOnlyCard = ({
  url,
  image_source,
  title,
  elapsedTime,
  description,
  created_at,
}: ReadOnlyCardType) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Card onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        <CardImage imageSource={image_source} alt={title} isZoomedIn={isHovered} />
        <CardContent
          elapsedTime={elapsedTime}
          description={description}
          createdAt={created_at}
          isHovered={isHovered}
        />
      </Card>
    </Link>
  );
};

export default ReadOnlyCard;
