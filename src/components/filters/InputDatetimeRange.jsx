import React, { useState, useEffect, useRef } from "react";
import { useGridRootProps } from "@mui/x-data-grid";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function InputDatetimeRange(props) {
  const rootProps = useGridRootProps();
  const { item, applyValue, focusElementRef = null } = props;

  // const filterTimeout = useRef();
  // const [filterValueState, setFilterValueState] = useState(item.value);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(filterTimeout.current);
  //   };
  // }, []);

  // useEffect(() => {
  //   const itemValue = item.value ?? [undefined, undefined];
  //   setFilterValueState(itemValue);
  // }, [item.value]);

  const updateFilterValue = (lowerBound) => {
    // console.log("upperBound", upperBound);
    console.log("lowerBound", lowerBound);
    // clearTimeout(filterTimeout.current);
    // setFilterValueState([lowerBound, upperBound]);
    // setFilterValueState(lowerBound);
    applyValue({
      // value: [dayjs(lowerBound).toISOString(), dayjs(upperBound).toISOString()],
      value: dayjs(lowerBound).toISOString(),
      // value: [dayjs(lowerBound).toDate(), dayjs(upperBound).toDate()],
      operator: "between",
    });
  };

  // const handleUpperFilterChange = (value) => {
  //   console.log("value1:", value);
  //   const newUpperBound = value;
  //   updateFilterValue(filterValueState[0], newUpperBound);
  // };
  const handleLowerFilterChange = (value) => {
    console.log("value2:", value);
    const newLowerBound = value;
    // updateFilterValue(newLowerBound, filterValueState[1]);
    updateFilterValue(newLowerBound);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {/* <> */}
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "end",
          height: 60,
          width: "500px",
          pl: "20px",
        }}
      >
        <DatePicker
          value={item.value}
          onChange={(newValue) => {
            console.log(newValue);
            applyValue({
              value: newValue,
              operator: "is",
            });
          }}
        />
      </Box>
    </LocalizationProvider>
    // </>
  );
}

export default InputDatetimeRange;
