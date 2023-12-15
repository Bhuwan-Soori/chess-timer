import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch } from "react-redux";
import { setTime1, setTime2 } from "../Redux/chessTimerSlice";

const useStyles = makeStyles({
  content: {
    padding: "20px 30px !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
  },
});

const SelectTime = ({
  open,
  setOpen,
  topTime,
  setTopTime,
  bottomTime,
  setBottomTime,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // convert top time to viewable format
  let defaultTopTime = new Date();
  defaultTopTime.setMinutes(Math.floor((topTime % 3600) / 60));
  defaultTopTime.setSeconds(topTime % 60);

  //   convert bottom time to viewable format
  let defaultBottomTime = new Date();
  defaultBottomTime.setMinutes(Math.floor((bottomTime % 3600) / 60));
  defaultBottomTime.setSeconds(bottomTime % 60);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => setOpen(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle variant="body1" component="p">
        {"Set Timer"}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <TimePicker
            label={"White"}
            ampm={false}
            value={dayjs(defaultTopTime)}
            onChange={(value, context) => {
              let date = new Date(value);
              let minutes = date.getMinutes();
              let seconds = date.getSeconds();
              if (!isNaN(minutes) && !isNaN(seconds)) {
                let fullSeconds = minutes * 60 + seconds;
                dispatch(setTime1(fullSeconds));
                setTopTime(fullSeconds);
              }
            }}
            views={["minutes", "seconds"]}
            format="mm:ss"
          />
          <TimePicker
            label={"Black"}
            ampm={false}
            value={dayjs(defaultBottomTime)}
            onChange={(value, context) => {
              let date = new Date(value);
              let minutes = date.getMinutes();
              let seconds = date.getSeconds();
              if (!isNaN(minutes) && !isNaN(seconds)) {
                let fullSeconds = minutes * 60 + seconds;
                setBottomTime(fullSeconds);
                dispatch(setTime2(fullSeconds));
              }
            }}
            views={["minutes", "seconds"]}
            format="mm:ss"
          />
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(false)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelectTime;
