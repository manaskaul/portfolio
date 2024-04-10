import { Context, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Theme } from "../enums/theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThemeContext: Context<any> = createContext(null);

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
