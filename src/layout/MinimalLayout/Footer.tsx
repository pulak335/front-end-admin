import mpower from "assets/images/mpower/mpower.png";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  footerWrapper: {
    position: "relative",
    height: 60,
  },
  footer: {
    position: "absolute",
    width: "98%",
    bottom: 5,
    textAlign: "center",
  },
  logoItem: {
    marginLeft: 20,
    width: 50,
    maxHeight: 30,
  },
});
export default function MinimalFooter() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item sm={12} className={classes.footerWrapper}>
        <div className={classes.footer}>
          <span>Developed by </span>
           Arafat Islam
        </div>
      </Grid>
    </Grid>
  );
}
