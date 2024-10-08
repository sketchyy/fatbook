import React from "react";
import { clsx } from "clsx";
import { nowAsDate } from "@/utils/date-utils";
import dayjs from "dayjs";
import Button from "@/components/ui/Button";

type Props = {
  activeTimespan: TimeSpan | null;
  onChange: (timespan: TimeSpan, range: [Date, Date]) => void;
};

export type TimeSpan = "Week" | "2 Weeks" | "Month";
const timeSpans: TimeSpan[] = ["Week", "2 Weeks", "Month"];

export const TimeSpanSelect = ({ activeTimespan, onChange }: Props) => {
  const handleClick = (timespan: TimeSpan) => {
    let start: Date;

    if (timespan === "Week") {
      start = dayjs().subtract(1, "week").toDate();
    } else if (timespan === "2 Weeks") {
      start = dayjs().subtract(2, "week").toDate();
    } else if (timespan === "Month") {
      start = dayjs().subtract(1, "month").toDate();
    } else {
      start = dayjs().subtract(1, "week").toDate();
    }

    onChange(timespan, [start, nowAsDate()]);
  };

  return (
    <div className="buttons has-addons mb-0">
      {timeSpans.map((timespan) => (
        <Button
          key={timespan}
          type="button"
          className={clsx("mb-0", {
            "is-selected is-primary": activeTimespan === timespan,
          })}
          onClick={() => handleClick(timespan)}
        >
          {timespan}
        </Button>
      ))}
    </div>
  );
};
