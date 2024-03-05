import { createContext, useEffect } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { ChildrenProps } from "../../types";

interface ContextValue {
  theme: "light" | "dark";
  changeTheme: () => void;
}

function checkInitialTheme() {
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

export const ThemeContext = createContext<ContextValue | null>(null);

export default function ThemeProvider({ children }: ChildrenProps) {
  const [theme, setTheme] = useLocalStorage<ContextValue["theme"]>(
    "theme",
    checkInitialTheme()
  );

  function changeTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
