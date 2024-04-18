import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

import { fetchBanners } from "../Services/bannre";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function MainSlider() {
  const queryKey = ["banners-data"];
  const {
    data: bannerData,
    isPending,
    isError,
  } = useQuery({
    queryKey,
    queryFn: fetchBanners,
  });
  console.log({ bannerData, isPending, isError });
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-[300px] lg:h-[400px] bg-primary-200 rounded-lg my-10 mx-2.5 sm:mx-auto group"
      >
        {!!bannerData &&
          bannerData.data.map((item) => (
            <SwiperSlide
              key={item.id}
              className="flex items-center md:items-start justify-between
              p-1 sm:p-4 md:p-8  cursor-pointer"
            >
              <div className="flex flex-col items-start justify-start gap-y-2 md:gap-y-7 mb-10 md:mb-0 md:mt-5 px-2 sm:px-8 text-white childe:text-right">
                <h2 className="font-danaBold text-lg xs:text-xl sm:text-2xl lg:text-3xl leading-10 line-clamp-1 sm:line-clamp-2">
                  {item.title}
                </h2>
                <h3 className=" font-danaMedium text-xs xs:text-sm sm:text-base lg:text-xl leading-6 sm:leading-8 line-clamp-2 sm:line-clamp-3">
                  {item.subTitle}
                </h3>
              </div>
              <img
                src={`/images/${item.image}`}
                className="shrink-0 w-1/3 lg:w-auto h-auto lg:h-full object-contain group-hover:scale-110 duration-500"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}

export default MainSlider;
