const setBrandName = (name) => {
  let newName = null;
  if (name === "snowa") newName = "اسنوا";
  if (name === "pars-khazar") newName = "پارس خزر";
  if (name === "g-plus") newName = "جی پلاس";
  if (name === "samsung") newName = "سامسونگ";
  return newName;
};

export { setBrandName };
