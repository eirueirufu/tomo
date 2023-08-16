import { SunDim, Moon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-center items-center">
      {theme === "light" ? (
        <button onClick={() => setTheme("dark")}>
          <Moon size={32} color="#474747" weight="bold" />
        </button>
      ) : (
        <button onClick={() => setTheme("light")}>
          <SunDim size={32} color="#f2f2f2" weight="bold" />
        </button>
      )}
    </div>
  );
};
