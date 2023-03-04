import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import langString from "utils/langString";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MainCard from "ui-component/cards/MainCard";
import BorderColorIcon from '@mui/icons-material/BorderColor';

type WrapperPropsType = {
  title: string;
  backLink?: string;
  addLink?: string;
  children: React.ReactNode;
  addComponent?: React.ReactNode;
  editLink?: string;
};

export default function Wrapper({
  title,
  backLink,
  addLink,
  children,
  addComponent,
  editLink
}: WrapperPropsType) {
  return (
    <MainCard sx={{ minHeight: "80vh" }}>
      <Grid container justifyContent={'space-between'} sx={{ borderBottom: "1px solid #DDD", marginBottom: 2 }}>
        <Grid item xs={8} sm={8} lg={8} xl={8}>
          <Typography variant="h3" padding={1} color="#0D0156">
            {title}
          </Typography>
        </Grid>
        <Grid item xs={4} sm={4} lg={4} xl={4} textAlign="right">
        {editLink && (
            <Button
              sx={{ float: "right", marginLeft:2 }}
              size="small"
              component={Link}
              to={editLink}
              variant="contained"
              color="primary"
            >
              <BorderColorIcon />
              <Typography sx={{marginLeft:1}}>Edit</Typography>
            </Button>
          )}
          {backLink && (
            <Button
              sx={{ float: "right", marginLeft:2 }}
              size="small"
              component={Link}
              to={backLink}
              variant="contained"
              color="info"
            >
              <ArrowBackIosIcon />
              {langString("back")}
            </Button>
          )}
          { addLink && (
            <Button
              sx={{ float: "right" }}
              size="small"
              component={Link}
              to={addLink}
              variant="contained"
              color="primary"
            >
              <AddBoxIcon />
              {langString("add")}
            </Button>
          )}
          {addComponent && (
            <>
              {addComponent}
            </>
          )}
        </Grid>
      </Grid>
      <Grid container >
        <Grid item xs={12} sm={12} lg={12} xl={12} sx={{ padding: 1 }}>
          {children}
        </Grid>
      </Grid>
    </MainCard>
  );
}
