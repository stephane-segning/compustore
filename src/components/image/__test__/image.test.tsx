import { render, screen } from "@testing-library/react";
import Image from "../image";

describe("Image Component", () => {
  it("renders an image with the correct src and alt attributes", () => {
    const src = "https://example.com/image.jpg";
    const alt = "Example Image";

    render(<Image src={src} alt={alt} />);

    const imgElement = screen.getByRole("img", { name: alt });
    expect(imgElement).toHaveAttribute("src", src);
    expect(imgElement).toHaveAttribute("alt", alt);
  });

  it("applies default styling", () => {
    const src = "https://example.com/image.jpg";
    const alt = "Example Image";

    render(<Image src={src} alt={alt} />);

    const imgElement = screen.getByRole("img", { name: alt });
    expect(imgElement).toHaveClass("w-64 h-auto object-contain");
  });
});
