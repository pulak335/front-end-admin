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

export default function EditService() {
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
      title={`${langString("Add")} ${langString("Services")}`}
      backLink="/services"
    >
      {loading && <Loader />}
      <Formik
        initialValues={{
          imgUrl: "",
          name:"",
          discription:"",
          alt:"",
          mata:"",
          slug:"",
          submit: null,
        }}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            setLoading(true);
            const postData = serializeValidData("responders",{responder: {
              imgUrl: values.imgUrl,
              name:values.name,
              discription: values.discription,
              alt:values.alt,
              slug:values.slug,
              mata:values.mata,
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
                    Img Url <Required />
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={"Responder Name"}
                      value={values.imgUrl}
                      name="imgUrl"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Service Name")} <Required/>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("Service Name")}
                      name="name"
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Discription")}
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <TextField
                      name="discription"
                      id="dependson-select"
                      fullWidth
                      value={values.discription}
                      label={langString("Discription")}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                    </TextField>
                  </FormControl>
                </Grid>
            </Grid>

              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Alter Text")} <Required/>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      rows={3}
                      type="text"
                      label={langString("Alter Text")}
                      name="alt"
                      value={values.alt}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>


              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Mata Tag")}
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    <TextField
                      name="mata"
                      id="dependson-select"
                      fullWidth
                      label={langString("Mata Tag")}
                      value={values.mata}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                    </TextField>
                  </FormControl>
                </Grid>
            </Grid>

            <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Slug")} <Required/>
                  </Typography>
                </Grid>

              <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                  >
                    
                    <TextField
                      name="slug"
                      id="dependson-select"
                      fullWidth
                      value={values.slug}
                      label="Slug"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                    </TextField>
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
                  onClick={() => navigate("/services", { replace: true })}
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
