import * as React from "react";

// material-ui
import { useTheme } from "@mui/material/styles";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";

import { DialogProps } from "@mui/material/Dialog";

// ===============================|| SELECTION ROW ||=============================== //

export interface ConfirmationDialogRawProps extends DialogProps {
  _onClose: (v?: {}) => void;
  valueProp?: any;
  open: boolean;
}

export default function ConfirmationDialogRaw(
  props: ConfirmationDialogRawProps
) {
  const theme = useTheme();
  const { _onClose, valueProp, open, ...other } = props;
  const [value, setValue] = React.useState({ message: "", id: 0 });

  React.useEffect(() => {
    if (open) {
      setValue(valueProp);
    } else {
      setValue({ message: "", id: 0 });
    }
  }, [valueProp, open]);

  const handleCancel = () => {
    _onClose({ status: "CANCEL", id: value.id });
  };

  const handleOk = () => {
    _onClose({ status: "PROCEED", id: value.id });
  };

  return (
    <Dialog
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="alert-dialog-title">Confirmation?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="body2" component="span">
            {value?.message}
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pr: 2.5 }}>
        <Button
          sx={{
            color: theme.palette.error.dark,
            borderColor: theme.palette.error.dark,
          }}
          onClick={handleCancel}
          color="secondary"
        >
          Cancel
        </Button>
        <Button variant="contained" size="small" onClick={handleOk} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
