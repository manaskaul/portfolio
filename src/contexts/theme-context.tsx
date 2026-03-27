import { Context, ReactNode, createContext, useEffect, useState } from "react";
import { Theme } from "../enums/theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ThemeContext: Context<any> = createContext(null);

export const ThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const theme = isDarkMode ? Theme.DARK : Theme.LIGHT;
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme])


  return <ThemeContext.Provider value={{ theme, toggleTheme }}>
    {children}
  </ThemeContext.Provider>;
};
