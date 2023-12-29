import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import clickSound from "../assets/click-sound.mp3";
import beepSound from "../assets/beep-sound.mp3";
import finalBeepSound from "../assets/final-beep-sound.mp3";

const SelectTime = lazy(() => import("./SelectTime"));
const ColorPickerComponent = lazy(() => import("./ColorPicker"));

const useStyles = makeStyles({
  wrapper: {
    background: "#fafafa",
    width: "100%",
    height: "100vh",
    margin: "0px !important",
  },
  timeUp: {
    animationName: "$timeFinish",
    animationDuration: "0.2s",
    animationDelay: "0.2s",
    animationIterationCount: 10,
  },
  root: {
    color: "white",
    height: "100vh",
    margin: "0px !important",
  },

  item: {
    padding: "5px 10px",
  },
  whiteBox: {
    height: "46vh",
    border: "none",
    boxShadow: "0px 0px 2px 1px #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
    pointerEvents: "none",
    transition: "all 0.25s",
  },
  blackBox: {
    height: "46vh",
    border: "none",
    display: "flex",
    boxShadow: "0px 0px 2px 1px #ddd",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
    pointerEvents: "none",
    transition: "all 0.25s",
  },
  selectedBox: {
    height: "46vh",
    opacity: "1",
    border: "none",
    boxShadow: "0px 0px 2px 1px #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "all 0.25s",
  },
  lessTimeBox: {
    height: "46vh",
    border: "none",
    boxShadow: "0px 0px 2px 1px #ddd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "all 0.25s",
  },
  controllers: {
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    borderRadius: "6px",
  },
  "@keyframes timeFinish": {
    "0%": {
      background: "#fafafa",
    },
    "50%": {
      background: "red",
    },
    "100%": {
      background: "#fafafa",
    },
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

  const handleDisableButtons = () => {
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
        className={
          whiteTime === 0 || blackTime === 0 ? classes.timeUp : classes.wrapper
        }
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
              backgroundColor: `${
                !decreaseWhiteTime
                  ? whiteColor
                  : !lessWhiteTime
                  ? whiteColor
                  : "#d9534f"
              }`,
              transform: `${
                !decreaseWhiteTime
                  ? "scale(1.0)"
                  : !lessWhiteTime
                  ? "scale(1.01)"
                  : "scale(1.01)"
              }`,
              boxShadow: `${
                !decreaseWhiteTime
                  ? "none"
                  : !lessWhiteTime
                  ? "0px 0px 10px 4px #888"
                  : "0px 0px 10px 4px #888"
              }`,
            }}
            onClick={handleWhiteBox}
          >
            <Typography
              variant="body1"
              component="p"
              className="invert-color"
              style={{ transform: "rotate(180deg)" }}
            >
              Moves: {whiteSteps}
            </Typography>
            <Typography
              variant="h1"
              className="invert-color"
              style={{ transform: "rotate(180deg)" }}
            >
              {formattedTime(whiteTime)}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Box className={classes.controllers}>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleStart}
              disabled={handleDisableButtons()}
            >
              Start
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="info"
              size="small"
              disabled={handleDisableButtons()}
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
              size="small"
              disabled={handleDisableButtons()}
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
              transform: `${
                !decreaseBlackTime
                  ? "scale(1.0)"
                  : !lessBlackTime
                  ? "scale(1.01)"
                  : "scale(1.01)"
              }`,
              boxShadow: `${
                !decreaseBlackTime
                  ? "none"
                  : !lessBlackTime
                  ? "0px 0px 10px 4px #888"
                  : "0px 0px 10px 4px #888"
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
        <Suspense fallback={<></>}>
          <SelectTime
            open={openMenu}
            setOpen={setOpenMenu}
            whiteTime={whiteTime}
            setWhiteTime={setWhiteTime}
            blackTime={blackTime}
            setBlackTime={setBlackTime}
            setEditTimer={setEditTimer}
          />
        </Suspense>
      )}
      {openColorPicker && (
        <Suspense fallback={<></>}>
          <ColorPickerComponent
            open={openColorPicker}
            setOpen={setOpenColorPicker}
          />
        </Suspense>
      )}
    </>
  );
};

export default React.memo(ChessTimer);
