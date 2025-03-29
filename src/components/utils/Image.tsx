import React from "react";

interface ImageProps {
  src: string;
  alt: string;
}

export const Image: React.FC<ImageProps> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={(e) => {
        (e.target as HTMLImageElement).src = "src/assets/img.png";
      }}
    />
  );
};
