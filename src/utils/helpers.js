const setBrandName = (name) => {
  let newName = null;
  if (name === "snowa") newName = "اسنوا";
  if (name === "pars-khazar") newName = "پارس خزر";
  if (name === "g-plus") newName = "جی پلاس";
  if (name === "samsung") newName = "سامسونگ";
  return newName;
};

const sumProducts = (products) => {
  const itemCounter = products.reduce(
    (counter, product) => counter + product.quantity,
    0
  );
  const total = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  return {
    itemCounter,
    total,
  };
};

const quantityCount = (state, data) => {
  const product = state.selectedItems.find((product) => product.id === data?.id);
  if (!product) {
    return false;
  } else {
    return product.quantity;
  }
};

export { setBrandName, sumProducts, quantityCount };
