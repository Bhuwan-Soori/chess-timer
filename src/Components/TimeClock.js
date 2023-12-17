import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimeClock } from "@mui/x-date-pickers/TimeClock";

const TimeClockComponent = () => {
  const [value, setValue] = React.useState(dayjs(new Date()));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeClock
        views={["hours", "minutes"]}
        ampm={false}
        ampmInClock={false}
        openTo="hours"
        value={value}
        timezone="system"
        onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
  );
};

export default TimeClockComponent;
