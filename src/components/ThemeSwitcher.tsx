import { Theme, useTheme } from "@/context/Theme";
import { clsx } from "clsx";

const themes: { name: Theme; icon: string }[] = [
  { name: "light", icon: "🌞" },
  { name: "system", icon: "🖥️" },
  { name: "dark", icon: "🌚" },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="buttons has-addons">
      {themes.map(({ name, icon }) => (
        <button
          key={name}
          className={clsx("button is-dark", {
            "is-info is-selected": theme === name,
          })}
          onClick={() => setTheme(name)}
        >
          <span className="icon is-size-4">{icon}</span>
        </button>
      ))}
    </div>
  );
}
