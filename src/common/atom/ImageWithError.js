import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';

const ImageWithError = ({style, success, fail}) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Image
      style={style}
      source={imageLoading ? success : fail}
      onError={() => {
        setImageLoading(false);
      }}
    />
  );
};

export default ImageWithError;
