import React, { createContext, useEffect, useReducer } from "react";
// import config from '../config';

// third-party
import jwtDecode from "jwt-decode";

// reducer - state management
import { LOGIN, LOGOUT, SNACKBAR_OPEN } from "store/actions";
import accountReducer from "store/accountReducer";

// project imports
import Loader from "ui-component/Loader";
import { useDispatch } from "react-redux";
import axiosServices from "../utils/axiosServices";
import { initialLoginContextProps, KeyedObject } from "types";
import { JWTContextType } from "types/auth";
import { PostDataType } from "utils/Constants";
import axios from "axios";


// constant
const initialState: initialLoginContextProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null,
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem("serviceToken", serviceToken);
  } else {
    localStorage.removeItem("serviceToken");
    delete axiosServices.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const dispatchMessage = useDispatch();


  const setUserStateData = async (response: any) => {
    if (response.status === 200) {
      const userResponse = await response.data;
      
      if(userResponse){
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true,
            user: userResponse,
          },
        });
      }
    } else {
      dispatch({
        type: LOGOUT,
      });
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem("serviceToken");
        if (serviceToken && verifyToken(serviceToken)) {
          const response = await axiosServices.get("user/me");
          setUserStateData(response);
        } else {
          dispatch({
            type: LOGOUT,
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT,
        });
      }
    };

    init();
  }, []);


  
  const login = async (username: string, password: string) => {
    const postData: PostDataType = { userName: username, password:password };

    try {
      const response = await axiosServices.post("/user/login", postData);
      if (response.status === 200) {
        setSession(response.data.token)
        setUserStateData(response);
      } else {
        dispatchMessage({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Invalid Request",
          variant: "alert",
          alertSeverity: "error",
        });
      }
    } catch (error) {
      dispatchMessage({
        type: SNACKBAR_OPEN,
        open: true,
        message: "Failed to login!",
        variant: "alert",
        alertSeverity: "error",
      });
      console.log(error);
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = (email: string) => console.log(email);

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider
      value={{ ...state, login, logout, resetPassword, updateProfile }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
