import { createContext, useState, useContext, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [Theme, setTheme] = useState(true);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(JSON.parse(localTheme));
    } else {
      localStorage.setItem("theme", JSON.stringify(Theme));
    }
  }, [Theme]);

  return (
    <ThemeContext.Provider value={{ Theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function UseTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("null value");
  }
  return context;
}
