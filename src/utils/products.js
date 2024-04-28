const filterProducts = (products, query) => {
  if (!query || query === "default") return products;
  if (query === "Inexpensive") {
    const inexpensiveProducts = products.sort((a, b) => a.price - b.price);
    return inexpensiveProducts;
  }
  if (query === "Expensive") {
    const expensiveProducts = products.sort((a, b) => b.price - a.price);
    return expensiveProducts;
  }
};

export { filterProducts };
