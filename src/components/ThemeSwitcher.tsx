import { useTheme } from "@/context/Theme";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button className="button is-dark is-rounded" onClick={toggleTheme}>
      <span className="icon is-size-6">
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </span>
    </button>
  );
}
