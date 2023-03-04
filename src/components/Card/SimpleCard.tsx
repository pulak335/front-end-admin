import { Box, Grid, Typography } from "@mui/material";

type SimpleCardPropsType = {
  title: string;
  children: React.ReactNode;
};

export default function SimpleCard({ title, children }: SimpleCardPropsType) {
  return (
    <Box sx={{ border: "1px solid #DDD" }}>
      <Grid
        container
        sx={{
          background: "#0D0156",
        }}
      >
        <Grid item xs={8} sm={8} lg={8} xl={8}>
          <Typography variant="body1" padding={1} color="#FFF">
            {title}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  );
}
