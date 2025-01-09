import React from "react";
import Button from "@cps/components/button";
import ImageGallery from "@cps/components/image/image-gallery";

interface ProductDetailsProps {
    product: {
        name: string;
        description: string | null;
        images: { url: string; title?: string | null }[];
        prices: { price: number; currency: string }[];
    };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const { name, description, images, prices } = product;

    const galleryImages = images.map((image) => ({
        src: image.url,
        alt: image.title || "Product image",
    }));

    return (
        <div className="flex flex-col lg:flex-row gap-6 px-6 py-6">
            {/* Product Info */}
            <div className="lg:w-1/3 bg-neutral-light p-4 rounded-lg">
                <h1 >{name}</h1>
                <p >{description}</p>
                <p className="font-semibold mb-2">
                    This amazing product costs:{" "}
                    <span className="text-danger-light">
                        ${prices[0]?.price || "N/A"} {prices[0]?.currency || ""}
                    </span>
                </p>
                <p className="text-neutral">Style: Camera only</p>
                <Button shape="rounded" color="secondary" size="md">
                    Add to cart
                </Button>
            </div>

            {/* Image Gallery */}
            <div className="lg:w-2/3">
                <ImageGallery images={galleryImages} />
            </div>
        </div>
    );
};

export default ProductDetails;
