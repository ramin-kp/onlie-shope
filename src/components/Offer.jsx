import React, { useEffect, useState } from "react";

import SectionHeader from "./SectionHeader";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import SliderCard from "./SliderCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "swiper/css";
import "swiper/css/pagination";

function Offer({ response }) {
  const { data: productData, isPending, isError, error } = response;
  const [data, setData] = useState([]);

  useEffect(() => {
    const productsFilter = async () => {
      const dataFilter = await productData?.data.filter(
        (item) => item.offer?.discount > 0
      );
      setData(dataFilter);
    };
    productsFilter();
  }, [productData]);
  return (
    <section>
      <SectionHeader
        title={"محصولات در تخفیف"}
        href={["همه محصولات", "/offers"]}
      />
      <>
        <Swiper
          modules={[Virtual, Navigation, Pagination]}
          slidesPerView={2}
          spaceBetween={100}
          navigation={true}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 50 },
            640: { slidesPerView: 2, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 50 },
          }}
        >
          {data &&
            data.map((item, index) => (
              <SwiperSlide key={item.id} virtualIndex={index}>
                <SliderCard data={item} />
              </SwiperSlide>
            ))}
        </Swiper>

        {/* <Swiper

      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper> */}
      </>
    </section>
  );
}

export default Offer;
