import ImageGallery from './image-gallery';

const images = [
  {
    src: 'https://www.cnet.com/a/img/hub/2024/10/04/78cde514-def7-4ad9-8b2b-1ba727df99dd/laptop-gifts.jpg',
    alt: 'Laptop gifts',
  },
  {
    src: 'https://cdn.mos.cms.futurecdn.net/h7RghmVhRSKgsqSpRCgiL.jpg',
    alt: 'Future tech',
  },
  {
    src: 'https://cdn.mos.cms.futurecdn.net/7PfSvDwjTAb5RKf2c37BeA-1200-80.jpg',
    alt: 'Gaming setup',
  },
  {
    src: 'https://i.pcmag.com/imagery/reviews/07f8FmuWzIKHir2YRAXsK7G-1..v1716757237.jpg',
    alt: 'PC review',
  },
  {
    src: 'https://cdn.mos.cms.futurecdn.net/pyL3b8cis5dcmUvgbe9ygV-1200-80.jpg',
    alt: 'Future tech 2',
  },
  {
    src: 'https://im.chip.de/ii/1/2/6/9/6/6/7/8/4/google_pixel_9-24898d4a98520f32.png?im=AspectCrop%2Csize%3D%281%2C1%29%2Cgravity%3DCenter%3BResize%3D%281200%2C1200%29%2Caspect%3Dfit%3BBackgroundColor%2Ccolor%3Dffffff&hash=76f95a5255174453cb024db2e08fec3d7adc3cef730d2965807ad3aef4c30992',
    alt: 'Future tech 2',
  },
  {
    src: 'https://www.cnet.com/a/img/resize/54ba7346736e4510235388eff2b7dc44537217ef/hub/2024/08/20/3debd650-2aec-4431-ba1a-cf6e3bbc594a/google-pixel-9-4-2.jpg?auto=webp&fit=crop&height=1200&width=1200',
    alt: 'Future tech 2',
  },
];

export default {
  title: 'component/ImageGallery',
  component: ImageGallery,
};

export const Default = () => <ImageGallery images={images} />;
export const SingleImage = () => (
  <ImageGallery
    images={[{ src: 'https://example.com/image.jpg', alt: 'A single image' }]}
  />
);
export const NoImages = () => <ImageGallery images={[]} />;
