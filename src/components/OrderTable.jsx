import React from "react";

function OrderTable({ products, dispatch }) {
  return (
    <table>
      <thead className="inline-block grow w-full pb-5 border-b border-gray-300 dark:border-gray-600">
        <tr className="flex items-center justify-between w-full childe:text-center">
          <th className="w-[500px]">محصول</th>
          <th className="w-[130px] !text-right">قیمت</th>
          <th>تعداد</th>
          <th className="w-[150px]">جمع جزء</th>
        </tr>
      </thead>
      <tbody className="w-full">
        {products.map((product) => (
          <tr
            key={product.id}
            className="flex items-center justify-between gap-5 my-10"
          >
            <td className="flex items-center justify-start gap-x-5 px-2 w-[500px]">
              <img
                src={`images/${product.image}`}
                alt="product-img"
                className="w-[100px]"
              />
              <p className="text-sm">{product.title}</p>
            </td>
            <td className="w-[130px]">
              {product.price.toLocaleString()} تومان
            </td>
            {/* button */}
            <td className="flex items-center justify-start px-2">
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
            </td>
            <td className="w-[150px] px-2 font-danaBold text-center text-primary-200">{`${(
              product.price * product.quantity
            ).toLocaleString()} تومان`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrderTable;
