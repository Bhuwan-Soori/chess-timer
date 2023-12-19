import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorPicker, useColor } from "react-color-palette";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { setBlackColor, setWhiteColor } from "../Redux/chessTimerSlice";

const useStyles = makeStyles({
  title: {
    color: "#2e7d32",
  },
  content: {
    padding: "20px 30px !important",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "15px",
    overflowY: "scroll",
  },
  pickerContainer: {
    width: "20vw",
  },
});

const ColorPickerComponent = ({ open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const whiteColor = useSelector((state) => state.chessTimer.whiteColor);
  const blackColor = useSelector((state) => state.chessTimer.blackColor);
  const [tempWhiteColor, setTempWhiteColor] = useColor(whiteColor);
  const [tempBlackColor, setTempBlackColor] = useColor(blackColor);

  const handleClose = () => {
    dispatch(setWhiteColor(tempWhiteColor?.hex));
    dispatch(setBlackColor(tempBlackColor?.hex));
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      maxWidth="lg"
      keepMounted
      disableEscapeKeyDown={true}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle variant="h6" component="h5" className={classes.title}>
        Customize timer according to your board.
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className={classes.pickerContainer}>
            <Typography
              variant="h5"
              component="p"
              style={{ color: `${tempWhiteColor?.hex}` }}
            >
              White
            </Typography>
            <ColorPicker
              height={200}
              hideInput={["rgb", "hsv"]}
              color={tempWhiteColor}
              onChange={setTempWhiteColor}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.pickerContainer}>
            <Typography
              variant="h5"
              component="p"
              style={{ color: `${tempBlackColor?.hex}` }}
            >
              Black
            </Typography>
            <ColorPicker
              height={200}
              hideInput={["rgb", "hsv"]}
              color={tempBlackColor}
              onChange={setTempBlackColor}
            />
          </Grid>
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

export default React.memo(ColorPickerComponent);
