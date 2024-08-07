// @ts-nocheck
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
// import { addDays, format } from "date-fns/fp";
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

              console.log("today: ", today);
              console.log("starts at: ", startsAt);
              console.log("after starts at: ", today >= startsAt);
              console.log("ends at: ", endsAt);
              console.log("before ends at: ", today <= endsAt);

              if (reklama.isPublished && startsAt <= today && today <= endsAt) {
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
              }
            })}
        </CarouselContent>

        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}

export default Reklama;
