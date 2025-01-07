'use client'
import React, { useState } from "react";
import Button from "../button";
import Image from "next/image";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [showAll, setShowAll] = useState(false);

  // Determine the visible images
  const visibleImages = showAll ? images : images.slice(0, 6);

  return (
    <div className="relative">
      {/* Image grid with no spacing */}
      <div className="grid grid-cols-3 grid-rows-2 w-full max-w-lg">
        {/* First (large) image */}
        {visibleImages.slice(0, 1).map((image, idx) => (
          <div key={idx} className="col-span-2 row-span-2">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Smaller images */}
        {visibleImages.slice(1).map((image, idx) => (
          <div
            key={idx}
            className={`col-span-1 row-span-1 relative ${idx === 5 && !showAll && images.length > 5
              ? "blur-sm"
              : ""
              }`}
          >
            <Image
              src="https://www.dpreview.com/files/p/articles/6269402639/canon_eosr8.jpeg"
              width={100}
              height={100}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* "Show More" button overlay */}
            {idx === 4 && !showAll && images.length > 5 && (
              <div
                className="absolute inset-0 flex items-center justify-center">
                <Button
                  shape="rounded" color="secondary" size="md"
                  onClick={() => setShowAll(true)}
                >

                  See More

                </Button>

              </div>
            )}
          </div>
        ))}
      </div>

      {/* "Show Less" button */}
      {showAll && (
        <div>
          <Button
            shape="rounded" color="secondary" size="md"
            onClick={() => setShowAll(false)}
          >
            Show Less
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
