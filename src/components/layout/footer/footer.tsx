import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-light p-6 rounded-lg mt-auto">
  {/* Footer Title */}
  <div className="flex justify-between items-center">
    <div className="flex flex-col">
      <h2 className="text-xl text-left font-bold mb-4 ">Compustore</h2>
      <h3 className="text-xl mb-6">About us</h3>
      <div className="flex flex-col text-left gap-4 mb-8">
        <a href="#" className="text-blue-600 hover:underline">Socials</a>
        <a href="#" className="text-blue-600 hover:underline">Store</a>
        <a href="#" className="text-blue-600 hover:underline">Contact</a>
      </div>
    </div>

    {/* Image Grid Section */}
    <div className="grid grid-cols-3 max-width height-auto gap-4 w-2/4">
      <Image
      src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg"
            alt="Laptop"
            width={600}
        height={400}
      className="w-full h-auto object-cover rounded-lg"
      loading="lazy"
      />
      <Image
        src="https://images.pexels.com/photos/3910542/pexels-photo-3910542.jpeg"
        alt="Camera"
        width={600}
        height={400}
            className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
     <Image
        src="https://images.pexels.com/photos/14438772/pexels-photo-14438772.jpeg"
        alt="electronic gadgets"
        width={600}
        height={400}
        className="w-full h-auto object-cover rounded-lg"
      />
    
      <Image
        src="https://m.media-amazon.com/images/I/51-X+HBW4JL.jpg"
        alt="Virtual reality lenses"
        width={600}
        height={400}
            className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
    
      <Image
        src="https://s.alicdn.com/@sc04/kf/H78a32345f07849db8a5b293f6ddf6e84M.jpg_720x720q50.jpg"
            alt="smart watch"
            width={600}
        height={400}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
            
      <Image
        src="https://assets2.razerzone.com/images/pnx.assets/eacc83c0643ed2da8c9e98968f8aa215/headset-landingpg-500x500-barracuda.jpg"
            alt="headset"
            width={600}
        height={400}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <Image
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwwEUGDBT6nX3S5IhXzI9PMzTgJWoRBHyuXg&s"
            alt="earbuds"
            width={600}
        height={400}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <Image
        src="https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="i-phones, ipads"
            width={600}
        height={400}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
      <Image
        src="https://images.pexels.com/photos/1422223/pexels-photo-1422223.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="electronic gadgets"
            width={600}
        height={400}
        className="w-full h-auto object-cover rounded-lg"
        loading="lazy"
      />
    </div>
  </div>
</footer>

  );
};

export default Footer;
