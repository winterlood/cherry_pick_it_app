import React, {useState, useEffect} from 'react';
import {ImageBackground} from 'react-native';

const ImageBackgroundWithError = ({children, style, success, fail}) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <ImageBackground
      resizeMode={'cover'}
      style={style}
      source={imageLoading ? success : fail}
      onError={() => {
        setImageLoading(false);
      }}>
      {children}
    </ImageBackground>
  );
};

export default ImageBackgroundWithError;
