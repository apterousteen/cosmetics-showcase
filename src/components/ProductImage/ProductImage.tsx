import { Center, Text } from '@mantine/core';
import { useEffect, useState } from 'react';
import { IMAGE_TIMEOUT_MS } from '../../constants/config';
import { texts } from '../../constants/texts';
import classes from './ProductImage.module.css';

type ProductImageProps = {
  src: string;
  alt: string;
};

type ImageStatus = 'loading' | 'loaded' | 'broken';

/** Фото товара. Битая или долго грузящаяся картинка заменяется пастельной плашкой-фолбеком. */
export function ProductImage({ src, alt }: ProductImageProps) {
  const [status, setStatus] = useState<ImageStatus>('loading');
  const showImage = src !== '' && status !== 'broken';

  useEffect(() => {
    if (!showImage || status === 'loaded') return;

    const id = setTimeout(() => setStatus('broken'), IMAGE_TIMEOUT_MS);
    return () => clearTimeout(id);
  }, [showImage, status]);

  return (
    <div className={classes.wrapper}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          className={classes.image}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('broken')}
        />
      ) : (
        <Center className={classes.fallback}>
          <Text>{texts.imageFallback}</Text>
        </Center>
      )}
    </div>
  );
}
