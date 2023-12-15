import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SelectTime from "./SelectTime";

const useStyles = makeStyles({
  root: {
    background: "#fafafa",
    color: "white",
    height: "100vh",
    margin: "0px !important",
  },
  item: {
    padding: "5px 20px",
  },
  topBox: {
    color: "#434343",
    height: "40vh",
    background: "#f2f2f2",
    border: "1px solid #ddd",
    boxShadow: "2px 2px 20px #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
    opacity: "0.8",
    pointerEvents: "none",
  },
  bottomBox: {
    color: "#f2f2f2",
    height: "40vh",
    background: "#434343",
    border: "1px solid #ddd",
    boxShadow: "2px 2px 20px #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
    opacity: "0.8",
    pointerEvents: "none",
  },
  selectedBox: {
    color: "#f2f2f2",
    height: "40vh",
    background: "green",
    border: "1px solid #ddd",
    boxShadow: "2px 2px 20px #ddd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
  },
  controllers: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "6px",
  },
});

const ChessTimer = () => {
  const classes = useStyles();
  const time1 = useSelector((state) => state.chessTimer.time1);
  const time2 = useSelector((state) => state.chessTimer.time2);

  const [openMenu, setOpenMenu] = useState(false);
  const [topTime, setTopTime] = useState(time1);
  const [bottomTime, setBottomTime] = useState(time2);
  const [decreaseTopTime, setDecreaseTopTime] = useState(false);
  const [decreaseBottomTime, setDecreaseBottomTime] = useState(false);

  const formattedTime = useCallback((time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours > 0 ? `${hours}:` : "";
    const formattedMinutes = `${minutes.toString().padStart(2, "0")}:`;
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
  }, []);

  const handleStart = useCallback(() => {
    setDecreaseTopTime(true);
  }, []);

  const handleReset = useCallback(() => {
    setTopTime(time1);
    setBottomTime(time2);
    setDecreaseTopTime(false);
    setDecreaseBottomTime(false);
  }, [time1, time2]);

  const handleTopBox = useCallback(() => {
    setDecreaseTopTime(false);
    setDecreaseBottomTime(true);
  }, []);

  const handleBottomBox = useCallback(() => {
    setDecreaseBottomTime(false);
    setDecreaseTopTime(true);
  }, []);

  useEffect(() => {
    let timer;
    if (decreaseTopTime) {
      timer = setTimeout(() => {
        setTopTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (decreaseBottomTime) {
      timer = setTimeout(() => {
        setBottomTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [decreaseTopTime, topTime, decreaseBottomTime, bottomTime]);

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={classes.root}
      >
        <Grid item xs={12} className={classes.item}>
          <Box
            className={!decreaseTopTime ? classes.topBox : classes.selectedBox}
            onClick={handleTopBox}
          >
            <Typography variant="h1">{formattedTime(topTime)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Box className={classes.controllers}>
            <Button
              variant="contained"
              color="success"
              onClick={handleStart}
              disabled={decreaseTopTime || decreaseBottomTime}
            >
              Start
            </Button>
            <Button variant="contained" color="error" onClick={handleReset}>
              Reset
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => setOpenMenu(true)}
            >
              Time
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Box
            className={
              !decreaseBottomTime ? classes.bottomBox : classes.selectedBox
            }
            onClick={handleBottomBox}
          >
            <Typography variant="h1">{formattedTime(bottomTime)}</Typography>
          </Box>
        </Grid>
      </Grid>
      {openMenu && (
        <SelectTime
          open={openMenu}
          setOpen={setOpenMenu}
          topTime={topTime}
          setTopTime={setTopTime}
          bottomTime={bottomTime}
          setBottomTime={setBottomTime}
        />
      )}
    </>
  );
};

export default ChessTimer;
