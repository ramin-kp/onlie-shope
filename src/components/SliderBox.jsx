import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";

function valuetext(value) {
  return value;
}
export default function SliderBox({ price, setPrice, priceHandler }) {
  return (
    <Box className="w-full px-2">
      <Slider
        getAriaLabel={() => "price"}
        value={price}
        onChange={priceHandler}
        getAriaValueText={valuetext}
        min={0}
        max={100000000}
        className="text-primary-200"
      />
      <div className="flex items-center justify-between w-full px-px py-3 font-dana font-bold text-center text-sm">
        <span>{price[1].toLocaleString()} تومان</span>
        <span>{price[0].toLocaleString()} تومان</span>
      </div>
    </Box>
  );
}
