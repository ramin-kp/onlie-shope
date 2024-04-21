import React, { useContext, useState } from "react";
import { createContext } from "react";

export const CreateTheme = createContext();
function ThemContextProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  //theme handling
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  return (
    <CreateTheme.Provider value={{ theme, setTheme }}>
      {children}
    </CreateTheme.Provider>
  );
}

const useTheme = () => {
  const { theme, setTheme } = useContext(CreateTheme);
  return { theme, setTheme };
};

export default ThemContextProvider;
export { useTheme };
