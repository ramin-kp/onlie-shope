const filterProducts = async (products, query) => {
  if (!query || query === "default") return products;
  if (query === "Inexpensive") {
    const inexpensiveProducts = await products
      .slice()
      .sort((a, b) => a.price - b.price);
    return inexpensiveProducts;
  }
  if (query === "Expensive") {
    const expensiveProducts = await products
      .slice()
      .sort((a, b) => b.price - a.price);
    return expensiveProducts;
  }
};
const filterProductBrand = async (products, query) => {
  console.log("query", query);
  if (!query || query === "All") return products;
  const productsFilter = await products?.filter((item) => item.brand === query);
  return productsFilter;
};
const createQueryObject = (currentQuery, newQuery) => {
  if (newQuery.filter === "default") {
    const { filter, ...res } = currentQuery;
    return res;
  }
  if (newQuery.brand === "All") {
    const { brand, ...res } = currentQuery;
    return res;
  }
  return { ...currentQuery, ...newQuery };
};
const getInitialQuery = (searchParams) => {
  const query = {};
  const filter = searchParams.get("filter");
  const brand = searchParams.get("brand");
  if (filter) query.filter = filter;
  if (brand) query.brand = brand;
  return query;
};

export {
  filterProducts,
  filterProductBrand,
  createQueryObject,
  getInitialQuery,
};
