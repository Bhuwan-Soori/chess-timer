import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
  setTime1,
  setTime2,
  setGameMode,
  setTime,
} from "../Redux/chessTimerSlice";

const useStyles = makeStyles({
  title: {
    color: "#2e7d32",
  },
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
  whiteTime,
  setWhiteTime,
  blackTime,
  setBlackTime,
  setEditTimer,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const gameMode = useSelector((state) => state.chessTimer.gameMode);
  const time = useSelector((state) => state.chessTimer.time);
  // convert top time to viewable format
  let defaultWhiteTime = new Date();
  defaultWhiteTime.setMinutes(Math.floor((whiteTime % 3600) / 60));
  defaultWhiteTime.setSeconds(whiteTime % 60);

  // convert bottom time to viewable format
  let defaultBlackTime = new Date();
  defaultBlackTime.setMinutes(Math.floor((blackTime % 3600) / 60));
  defaultBlackTime.setSeconds(blackTime % 60);

  const handleClose = () => {
    if (whiteTime === 0 || blackTime === 0) {
      alert("Time should not be zero.");
    } else {
      setEditTimer(false);
      setOpen(false);
    }
  };
  return (
    <Dialog
      open={open}
      keepMounted
      disableEscapeKeyDown={true}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle variant="h5" component="h5" className={classes.title}>
        Set Timer
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
                    value={dayjs(defaultWhiteTime)}
                    onChange={(value, context) => {
                      let date = new Date(value);
                      let minutes = date.getMinutes();
                      let seconds = date.getSeconds();
                      if (!isNaN(minutes) && !isNaN(seconds)) {
                        let fullSeconds = minutes * 60 + seconds;
                        dispatch(setTime1(fullSeconds));
                        setWhiteTime(fullSeconds);
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
                    value={dayjs(defaultBlackTime)}
                    onChange={(value, context) => {
                      let date = new Date(value);
                      let minutes = date.getMinutes();
                      let seconds = date.getSeconds();
                      if (!isNaN(minutes) && !isNaN(seconds)) {
                        let fullSeconds = minutes * 60 + seconds;
                        setBlackTime(fullSeconds);
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
              fullWidth
              select
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
                onChange={(e) => {
                  dispatch(setTime(e.target.value));
                }}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="success" onClick={handleClose}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default React.memo(SelectTime);
