const filterProducts = async (products, query) => {
  if (!query || query === "default") return products;
  if (query === "Inexpensive") {
    const inexpensiveProducts = await products.slice().sort((a, b) => a.price - b.price);
    return inexpensiveProducts;
  }
  if (query === "Expensive") {
    const expensiveProducts = await products.slice().sort((a, b) => b.price - a.price);
    return expensiveProducts;
  }
};

export { filterProducts };
