import React from "react";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

const LoneImage: React.FC<ImageProps> = ({ src, alt }) => {
  return <Image
    src={src} alt={alt}
    width={70}
    height={300}
    className="w-64 h-auto object-contain" />;
};

export default LoneImage;
