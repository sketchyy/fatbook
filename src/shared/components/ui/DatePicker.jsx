import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { FaCalendar } from "react-icons/fa";

function DatePicker({ width, withIcon, onChange, ...props }) {
  const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="field">
      <p className={"control" + (withIcon && " has-icons-right")}>
        <input
          className="input"
          style={{ width: width }}
          defaultValue={value}
          onClick={onClick}
          ref={ref}
          readOnly={true}
        />
        {withIcon && (
          <span className="icon is-small is-right">
            <FaCalendar />
          </span>
        )}
      </p>
    </div>
  ));

  return (
    <ReactDatePicker
      onChange={onChange}
      customInput={<ExampleCustomInput />}
      withPortal
      dateFormat="dd MMM yyyy"
      {...props}
    />
  );
}

export default DatePicker;
