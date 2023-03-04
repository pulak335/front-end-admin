import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
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

const PatientForm = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [roadUser, setRoadUser] = useState<any[]>([]);
    const [severity, setSeverity] = useState<any[]>([]);
    const [acompany, setAcompany] = useState<any[]>([]);
    const [clinicalOutcome, setClinicalOutcome] = useState<any[]>([]);
    const [hospitalType, setHospitalType] = useState<any[]>([]);
    const [locationInVehicle, setLocationInVehicle] = useState<any[]>([]);
    const [hospitalVehicle, setHospitalVehicle] = useState<any[]>([]);
    const [noTreatmentScene, setNoTreatmentScene] = useState<any[]>([]);
    const [treatedBy, setTreatedBy] = useState<any[]>([]);
    const param = useParams();
  

    // road type of user dropdowan
    useEffect(() => {
        const init = async () => {
          const postData = {
            "type": "roadUser"
        }
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `data/get-all`,postData
            );
            if (response.status === 200) {
              setRoadUser(response.data?.dataList);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);
  
  //severity rate deopdown
    useEffect(() => {
      const postData = {type:"severity"}
      const init = async () => {
        setLoading(true);
        try {
          const response = await axiosServices.post(
            `data/get-all`,
            postData
          );
          if (response.status === 200) {
            setSeverity(response.data.dataList);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      init();
    }, []);

    // Location in vehicle deopdown
      useEffect(() => {
        const postData = {type:"acompany"}
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `data/get-all`,
              postData
            );
            if (response.status === 200) {
              setAcompany(response.data.dataList);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);

      // Clinical outcome dropdown

      useEffect(() => {
        const postData = {type:"clinicalOutcome"}
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `data/get-all`,
              postData
            );
            if (response.status === 200) {
              setClinicalOutcome(response.data.dataList);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);


      // Hospital Type dropdown

      useEffect(() => {
        const postData = {type:"hospitalType"}
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `data/get-all`,
              postData
            );
            if (response.status === 200) {
              setHospitalType(response.data.dataList);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);

    // Transport Vehicle dropdown

      useEffect(() => {
        const postData = {type:"hospitalVehicle"}
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `data/get-all`,
              postData
            );
            if (response.status === 200) {
              setHospitalVehicle(response.data.dataList);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);

      // noTreatmentScene dropdown

      useEffect(() => {
        const postData = {type:"noTreatmentScene"}
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `data/get-all`,
              postData
            );
            if (response.status === 200) {
              setNoTreatmentScene(response.data.dataList);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);


    // Location in vehicle dreop down 
    useEffect(() => {
      const postData = {type:"locationInVehicle"}
      const init = async () => {
        setLoading(true);
        try {
          const response = await axiosServices.post(
            `data/get-all`,
            postData
          );
          if (response.status === 200) {
            setLocationInVehicle(response.data.dataList);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      init();
    }, []);


      // treated By dreop down 
      useEffect(() => {
        const postData = {type:"treatedBy"}
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `data/get-all`,
              postData
            );
            if (response.status === 200) {
              setTreatedBy(response.data.dataList);
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
        <Wrapper title={`Patient Information Form( Incident No: ${param.id} )`} backLink={`/incident-report/profile/${param.id}`}>
        {loading && <Loader />}
          <Formik
            initialValues={{
              PatientId: "",
              PatientName: "",
              age:"",
              gender:"",
              typeOfRoadUser:"",
              locationInVehicle:"",
              injurySeverityRating:"",
              didThePatientReceiveTreatmentAtTheScene:"",
              treatedbBy:"",
              ifNotTreatedAtScene:"",
              clinicalOutcome:"",
              timeCrashAndArrivalHospital:"",
              transportVehicle:"",
              whoAccompaniedThePatient:"",
              hospitalType:"",
              appropriateReceivingHospital:"",
              submit: null,
            }}

            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
              const body: any = {
                Patient:{
                  name:values.PatientName,
                  age: values.age,
                  gender: values.gender,
                  typeOfVehicleUser: values.typeOfRoadUser,
                  locationInVehicle: values.locationInVehicle,
                  injurySeverity: values.injurySeverityRating,
                  treatmentAtScene: values.didThePatientReceiveTreatmentAtTheScene,
                  treatedBy: values.treatedbBy,
                  reasonForNoTreatment: values.ifNotTreatedAtScene,
                  clinicalOutcome: values.clinicalOutcome,
                  arrivalDelay: values.timeCrashAndArrivalHospital,
                  paitentTransport: values.transportVehicle,
                  patientCompany: values.whoAccompaniedThePatient,
                  hospitalType: values.hospitalType,
                  appropriateHospital: values.appropriateReceivingHospital
                },
                incident:{
                  uuid: param.id
              }
              };
  
              try {
                setLoading(true);
                const postData = serializeValidData("Patients", body);
                const response = await axiosServices.post(
                  "patient/create",
                  postData
                );
                if (response.status === 201) {
                  dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: "Patient Added Successfully",
                    variant: "alert",
                    alertSeverity: "success",
                  });
                  navigate(`/incident-report/profile/${param.id}`, { replace: true });
                }
                setLoading(false);
              } catch (err: any) {
                dispatch({
                  type: SNACKBAR_OPEN,
                  open: true,
                  message: "Patient Added Failed",
                  variant: "alert",
                  alertSeverity: "error",
                });
                setStatus({ success: false });
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
                <>
                <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                  <Typography sx={{ marginBottom:1}} variant="h2">Patient Information</Typography>
                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Patient ID
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                        <FormControl
                          fullWidth
                        >
                          <TextField
                            id="outlined-adornment-name-user-create"
                            type="number"
                            label={langString("Patient ID")}
                            name="PatientId"
                            value={values.PatientId}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FormControl>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Patient Name
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                        <FormControl
                          fullWidth
                        >
                          <TextField
                            id="outlined-adornment-name-user-create"
                            type="text"
                            label={langString("Patient Name")}
                            name="PatientName"
                            value={values.PatientName}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FormControl>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Age
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                        <FormControl
                          fullWidth
                        >
                          <TextField
                            id="outlined-adornment-name-user-create"
                            type="number"
                            label={langString("Age")}
                            name="age"
                            value={values.age}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FormControl>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Gender
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="gender"
                          id="dependson-select"
                          fullWidth
                          value={values.gender}
                          onChange={handleChange}
                        >
                          
                        <MenuItem value="male">{langString(`Male`)}</MenuItem>
                        <MenuItem value="Female">{langString(`Female`)}</MenuItem>
                          
                        </Select>
                      </FormControl>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Type of Road User
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="typeOfRoadUser"
                          id="dependson-select"
                          fullWidth
                          value={values.typeOfRoadUser}
                          onChange={handleChange}
                        >
                         {
                          roadUser.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                         }   
                        </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Location in vehicle
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="locationInVehicle"
                          id="dependson-select"
                          fullWidth
                          value={values.locationInVehicle}
                          onChange={handleChange}
                        >
                        {
                          locationInVehicle.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                        }
                        
                          
                        </Select>
                      </FormControl>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Injury Severity Rating
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="injurySeverityRating"
                          id="dependson-select"
                          fullWidth
                          value={values.injurySeverityRating}
                          onChange={handleChange}
                        >

                        {
                          severity.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                        }
                        </Select>
                      </FormControl>
                  </Grid>

                  
                  </Grid>
                </Paper>

                <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                  <Typography sx={{ marginBottom:1}} variant="h2">Treatment Outcomes</Typography>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Did the patient receive treatment at the scene?
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="didThePatientReceiveTreatmentAtTheScene"
                          id="dependson-select"
                          fullWidth
                          value={values.didThePatientReceiveTreatmentAtTheScene}
                          onChange={handleChange}
                        >
                          
                        <MenuItem value={1}>{langString(`Yes`)}</MenuItem>
                        <MenuItem value={0}>{langString(`No`)}</MenuItem>
                        </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Treated by
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="treatedbBy"
                          id="dependson-select"
                          fullWidth
                          value={values.treatedbBy}
                          onChange={handleChange}
                        >
                        {
                          treatedBy.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                        }

                        </Select>
                      </FormControl>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         If not treated at scene, why not?
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="ifNotTreatedAtScene"
                          id="dependson-select"
                          fullWidth
                          value={values.ifNotTreatedAtScene}
                          onChange={handleChange}
                        >
                        {
                          noTreatmentScene.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                        }
                        </Select>
                      </FormControl>
                  </Grid>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Clinical outcome
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="clinicalOutcome"
                          id="dependson-select"
                          fullWidth
                          value={values.clinicalOutcome}
                          onChange={handleChange}
                        >
                          {
                            clinicalOutcome.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                  </Grid>

                  </Grid>
                </Paper>

                <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                  <Typography sx={{ marginBottom:1}} variant="h2">If went to the Hospital</Typography>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Time (in minutes) between crash and arrival at hospital
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                          fullWidth
                        >
                          <TextField
                            id="outlined-adornment-name-user-create"
                            type="number"
                            name="timeCrashAndArrivalHospital"
                            value={values.timeCrashAndArrivalHospital}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </FormControl>
                  </Grid>


                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Transport Vehicle
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="transportVehicle"
                          id="dependson-select"
                          fullWidth
                          value={values.transportVehicle}
                          onChange={handleChange}
                        >

                          {
                            hospitalVehicle.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                          }
                        
                        </Select>
                      </FormControl>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Who accompanied the patient?
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="whoAccompaniedThePatient"
                          id="dependson-select"
                          fullWidth
                          value={values.whoAccompaniedThePatient}
                          onChange={handleChange}
                        >

                          {
                            acompany.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                          }

                        </Select>
                      </FormControl>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Hospital Type
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="hospitalType"
                          id="dependson-select"
                          fullWidth
                          value={values.hospitalType}
                          onChange={handleChange}
                        >

                          {
                            hospitalType.map((item:any)=><MenuItem value={item.value}>{langString(`${item.value}`)}</MenuItem>)
                          }
                        </Select>
                      </FormControl>
                  </Grid>
                  </Grid>


                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h5"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Appropriate Receiving Hospital?
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="appropriateReceivingHospital"
                          id="dependson-select"
                          fullWidth
                          value={values.appropriateReceivingHospital}
                          onChange={handleChange}
                        >
                          
                        <MenuItem value={1}>{langString(`Yes`)}</MenuItem>
                        <MenuItem value={0}>{langString(`No`)}</MenuItem>
                        </Select>
                      </FormControl>
                  </Grid>
                  </Grid>

                </Paper>
    
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
                      onClick={() => navigate(`/incident-report/profile/${param.id}`, { replace: true })}
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
                </>
              </form>
            )}
          </Formik>
        </Wrapper>
    );
};

export default PatientForm;