import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SelectTime from "./SelectTime";
import clickSound from "../assets/click-sound.mp3";
import beepSound from "../assets/beep-sound.mp3";
import finalBeepSound from "../assets/final-beep-sound.mp3";

const useStyles = makeStyles({
  root: {
    background: "#fafafa",
    color: "white",
    height: "100vh",
    margin: "0px !important",
  },
  item: {
    padding: "5px",
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
  lessTimeBox: {
    color: "white",
    height: "40vh",
    background: "#d9534f",
    border: "1px solid #d9534f",
    boxShadow: "2px 2px 20px #444",
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
  const dispatch = useDispatch();
  const time1 = useSelector((state) => state.chessTimer.time1);
  const time2 = useSelector((state) => state.chessTimer.time2);
  const gameMode = useSelector((state) => state.chessTimer.gameMode);
  const time = useSelector((state) => state.chessTimer.time);

  const [openMenu, setOpenMenu] = useState(false);
  const [topTime, setTopTime] = useState(time1);
  const [bottomTime, setBottomTime] = useState(time2);
  const [decreaseTopTime, setDecreaseTopTime] = useState(false);
  const [decreaseBottomTime, setDecreaseBottomTime] = useState(false);
  const [lessTopTime, setLessTopTime] = useState(false);
  const [lessBottomTime, setLessBottomTime] = useState(false);

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
    if (gameMode === "default") {
      if (topTime >= 10) {
        new Audio(clickSound).play();
      } else if (topTime > 0 && topTime <= 9) {
        new Audio(beepSound).play();
      }
    } else if (gameMode === "increment") {
      if (topTime >= 10) {
        new Audio(clickSound).play();
      } else if (topTime > 0 && topTime <= 9) {
        new Audio(beepSound).play();
      }
      setTopTime((prevTime) => prevTime + Number(time));
    } else if (gameMode === "decrement") {
      if (topTime >= 10) {
        new Audio(clickSound).play();
      } else if (topTime > 0 && topTime <= 9) {
        new Audio(beepSound).play();
      }
      if (topTime > Number(time)) {
        setTopTime((prevTime) => prevTime - Number(time));
      } else if (topTime <= time) {
        setTopTime(0);
      }
    }
  }, [topTime, gameMode, time]);

  const handleBottomBox = useCallback(() => {
    setDecreaseBottomTime(false);
    setDecreaseTopTime(true);
    if (gameMode === "default") {
      if (bottomTime >= 10) {
        new Audio(clickSound).play();
      } else if (bottomTime > 0 && bottomTime <= 9) {
        new Audio(beepSound).play();
      }
    } else if (gameMode === "increment") {
      if (bottomTime >= 10) {
        new Audio(clickSound).play();
      } else if (bottomTime > 0 && bottomTime <= 9) {
        new Audio(beepSound).play();
      }
      setBottomTime((prevTime) => prevTime + Number(time));
    } else if (gameMode === "decrement") {
      if (bottomTime >= 10) {
        new Audio(clickSound).play();
      } else if (bottomTime > 0 && bottomTime <= 9) {
        new Audio(beepSound).play();
      }
      if (bottomTime > Number(time)) {
        setBottomTime((prevTime) => prevTime - Number(time));
      } else if (bottomTime <= time) {
        setBottomTime(0);
      }
    }
  }, [bottomTime]);

  const handleDisableStart = () => {
    if (decreaseTopTime || decreaseBottomTime) {
      return true;
    } else if (!decreaseBottomTime || !decreaseTopTime) {
      if (lessTopTime || lessBottomTime) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    let timer;
    if (decreaseTopTime && topTime >= 0) {
      timer = setTimeout(() => {
        setTopTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (decreaseBottomTime && bottomTime >= 0) {
      timer = setTimeout(() => {
        setBottomTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [decreaseTopTime, topTime, decreaseBottomTime, bottomTime]);

  useEffect(() => {
    if (topTime >= 10) {
      setLessTopTime(false);
    } else if (topTime > 0 && topTime <= 9) {
      setLessTopTime(true);
    } else {
      setLessTopTime(true);
      setDecreaseTopTime(false);
      setDecreaseBottomTime(false);
      new Audio(finalBeepSound).play();
    }
    if (bottomTime >= 10) {
      setLessBottomTime(false);
    } else if (bottomTime > 0 && bottomTime <= 9) {
      setLessBottomTime(true);
    } else {
      setLessBottomTime(true);
      setDecreaseBottomTime(false);
      setDecreaseTopTime(false);
      new Audio(finalBeepSound).play();
    }
  }, [
    topTime,
    bottomTime,
    lessTopTime,
    lessBottomTime,
    decreaseBottomTime,
    decreaseTopTime,
  ]);

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
            className={
              !decreaseTopTime
                ? classes.topBox
                : !lessTopTime
                ? classes.selectedBox
                : classes.lessTimeBox
            }
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
              disabled={handleDisableStart()}
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
              !decreaseBottomTime
                ? classes.bottomBox
                : !lessBottomTime
                ? classes.selectedBox
                : classes.lessTimeBox
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
