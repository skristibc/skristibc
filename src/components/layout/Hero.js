"use client";
import { useEffect, useState } from "react";
import Grid from "./Grid";
import Right from "../icons/right";

const images = [
  "/SUV.jpg", 
  "/hibrid.jpg",
  "/kisbusz.jpg"  
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 6000); 

    return () => clearInterval(intervalId); 
  }, []);

  const handleDotClick = (index) => {
    setCurrentImage(index);
  };

  return (
    <section>
      <div className="bg-primary p-6 flex items-center">
        <div className="text-section w-1/2 pr-12">
          <h1 className="text-white text-4xl font-bold px-12 leading-snug">
            Autóbérlés <br /> egyszerűen az <br /> SK Autó-nál
          </h1>
          <div className="py-6 px-12">
            <button className="flex gap-2 bg-white px-6 py-4 font-semibold text-primary rounded-full">
              Kínálat megtekintése
              <Right />
            </button>
          </div>
        </div>
        <div className="image-section w-1/2 mr-64 mb-12">
          <div className="relative">
            <img
              src={images[currentImage]}
              alt="Car Image"
              className="w-[80%] h-auto rounded-lg mx-auto"
            />
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2.5 h-2.5 rounded-full cursor-pointer ${currentImage === index ? "bg-primary" : "bg-gray-300"}`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Grid />
      </div>
    </section>
  );
}
