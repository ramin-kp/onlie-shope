import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getProposal } from "../Services/products";
import { Link } from "react-router-dom";

function MainImage() {
  const queryKey = ["proposalData"];
  const { data: proposalData, isPending } = useQuery({
    queryKey,
    queryFn: getProposal,
  });
  return (
    <section
      className="hidden md:inline-block relative main-img lg:bg-center bg-cover xl:bg-contain h-[650px]"
      data-aos="fade-up"
    >
      <div className="absolute inline-flex flex-col items-end justify-end w-full mb-auto childe:px-5 childe:py-3 childe:bg-gray-100 childe:rounded-s-3xl">
        <span className="text-lg font-dana tracking-wider">
          زندگی خود را تجهیز کنید
        </span>
        <span className=" text-xl font-danaBold tracking-wider">
          موارد دلخواه جدید شما اینجا هستند
        </span>
      </div>
      {proposalData && (
        <>
          <Link
            to={`/products/${proposalData.data[0].link}`}
            className="absolute inline-block -translate-x-[500px] lg:-translate-x-[950px] xl:-translate-x-[1100px] translate-y-[450px] cursor-pointer group"
          >
            <span className="absolute w-4 h-4 rounded-full bg-white"></span>
            <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
            <div className="hidden group-hover:inline-block w-[250px] bg-white translate-x-1/2 translate-y-5 rounded-lg">
              <div className="flex items-start justify-between gap-1 px-1.5 py-2">
                <div>
                  <img
                    src={`/images/${proposalData.data[0].image}`}
                    alt="product-img"
                    className="w-[150px]"
                  />
                </div>
                <div>
                  <h2 className="font-danaBold line-clamp-2">
                    {proposalData.data[0].title}
                  </h2>
                  <span className="text-left font-dana">
                    {proposalData.data[0]?.price.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to={`/products/${proposalData.data[1].link}`}
            className="absolute -translate-x-[100px] xl:-translate-x-[200px] translate-y-[350px]  cursor-pointer group"
          >
            <span className="absolute w-4 h-4 rounded-full bg-white"></span>
            <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
            <div className="hidden group-hover:inline-block w-[250px] bg-white rounded-lg translate-x-1/2 translate-y-5">
              <div className="flex items-start justify-between gap-1 px-1.5 py-2">
                <div>
                  <img
                    src={`/images/${proposalData.data[1].image}`}
                    alt="product-img"
                    className="w-[150px]"
                  />
                </div>
                <div>
                  <h2 className="font-danaBold line-clamp-2">
                    {proposalData.data[1].title}
                  </h2>
                  <span className="text-left font-dana">
                    {proposalData.data[1]?.price.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <Link
            to={`/products/${proposalData.data[2].link}`}
            className="absolute -translate-x-[430px] lg:-translate-x-[530px] xl:-translate-x-[650px] translate-y-[350px]  cursor-pointer group"
          >
            <span className="absolute w-4 h-4 rounded-full bg-white"></span>
            <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
            <div className="hidden group-hover:inline-block w-[250px] bg-white rounded-lg translate-x-1/2 translate-y-5">
              <div className="flex items-start justify-between gap-1 px-1.5 py-2">
                <div>
                  <img
                    src={`/images/${proposalData.data[2].image}`}
                    alt="product-img"
                    className="w-[150px]"
                  />
                </div>
                <div>
                  <h2 className="font-danaBold line-clamp-2">
                    {proposalData.data[2].title}
                  </h2>
                  <span className="text-left font-dana">
                    {proposalData.data[2]?.price.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </>
      )}
    </section>
  );
}

export default MainImage;
