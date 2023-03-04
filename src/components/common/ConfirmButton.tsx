import React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import langString from "utils/langString";

type ConfirmButtonPropsType = {
  buttonColor?:
    | "error"
    | "inherit"
    | "secondary"
    | "primary"
    | "success"
    | "info"
    | "warning"
    | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  buttonText?: string;
  title?: string;
  subTitle?: string;
  confirmed: () => void;
};
export default function ConfirmButton({
  buttonColor,
  buttonText,
  variant,
  title,
  subTitle,
  confirmed,
}: ConfirmButtonPropsType) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button
        color={buttonColor || "error"}
        variant={variant || "contained"}
        onClick={() => setOpen(true)}
        size="small"
        sx={{ marginLeft: 0.5 }}
      >
        {buttonText || langString("delete")}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{ p: 3 }}
      >
        <DialogTitle id="alert-dialog-title">
          {title || "Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Typography variant="body2" component="span">
              {subTitle && subTitle}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ pr: 2.5 }}>
          <Button
            sx={{
              color: theme.palette.error.dark,
              borderColor: theme.palette.error.dark,
            }}
            onClick={() => setOpen(false)}
            color="secondary"
          >
            {langString("cancel")}
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              confirmed();
              setOpen(false);
            }}
            autoFocus
          >
            {langString("confirm")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
