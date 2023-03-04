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
import FileInput from "components/common/FileInput";
import Required from "components/common/Required";
import { Formik } from "formik";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import { gridSpacing } from "store/constant";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { serializeValidData } from "utils/Helpers";
import langString from "utils/langString";
import * as Yup from "yup";

export default function AddService() {
  const [loading, setLoading] = useState(false);
  const [zones, setZones] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const response = await axiosServices.post(
          `zone/get-all`
        );
        if (response.status === 200) {
          setZones(response.data?.zoneList)
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <Wrapper
      title={`${langString("Add")} ${langString("Achivements")}`}
      backLink="/achivements"
    >
      {loading && <Loader />}
      <Formik
        initialValues={{
          fullName: "",
          phoneNum:"",
          gender:"",
          address:"",
          zone:"",
          // upazila:"",
          status:1,
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          fullName: Yup.string().required("Name is required"),
          phoneNum: Yup.string().min(11).required("Phone number is required"),
          address: Yup.string().required("Address is required"),
          status: Yup.string().required("Status is required"),
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setLoading(true);
            const postData = serializeValidData("responders",{responder: {
              fullName: values.fullName,
              phoneNum:values.phoneNum,
              gender: values.gender,
              address:values.address,
              zoneId:values.zone,
              status:values.status,
            }});
            const response = await axiosServices.post(
              "responder/create",
              postData
            );
            if (response.status === 201) {
              dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: "Responder Added Successfully",
                variant: "alert",
                alertSeverity: "success",
              });
              navigate("/responder", { replace: true });
            }
            setLoading(false);
          } catch (err: any) {
            setStatus({ success: false });
            dispatch({
              type: SNACKBAR_OPEN,
              open: true,
              message: "Duplicate Phone Number Provided",
              variant: "alert",
              alertSeverity: "error",
            });
            setLoading(false);
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
                    Responder Name <Required />
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.fullName && errors.fullName)}
                  >
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={"Responder Name"}
                      value={values.fullName}
                      name="fullName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.fullName && errors.fullName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.fullName}
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
                    {langString("Contact No")} <Required/>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("Contact No")}
                      name="phoneNum"
                      value={values.phoneNum}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.phoneNum && errors.phoneNum && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.phoneNum}
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
                    {langString("Gender")}
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel id="dependson-select-label">
                      {langString("Gender")}
                    </InputLabel>
                    <Select
                      name="gender"
                      id="dependson-select"
                      fullWidth
                      value={values.gender}
                      label={langString("Gender")}
                      onChange={handleChange}
                    >
                      
                      <MenuItem value="male">
                        {langString("Male")}
                      </MenuItem>
                      <MenuItem value="female">
                        {langString("Female")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Grid>


            {/* <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Upazila")}
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel id="dependson-select-label">
                      {langString("upazila")}
                    </InputLabel>
                    <Select
                      name="upazila"
                      id="dependson-select"
                      fullWidth
                      value={values.upazila}
                      label={langString("upazila")}
                      onChange={handleChange}
                    >
                      
                      <MenuItem value="gazaria">
                        {langString("Gazaria")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
            </Grid> */}

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Address")} <Required/>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      rows={3}
                      type="text"
                      label={langString("Address")}
                      name="address"
                      value={values.address}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.address && errors.address && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.address}
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
                    {langString("Zone")}
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel id="dependson-select-label">
                      {langString("Zone")}
                    </InputLabel>
                    <Select
                      name="zone"
                      id="dependson-select"
                      fullWidth
                      label={langString("Zone")}
                      value={values.zone}
                      onChange={handleChange}
                    >
                      {
                        zones.map((item: { uuid: string | number | readonly string[] | undefined; name: any; }) =><MenuItem value={item.uuid}>{langString(`${item.name}`)}</MenuItem>)
                      }
                    </Select>

                    
                  </FormControl>
                </Grid>
            </Grid>



            <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Status")} <Required/>
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
                      label={langString("status")}
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>
                        {langString("Active")}
                      </MenuItem>
                      <MenuItem value={0}>
                        {langString("Inactive")}
                      </MenuItem>
                    </Select>
                    {touched.status && errors.status && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.status}
                      </FormHelperText>
                    )}
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
                  onClick={() => navigate("/responder", { replace: true })}
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
