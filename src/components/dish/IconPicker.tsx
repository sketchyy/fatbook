import React from "react";
import EmojiPicker, { Categories, EmojiStyle } from "emoji-picker-react";
import { FaChevronDown } from "react-icons/fa";
import { Popover } from "react-tiny-popover";
import { clsx } from "clsx";

type Props = {
  value: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
};

export const IconPicker = ({ value, isLoading, onChange }: Props) => {
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
  const handleEmojiClick = (event: any) => {
    onChange(event.emoji);
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "left", "right"]}
      onClickOutside={() => setIsPopoverOpen(false)}
      content={() => (
        <EmojiPicker
          emojiStyle={EmojiStyle.NATIVE}
          skinTonesDisabled={true}
          categories={[
            {
              category: Categories.FOOD_DRINK,
              name: "Food & Drink",
            },
          ]}
          autoFocusSearch={true}
          // previewConfig={{ showPreview: false }}
          onEmojiClick={handleEmojiClick}
        />
      )}
    >
      <button
        className={clsx("button", { "is-skeleton": isLoading })}
        style={{ width: 68 }}
        type="button"
        onClick={() => setIsPopoverOpen(!isPopoverOpen)}
      >
        <span>{value}</span>
        <span className="icon">
          <FaChevronDown />
        </span>
      </button>
    </Popover>
  );
};
