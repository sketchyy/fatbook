import { Theme, useTheme } from "@/context/Theme";
import { clsx } from "clsx";
import React, { useState } from "react";
import { Popover } from "react-tiny-popover";

const themes: Record<Theme, { icon: string; className: string }> = {
  light: { icon: "🌞", className: "has-background-warning" },
  dark: { icon: "🌚", className: "has-background-link" },
  system: { icon: "🖥️", className: "has-background-info" },
};

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const togglePopover = () => {
    setOpen((o) => !o);
  };

  return (
    <Popover
      isOpen={open}
      positions={["bottom", "left", "right"]}
      onClickOutside={() => setOpen(false)}
      containerStyle={{ zIndex: "40", marginTop: "0.5rem" }}
      content={() => (
        <div className="box">
          {Object.entries(themes).map(([name, { icon, className }]) => (
            <button
              key={name}
              style={{ textDecoration: "none" }}
              className={clsx(
                "button is-fullwidth is-text is-justify-content-start",
                {
                  "is-selected": theme === name,
                  [className]: theme === name,
                },
              )}
              onClick={() => setTheme(name as Theme)}
            >
              <span className="icon is-size-4">{icon}</span>
              <span className="is-capitalized">{name}</span>
            </button>
          ))}
        </div>
      )}
    >
      <button className="button is-dark" onClick={togglePopover}>
        <span className="icon is-size-4">{themes[theme].icon}</span>
      </button>
    </Popover>
  );
}
