import React, { useEffect } from "react";

function OrderTable({ products, dispatch }) {
  return (
    <div className="w-full lg:w-2/3">
      {/* table header */}
      <div className="hidden sm:flex items-center justify-between gap-5 mx-5 font-danaBold childe:shrink-0">
        <div className="w-[200px] md:w-[250px] lg:w-auto">محصول</div>
        <div className="!text-right">قیمت</div>
        <div>تعداد</div>
        <div className="">جمع جزء</div>
      </div>
      {/* table body */}
      <div className="divide-y dark:divide-gray-700 childe:py-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 my-10"
          >
            {/* products name */}
            <div className="flex items-center justify-start gap-x-5 w-full sm:w-[350px] 2xl:w-[400px] px-2">
              <img
                src={`images/${product.image}`}
                alt="product-img"
                className="w-16 xl:w-[100px]"
              />
              <p className=" text-right text-sm">{product.title}</p>
            </div>
            <div className="text-center">
              {product.price.toLocaleString()} تومان
            </div>
            {/* button */}
            <div className="flex items-center justify-start w-36 sm:mx-auto px-2">
              {product.quantity >= 1 && (
                <button
                  className={`${
                    product.quantity >= 2
                      ? "bg-gray-500"
                      : "bg-primary-200 hover:bg-red-700"
                  } w-8 h-8 font-danaBold text-white rounded-lg duration-75`}
                  onClick={() =>
                    dispatch({
                      type: "INCREASE",
                      payload: product,
                    })
                  }
                  disabled={product.quantity >= 2}
                >
                  +
                </button>
              )}
              <div className="flex flex-col items-center justify-center w-14 h-12 font-danaBold">
                <span className="font-dana text-base text-zinc-900 dark:text-white">
                  {product.quantity >= 1 && product.quantity}
                </span>
                <span className="font-dana text-sm text-gray-500">
                  {product.quantity >= 2 && "حداکثر"}
                </span>
              </div>
              {product.quantity === 1 && (
                <button
                  className="flex-center w-8 h-8 bg-primary-200 font-dana text-white rounded-lg hover:bg-red-700 duration-75"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE_ITEM",
                      payload: product,
                    })
                  }
                >
                  <svg className="w-4 h-4 text-white">
                    <use href="#trash"></use>
                  </svg>
                </button>
              )}
              {product.quantity > 1 && (
                <button
                  className="w-8 h-8 bg-primary-200 font-danaBold text-white rounded-lg hover:bg-red-700 duration-75"
                  onClick={() =>
                    dispatch({
                      type: "DECREASE",
                      payload: product,
                    })
                  }
                >
                  -
                </button>
              )}
            </div>
            {/* products price */}
            <div className="font-danaBold text-sm text-center text-primary-200">{`${(
              product.price * product.quantity
            ).toLocaleString()} تومان`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderTable;
