// @ts-nocheck
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useFetchReklama } from "../components/hooks/useFetch";

function Reklama() {
  const { data: reklamaData } = useFetchReklama();

  return (
    <div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {reklamaData &&
            reklamaData?.map((reklama) => {
              let today = new Date();
              let startsAt = new Date(reklama.startsAt);
              let endsAt = new Date(reklama.endsAt);
              if (reklama.isPublished && startsAt <= today && today <= endsAt) {
                return (
                  <CarouselItem key={reklama._id}>
                    <a
                      href={reklama.targetUrl}
                      target="_blank"
                      className="flex flex-col items-center"
                    >
                      <div className="w-full h-64 cursor-pointer p-2">
                        <img
                          src={reklama.imgUrl}
                          alt={reklama.title}
                          className="w-full object-contain"
                        />
                      </div>
                      <div className="block w-1/5 bg-red-500 hover:bg-red-400 mx-2 px-5 py-3 font-bold text-center text-gray-100 text-xs uppercase transition hover:scale-110">
                        {reklama.buttonMessage.length > 1
                          ? reklama.buttonMessage
                          : "Shop Now!"}
                      </div>
                    </a>
                  </CarouselItem>
                );
              }
            })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default Reklama;
