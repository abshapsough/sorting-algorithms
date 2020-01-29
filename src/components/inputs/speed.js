import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  root: {
    width: 280,
    marginBottom: 10
  },
  input: {
    width: 100
  }
});
/**
 * function to determine speed of sorting algorithms through user input
 * @param {*} props
 */
export default function Speed(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(100);

  const handleInputChange = event => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
    props.speed(event.target.value);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 10000) {
      setValue(10000);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Speed (in milli-seconds)
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 10000,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
