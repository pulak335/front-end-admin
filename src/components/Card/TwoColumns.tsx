import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { checkNullInfo } from "utils/Helpers";
import Modal from "@mui/material/Modal";
import defaultImage from "assets/images/placeholder/default.png";

type RowDataType = { label: string; value: string; img?: boolean };
type TwoColumnPropsType = {
  rows: RowDataType[];
  border?: string;
  padding?: string;
  leftColor?: string;
  leftBackground?: string;
  rightColor?: string;
  rightBackground?: string;
};
export default function TwoColumns({
  rows,
  border,
  padding,
  leftColor,
  leftBackground,
  rightColor,
  rightBackground,
}: TwoColumnPropsType) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("");

  return (
    <>
      {rows.length ? (
        rows.map((row) => (
          <Grid container>
            <Grid
              item
              sm={4}
              sx={{
                border: border || "1.5px solid #EEE",
                padding: padding || 1.5,
                background: leftBackground || "#FFF",
              }}
            >
              <Typography variant="body1" sx={{ color: leftColor || "#000" }}>
                {checkNullInfo(row.label)}
              </Typography>
            </Grid>
            <Grid
              item
              sm={8}
              sx={{
                border: border || "1.5px solid #EEE",
                padding: padding || 1.5,
                background: rightBackground || "#FFF",
              }}
            >
              {row.img ? (
                <>
                  <img
                    src={row.value ? row.value : defaultImage}
                    width="200"
                    alt={row.label}
                    onClick={() => {
                      setOpen(true);
                      if (row.value) {
                        setCurrent(row.value);
                      } else {
                        setCurrent("");
                      }
                    }}
                  />
                </>
              ) : (
                <Typography variant="h5" sx={{ color: rightColor || "#000" }}>
                  {checkNullInfo(row.value)}
                </Typography>
              )}
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography variant="body1">{checkNullInfo("notdatafound")}</Typography>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 670,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <img src={current || defaultImage} width="600" alt="nidImage" />
        </Box>
      </Modal>
    </>
  );
}
