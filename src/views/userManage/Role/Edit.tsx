import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import Required from "components/common/Required";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import { gridSpacing } from "store/constant";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { serializeValidData } from "utils/Helpers";
import langString from "utils/langString";
import * as Yup from "yup";

export default function EditService() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState<any>(null);
  const param = useParams();


  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const postData = { uuid: param.id }
        
        const response = await axiosServices.post(
          `role/get-all`,
          postData
        );
        if (response.status === 200) {
          setDetails(response.data?.roleList[0]);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, [param.id]);

  return (
    <Wrapper
      title={`${langString("edit")} ${langString("Role")}`}
      backLink="/admin/role-management"
    >
      {loading && <Loader />}
      {details && (
        <Formik
          initialValues={{
            roleName: details.name,
            description: details.description,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            roleName: Yup.string().required("Name is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            const body: any = {
              uuid: details.uuid,
              name: values.roleName,
              description: values.description,
            };

            try {
              setLoading(true);
              const postData = serializeValidData("roles", {role:body});
              const response = await axiosServices.post(
                "role/update",
                postData
              );
              if (response.status === 200) {
                dispatch({
                  type: SNACKBAR_OPEN,
                  open: true,
                  message: "Role Updated Successfully",
                  variant: "alert",
                  alertSeverity: "success",
                });
                navigate("/admin/role-management", { replace: true });
              }
              setLoading(false);
            } catch (err: any) {
              dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: "Role Already Exists or Duplicate",
                variant: "alert",
                alertSeverity: "success",
              });
              setStatus({ success: false });
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
              <Box
                sx={{ border: "1px solid #EEE", padding: 3, borderRadius: 3 }}
              >
                <Grid container spacing={gridSpacing}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    Zone Name <Required />
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl
                    fullWidth
                    error={Boolean(touched.roleName && errors.roleName)}
                  >
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={"Role Name"}
                      value={values.roleName}
                      name="roleName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.roleName && errors.roleName && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-name-user-create"
                      >
                        {errors.roleName}
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
                    {langString("Description")}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={7}>
                  <FormControl fullWidth>
                    <TextField
                      id="outlined-adornment-name-user-create"
                      type="text"
                      label={langString("Description")}
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              


              <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>


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
                    onClick={() => navigate("/admin/role-management", { replace: true })}
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
      )}
    </Wrapper>
  );
}
