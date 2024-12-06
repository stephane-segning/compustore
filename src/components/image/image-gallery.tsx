import React, { useState } from "react";

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
            className={`col-span-1 row-span-1 relative ${
              idx === 5 && !showAll && images.length > 5
                ? "blur-sm"
                : ""
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {/* "Show More" button overlay */}
            {idx === 4 && !showAll && images.length > 5 && (
              <div
                className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
                onClick={() => setShowAll(true)}
              >
                <div className="bg-white px-2 py-1 rounded-lg text-black text-sm">
                  See More
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* "Show Less" button */}
      {showAll && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
