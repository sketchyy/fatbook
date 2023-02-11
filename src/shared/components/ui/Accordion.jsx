import React, { Children } from "react";
import { animated, useSpring } from "react-spring";

export function AccordionItem({
  title,
  selected,
  onToggle,
  children,
  className,
}) {
  const selectedClass = selected ? " has-background-info-light" : "";

  const openAnimation = useSpring({
    from: { opacity: "0", maxHeight: "0" },
    to: {
      opacity: selected ? "1" : "0",
      maxHeight: selected ? "800px" : "0",
    },
    config: { duration: "300" },
  });

  return (
    <div className={"accordion-item " + className + selectedClass}>
      <div className="accordion-title" onClick={onToggle}>
        <div>{title}</div>
      </div>

      <animated.div style={openAnimation} className="is-clipped">
        {children}
      </animated.div>
    </div>
  );
}

function Accordion({ activeIndex, onTabChange, children }) {
  /* const [selectedIndex, setSelectedIndex] = useState(activeIndex); */

  const toggle = (itemIndex) => {
    if (activeIndex === itemIndex) {
      onTabChange({ index: -1 });
    } else {
      onTabChange({ index: itemIndex });
    }
  };

  const childrenWithProps = Children.map(children, (child, index) => {
    return React.cloneElement(child, {
      ...child.props,
      selected: index === activeIndex,
      onToggle: () => toggle(index),
    });
  });

  return <div className="accordion">{childrenWithProps}</div>;
}

export default Accordion;
