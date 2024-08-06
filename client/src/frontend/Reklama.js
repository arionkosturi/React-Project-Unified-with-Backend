// @ts-nocheck
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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
            delay: 10000,
          }),
        ]}
      >
        <CarouselContent>
          {reklamaData?.map((reklama) => {
            return (
              <CarouselItem key={reklama._id}>
                <a href={reklama?.targetUrl}>
                  <div className="w-full h-60">
                    <img
                      src={reklama.imgUrl}
                      alt={reklama.title}
                      className="w-full object-contain"
                    />
                  </div>
                </a>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}

export default Reklama;
