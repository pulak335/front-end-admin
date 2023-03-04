import { Link } from "react-router-dom";

// material-ui
import { useTheme } from "@mui/material/styles";
import { Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { gridSpacing } from "store/constant";
// project imports
import AuthWrapper from "./AuthWrapper";
import AuthCardWrapper from "./AuthCardWrapper";
import AuthLogin from "./auth-forms/AuthLogin";
import Logo from "../../assets/images/logo.png";
import langString from "utils/langString";

// partner logo imports
import GovtLogo from "../../assets/images/mpower/govt.png"
import MojibLogo from "../../assets/images/mpower/mujib100.png"
import MpowerLogo from "../../assets/images/mpower/mpower2.png"
import WhoLogo from "../../assets/images/mpower/WHO.png"
import Ncdc from "../../assets/images/mpower/NCDC.png"
import Suborno from "../../assets/images/mpower/juborno.png"



const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AuthWrapper>
        <Grid item xs={12} md={12} >
          <Grid
            container
            height="85vh"
            justifyContent="center"
            alignItems="center"
            sx={{backgroundColor:"white" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 } }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="/">
                      
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            {langString("login")}
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
    </AuthWrapper>
  );
};

export default Login;
