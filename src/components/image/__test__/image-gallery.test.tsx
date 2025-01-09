import { render, screen, fireEvent } from "@testing-library/react";
import ImageGallery from "../image-gallery";

const mockImages = [
  { src: "https://example.com/image1.jpg", alt: "Image 1" },
  { src: "https://example.com/image2.jpg", alt: "Image 2" },
  { src: "https://example.com/image3.jpg", alt: "Image 3" },
  { src: "https://example.com/image4.jpg", alt: "Image 4" },
  { src: "https://example.com/image5.jpg", alt: "Image 5" },
  { src: "https://example.com/image6.jpg", alt: "Image 6" },
  { src: "https://example.com/image7.jpg", alt: "Image 7" },
];

describe("ImageGallery Component", () => {
  it("renders visible images correctly", () => {
    render(<ImageGallery images={mockImages} />);

    // First image is large and spans multiple grid cells
    const firstImage = screen.getByAltText("Image 1");
    expect(firstImage).toBeInTheDocument();

    // Remaining images are small grid cells
    const smallImages = mockImages.slice(1, 6).map((img) => img.alt);
    smallImages.forEach((alt) => {
      const imgElement = screen.getByAltText(alt);
      expect(imgElement).toBeInTheDocument();
    });
  });

  it("renders 'See More' button when there are more than 6 images", () => {
    render(<ImageGallery images={mockImages} />);

    const seeMoreButton = screen.getByText("See More");
    expect(seeMoreButton).toBeInTheDocument();
  });

  it("displays all images when 'See More' button is clicked", () => {
    render(<ImageGallery images={mockImages} />);

    // Click "See More"
    const seeMoreButton = screen.getByText("See More");
    fireEvent.click(seeMoreButton);

    // All images should now be visible
    mockImages.forEach((image) => {
      const imgElement = screen.getByAltText(image.alt);
      expect(imgElement).toBeInTheDocument();
    });

    // "Show Less" button should appear
    const showLessButton = screen.getByText("Show Less");
    expect(showLessButton).toBeInTheDocument();
  });

  it("returns to initial state when 'Show Less' button is clicked", () => {
    render(<ImageGallery images={mockImages} />);

    // Click "See More"
    fireEvent.click(screen.getByText("See More"));

    // Click "Show Less"
    fireEvent.click(screen.getByText("Show Less"));

    // Only the first 6 images should be visible again
    const visibleImages = mockImages.slice(0, 6).map((img) => img.alt);
    visibleImages.forEach((alt) => {
      const imgElement = screen.getByAltText(alt);
      expect(imgElement).toBeInTheDocument();
    });

    // Ensure the "See More" button is visible again
    const seeMoreButton = screen.getByText("See More");
    expect(seeMoreButton).toBeInTheDocument();
  });
});
