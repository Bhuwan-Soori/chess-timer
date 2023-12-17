import React from "react";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { makeStyles } from "@mui/styles";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useDispatch, useSelector } from "react-redux";
import {
  setTime1,
  setTime2,
  setGameMode,
  setTime,
} from "../Redux/chessTimerSlice";

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
  const gameMode = useSelector((state) => state.chessTimer.gameMode);
  const time = useSelector((state) => state.chessTimer.time);
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
      <DialogTitle variant="h5" component="h5">
        {"Set Timer"}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container spacing={2} direction="column" justifyContent="center">
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
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
                </Grid>
                <Grid item xs={6}>
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
                </Grid>
              </Grid>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Game Mode"
              variant="outlined"
              defaultValue={gameMode}
              value={gameMode}
              onChange={(e) => {
                if (e.target.value === "default") {
                  dispatch(setGameMode(e.target.value));
                  dispatch(setTime(0));
                } else {
                  dispatch(setGameMode(e.target.value));
                }
              }}
              fullWidth
              select
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="increment">Increment</MenuItem>
              <MenuItem value="decrement">Decrement</MenuItem>
            </TextField>
          </Grid>
          {gameMode !== "default" && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                id="outlined-basic"
                label="Time"
                value={time}
                variant="outlined"
                onChange={(e) => dispatch(setTime(e.target.value))}
              />
            </Grid>
          )}
        </Grid>
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
