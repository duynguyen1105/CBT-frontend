import React, { forwardRef } from 'react';
import { Image as MImage, ImageProps } from '@mantine/core';
import useTranslate from 'hooks/useTranslate';

const Image = forwardRef<HTMLImageElement, ImageProps>(
  function Image(props, ref) {

    const { alt = '', ...rest } = props;
    const imgAlt = useTranslate(alt) as string;

    return (
      <MImage {...rest} ref={ref} alt={imgAlt} />
    );
  }
);

Image.displayName = 'Image';

export type { ImageProps };
export default Image;
