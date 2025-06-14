// ThemeProvider.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { themes, Theme } from "./theme";

interface ThemeContextProps {
  theme: Theme;
  //   switchTheme: (newTheme: string) => void;
  themeName: string;
  setThemeName: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>("dark");
  const [disabled, setDisabled] = useState<boolean>(false);

  const theme = themes[themeName];
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("themeName") || "dark";
      setThemeName(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Lưu themeName vào localStorage bất cứ khi nào thay đổi
      localStorage.setItem("themeName", themeName);
    }
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{ theme, themeName, setThemeName, disabled, setDisabled }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
