import React, { Children, CSSProperties, ReactNode, useRef } from "react";

interface AccordionItemProps {
  title: ReactNode;
  selected?: boolean;
  className: string;
  selectedClassName?: string;
  selectedStyle?: CSSProperties;
  onToggle?: () => void;
  children: ReactNode;
}

export function AccordionItem({
  title,
  selected,
  onToggle,
  children,
  className,
  selectedClassName,
  selectedStyle,
}: AccordionItemProps) {
  const contentEl = useRef<HTMLDivElement>(null);
  const selectedClass = selected ? selectedClassName : "";

  return (
    <div
      className={"accordion-item " + className + " " + selectedClass}
      style={selected ? selectedStyle : { width: "100%", marginLeft: "0%" }}
    >
      <div className="accordion-title" onClick={onToggle}>
        <div>{title}</div>
      </div>
      <div
        className="accordion-content"
        ref={contentEl}
        style={
          selected
            ? {
                maxHeight: contentEl.current!.scrollHeight + 100,
                opacity: 1,
              }
            : { maxHeight: "0px", opacity: 0 }
        }
      >
        {children}
      </div>
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
