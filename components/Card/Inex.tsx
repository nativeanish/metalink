import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
export default function BrutalistCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: "https://arweave.net/3TbKmzw8O5szqsseQ5JJm6GOqTgGvMssziZiFsG5Td8",
      title: "@sam",
    },
    {
      url: "https://arweave.net/BOL0TL9IqEJ58njnqx9d6BAYA7LSvhyg2UC2l9wGUtk",
      title: "@vilenarios",
    },
    {
      url: "https://arweave.net/oAe1LFz603ubAo3FxiEjigWE9xtSq-zWrmmUEVRtiRA",
      title: "@kemp",
    },
    {
      url: "https://arweave.net/rFQEWD7sBAohQ-dG_yXbsb7ZRKRSUomFDn_LWnShr48",
      title: "@sendao",
    },
    {
      url: "https://arweave.net/ty7qCEb-UbpmSqg6m9HCOXTxy-loClvVXWCen8S8Pbw",
      title: "@rohit",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden ">
      {/* Main carousel container */}
      <div className="relative h-[70vh] w-full max-w-7xl mx-auto">
        {/* Images container */}
        <div className="relative h-full flex items-center justify-center">
          {/* Previous images */}
          <div className="absolute left-0 transform -translate-x-[65%] scale-75 opacity-50 z-0 hidden md:block">
            <CarouselImage
              src={
                images[(currentIndex - 1 + images.length) % images.length].url
              }
              title={
                images[(currentIndex - 1 + images.length) % images.length].title
              }
            />
          </div>

          {/* Current image */}
          <div className="relative z-10 transform transition-all duration-500 ease-in-out">
            <CarouselImage
              src={images[currentIndex].url}
              title={images[currentIndex].title}
            />
          </div>

          {/* Next images */}
          <div className="absolute right-0 transform translate-x-[65%] scale-75 opacity-50 z-0 hidden md:block">
            <CarouselImage
              src={images[(currentIndex + 1) % images.length].url}
              title={images[(currentIndex + 1) % images.length].title}
            />
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black text-yellow-400 p-4 hover:bg-yellow-400 hover:text-black border-4 border-black transition-colors z-20"
          aria-label="Previous slide"
        >
          <FaArrowLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black text-yellow-400 p-4 hover:bg-yellow-400 hover:text-black border-4 border-black transition-colors z-20"
          aria-label="Next slide"
        >
          <FaArrowRight className="w-8 h-8" />
        </button>
      </div>

      {/* Mobile dots navigation */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 border-2 border-black ${
              index === currentIndex ? "bg-black" : "bg-yellow-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselImage({ src, title }: { src: string; title: string }) {
  return (
    <div className="relative group">
      <div className="relative aspect-[9/18] w-[280px] md:w-[320px] md:aspect-[9/18] border-8 border-black">
        <a href={`https://${title}_metalinks.ar.io`} target="_blank">
          <img
            src={src || "/placeholder.svg"}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </a>
      </div>
      <div className="absolute -bottom-4 -right-4 bg-black text-yellow-400 px-4 py-2 font-mono text-lg transform transition-transform group-hover:translate-x-2 group-hover:translate-y-2">
        {title}
      </div>
    </div>
  );
}
