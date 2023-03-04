import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import Required from "components/common/Required";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import { gridSpacing } from "store/constant";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import langString from "utils/langString";
import * as Yup from "yup";

export default function AddUserType() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [roles, setRoles] = useState<any[]>([]);

  // useEffect(() => {
  //   const init = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await axiosServices.post(
  //         `role/get-all`
  //       );
  //       if (response.status === 200) {
  //         setRoles(response.data?.roleList);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       setLoading(false);
  //       console.log(error);
  //     }
  //   };
  //   init();
  // }, []);

  return (
    <Wrapper
      title={`${langString("Add")} ${langString("User")}`}
      backLink="/admin/user-manage"
    >
      {loading && <Loader />}
      <Formik
        initialValues={{
          userName: "",
          firstName:"",
          lastName:"",
          email:"",
          phone:"",
          password:"",
          status:1,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          userName: Yup.string().required("User Name is required"),
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string().email('Invalid email format').required("Email is required"),
          phone: Yup.string().length(11).required("Phone number is required"),
          password: Yup.string().min(6).max(24).required("Password is Required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setLoading(true);
            const postData = {
              userName: values.userName,
              firstName:values.firstName,
              lastName:values.lastName,
              email:values.email,
              phone:values.phone,
              password: values.password,
              status:values.status === 1 ? true : false
            }
            const response = await axiosServices.post(
              "user/signin",
              postData
            );
            if (response.status === 201) {
              dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: "User Added Successfully",
                variant: "alert",
                alertSeverity: "success",
              });
              navigate("/admin/user-manage", { replace: true });
            }
            setLoading(false);
          } catch (err: any) {
            setStatus({ success: false });
            dispatch({
              type: SNACKBAR_OPEN,
              open: true,
              message: "User Added Failed",
              variant: "alert",
              alertSeverity: "error",
            });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box sx={{ border: "1px solid #EEE", padding: 3, borderRadius: 3 }}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    User Name <Required />
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.userName && errors.userName)}
                  >
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={"User Name"}
                      value={values.userName}
                      name="userName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.userName && errors.userName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.userName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("First Name")} <Required/>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("First Name")}
                      name="firstName"
                      value={values.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.firstName && errors.firstName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.firstName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Last Name")} <Required/>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      rows={3}
                      type="text"
                      label={langString("Last Name")}
                      name="lastName"
                      value={values.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.lastName && errors.lastName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.lastName}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Email")} <Required/>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      rows={3}
                      type="text"
                      label={langString("Email")}
                      name="email"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Phone")}  <Required/>
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <TextField
                      id="outlined-adornment-name-user-create"
                      rows={3}
                      type="text"
                      label={langString("Phone")}
                      name="phone"
                      value={values.phone}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.phone && errors.phone && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
            </Grid>


            <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Password")} <Required/>
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="password"
                      label={langString("Password")}
                      name="password"
                      value={values.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />

                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
            </Grid>


            <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Status")}  <Required/>
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel id="dependson-select-label">
                      {langString("Status")}
                    </InputLabel>
                    <Select
                      name="status"
                      id="dependson-select"
                      fullWidth
                      value={values.status}
                      label={langString("Status")}
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>
                        {langString("Active")}
                      </MenuItem>
                      <MenuItem value={0}>
                        {langString("Inactive")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>

   {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
              <Box sx={{ textAlign: "right", paddingTop: 3 }}>
                <Button
                  color="warning"
                  disabled={isSubmitting}
                  size="large"
                  type="button"
                  onClick={() => navigate("/admin/user-manage", { replace: true })}
                  variant="contained"
                  sx={{ marginRight: 2 }}
                >
                  {langString("cancel")}
                </Button>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  {langString("save")}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Wrapper>
  );
}
