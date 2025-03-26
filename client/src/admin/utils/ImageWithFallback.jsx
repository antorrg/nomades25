import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, fallbackSrc, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const onError = () => {
    setImgSrc(fallbackSrc);
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={onError}
      className={className}
    />
  );
};

export default ImageWithFallback;


//*    Ejemplos de uso:
//*     <ImageWithFallback
//*     src={user.image}
//*     alt={`Avatar de ${user.nickname}`}
//*     fallbackSrc="/images/default-avatar.png"  // imagen en carpeta public
//*     className=""
//*     /> 