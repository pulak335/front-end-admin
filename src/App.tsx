import { CssBaseline, StyledEngineProvider } from "@mui/material";
import { Theme, ThemeProvider } from "@mui/material/styles";
// auth provider
// import { FirebaseProvider } from 'contexts/FirebaseContext';
import { JWTProvider } from "contexts/JWTContext";
import NavigationScroll from "layout/NavigationScroll";
import { useSelector } from "react-redux";
// routing
import Routes from "routes";
// defaultTheme
import themes from "themes";
// store
import { DefaultRootStateProps } from "types";
// import RTLLayout from 'ui-component/RTLLayout';
import Snackbar from "ui-component/extended/Snackbar";
// project imports
import Locales from "ui-component/Locales";

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector(
    (state: DefaultRootStateProps) => state.customization
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <Locales>
          <NavigationScroll>
            <JWTProvider>
              <>
                <Routes />
                <Snackbar />
              </>
            </JWTProvider>
          </NavigationScroll>
        </Locales>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
