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
            delay: 3000,
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
                    {/* <a href={reklama.targetUrl}> */}
                    <div
                      className="w-full h-60"
                      onClick={() => {
                        if (reklama?.targetUrl) {
                          window.location.href = `${reklama?.targetUrl}`;
                        }
                      }}
                    >
                      <img
                        src={reklama.imgUrl}
                        alt={reklama.title}
                        className="w-full object-contain"
                      />
                    </div>
                    {/* </a> */}
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
