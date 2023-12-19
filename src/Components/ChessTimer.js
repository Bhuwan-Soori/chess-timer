import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import SelectTime from "./SelectTime";
import clickSound from "../assets/click-sound.mp3";
import beepSound from "../assets/beep-sound.mp3";
import finalBeepSound from "../assets/final-beep-sound.mp3";
import ColorPickerComponent from "./ColorPicker";

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
  whiteBox: {
    height: "45vh",
    border: "1px solid #ddd",
    boxShadow: "2px 2px 20px #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
    opacity: "0.5",
    pointerEvents: "none",
  },
  blackBox: {
    height: "45vh",
    border: "1px solid #ddd",
    boxShadow: "2px 2px 20px #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
    opacity: "0.5",
    pointerEvents: "none",
  },
  selectedBox: {
    height: "45vh",
    opacity: "1",
    border: "1px solid #ddd",
    boxShadow: "2px 2px 20px #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
  },
  lessTimeBox: {
    height: "45vh",
    border: "none",
    boxShadow: "2px 2px 20px #444",
    display: "flex",
    flexDirection: "column",
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
  const gameMode = useSelector((state) => state.chessTimer.gameMode);
  const time = useSelector((state) => state.chessTimer.time);
  const whiteColor = useSelector((state) => state.chessTimer.whiteColor);
  const blackColor = useSelector((state) => state.chessTimer.blackColor);

  const [editTimer, setEditTimer] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [whiteTime, setWhiteTime] = useState(time1);
  const [blackTime, setBlackTime] = useState(time2);
  const [whiteSteps, setWhiteSteps] = useState(0);
  const [blackSteps, setBlackSteps] = useState(0);
  const [decreaseWhiteTime, setDecreaseWhiteTime] = useState(false);
  const [decreaseBlackTime, setDecreaseBlackTime] = useState(false);
  const [lessWhiteTime, setLessWhiteTime] = useState(false);
  const [lessBlackTime, setLessBlackTime] = useState(false);

  const formattedTime = useCallback((time) => {
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const formattedMinutes = `${minutes.toString().padStart(2, "0")}:`;
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedMinutes}${formattedSeconds}`;
  }, []);

  const handleStart = useCallback(() => {
    setDecreaseWhiteTime(true);
  }, []);

  const handleReset = useCallback(() => {
    setWhiteTime(time1);
    setBlackTime(time2);
    setDecreaseWhiteTime(false);
    setDecreaseBlackTime(false);
    setWhiteSteps(0);
    setBlackSteps(0);
  }, [time1, time2]);

  const handleWhiteBox = useCallback(() => {
    setDecreaseWhiteTime(false);
    setDecreaseBlackTime(true);
    setWhiteSteps((prev) => prev + 1);
    if (whiteTime >= 10) {
      new Audio(clickSound).play();
    } else {
      new Audio(beepSound).play();
    }
    if (gameMode === "increment") {
      setWhiteTime((prevTime) => prevTime + Number(time));
    } else if (gameMode === "decrement") {
      if (whiteTime > Number(time)) {
        setWhiteTime((prevTime) => prevTime - Number(time));
      } else if (whiteTime <= time) {
        setWhiteTime(0);
      }
    }
  }, [whiteTime, gameMode, time]);

  const handleBlackBox = useCallback(() => {
    setDecreaseBlackTime(false);
    setDecreaseWhiteTime(true);
    setBlackSteps((prev) => prev + 1);
    if (blackTime >= 10) {
      new Audio(clickSound).play();
    } else {
      new Audio(beepSound).play();
    }
    if (gameMode === "increment") {
      setBlackTime((prevTime) => prevTime + Number(time));
    } else if (gameMode === "decrement") {
      if (blackTime > Number(time)) {
        setBlackTime((prevTime) => prevTime - Number(time));
      } else if (blackTime <= time) {
        setBlackTime(0);
      }
    }
  }, [blackTime, gameMode, time]);

  const handleDisableStart = () => {
    if (decreaseWhiteTime || decreaseBlackTime) {
      return true;
    } else if (!decreaseBlackTime || !decreaseWhiteTime) {
      if (whiteTime === 0 || blackTime === 0) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleDisableTimer = () => {
    if (decreaseWhiteTime || decreaseBlackTime) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    let timer;
    if (decreaseWhiteTime && whiteTime >= 0) {
      timer = setTimeout(() => {
        setWhiteTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (decreaseBlackTime && blackTime >= 0) {
      timer = setTimeout(() => {
        setBlackTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [decreaseWhiteTime, whiteTime, decreaseBlackTime, blackTime]);

  useEffect(() => {
    if (!editTimer) {
      if (whiteTime >= 10) {
        setLessWhiteTime(false);
      } else if (whiteTime > 0 && whiteTime <= 9) {
        setLessWhiteTime(true);
      } else if (whiteTime === 0) {
        setLessWhiteTime(true);
        setDecreaseWhiteTime(false);
        setDecreaseBlackTime(false);
        new Audio(finalBeepSound).play();
      }
      if (blackTime >= 10) {
        setLessBlackTime(false);
      } else if (blackTime > 0 && blackTime <= 9) {
        setLessBlackTime(true);
      } else if (blackTime === 0) {
        setLessBlackTime(true);
        setDecreaseBlackTime(false);
        setDecreaseWhiteTime(false);
        new Audio(finalBeepSound).play();
      }
    }
  }, [
    editTimer,
    whiteTime,
    blackTime,
    lessWhiteTime,
    lessBlackTime,
    decreaseBlackTime,
    decreaseWhiteTime,
  ]);

  useEffect(() => {
    let elements = document.querySelectorAll(".invert-color");
    function getInvertedColor(color) {
      let rgb = color.match(/\d+/g);
      let invertedRgb = rgb.map(function (component) {
        return 255 - parseInt(component, 10);
      });
      let invertedColor = "rgb(" + invertedRgb.join(",") + ")";
      return invertedColor;
    }
    elements.forEach(function (element) {
      let parentBackgroundColor = window.getComputedStyle(
        element.parentElement
      ).backgroundColor;

      let invertedColor = getInvertedColor(parentBackgroundColor);
      element.style.color = invertedColor;
    });
  }, [whiteColor, blackColor]);

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
              !decreaseWhiteTime
                ? classes.whiteBox
                : !lessWhiteTime
                ? classes.selectedBox
                : classes.lessTimeBox
            }
            style={{
              background: `${
                !decreaseWhiteTime
                  ? whiteColor
                  : !lessWhiteTime
                  ? whiteColor
                  : "#d9534f"
              }`,
            }}
            onClick={handleWhiteBox}
          >
            <Typography variant="h1" className="invert-color">
              {formattedTime(whiteTime)}
            </Typography>
            <Typography variant="body1" component="p" className="invert-color">
              Moves: {whiteSteps}
            </Typography>
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
              disabled={handleDisableTimer()}
              onClick={() => {
                setEditTimer(true);
                setOpenMenu(true);
              }}
            >
              Timer
            </Button>
            <Button
              variant="contained"
              color="secondary"
              disabled={decreaseWhiteTime || decreaseBlackTime}
              onClick={() => {
                setOpenColorPicker(true);
              }}
            >
              Theme
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Box
            className={
              !decreaseBlackTime
                ? classes.blackBox
                : !lessBlackTime
                ? classes.selectedBox
                : classes.lessTimeBox
            }
            style={{
              background: `${
                !decreaseBlackTime
                  ? blackColor
                  : !lessBlackTime
                  ? blackColor
                  : "#d9534f"
              }`,
            }}
            onClick={handleBlackBox}
          >
            <Typography variant="h1" className="invert-color">
              {formattedTime(blackTime)}
            </Typography>
            <Typography variant="body1" component="p" className="invert-color">
              Moves: {blackSteps}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      {openMenu && (
        <SelectTime
          open={openMenu}
          setOpen={setOpenMenu}
          whiteTime={whiteTime}
          setWhiteTime={setWhiteTime}
          blackTime={blackTime}
          setBlackTime={setBlackTime}
          setEditTimer={setEditTimer}
        />
      )}
      {openColorPicker && (
        <ColorPickerComponent
          open={openColorPicker}
          setOpen={setOpenColorPicker}
        />
      )}
    </>
  );
};

export default ChessTimer;
