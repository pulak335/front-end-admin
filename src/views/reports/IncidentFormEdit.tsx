import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Autocomplete,
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
    Typography
  } from "@mui/material";
  import Wrapper from "components/Card/Wrapper";
  import Required from "components/common/Required";
  import { Formik } from "formik";
  import { useEffect, useState } from "react";
  import { DefaultRootState, useDispatch, useSelector } from "react-redux";
  import { useNavigate, useParams } from "react-router-dom";
  import { SNACKBAR_OPEN } from "store/actions";
  import { gridSpacing } from "store/constant";
  import Loader from "ui-component/Loader";
  import axiosServices from "utils/axiosServices";
  import { serializeValidData } from "utils/Helpers";
  import langString from "utils/langString";
  import DateTimePicker from '@mui/lab/DateTimePicker';
  import TimePicker from '@mui/lab/TimePicker';
  import * as Yup from "yup";
  import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { addFieldReducer } from "store/vehicleFieldReducer";
import { indexOf } from "lodash";
import { RootState } from "types/vehicaleField";



const IncidentFormEdit = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [valueBasic, setValueBasic] = useState<any>();
    const [valueTime,setValueTime] = useState<any>();
    const [zones, setZones] = useState<any[]>([]);
    const [vehicle, setVehicle] = useState<any[]>([])
    const [vehicleValues, setVehicleValues] = useState<any[]>([])
    const [details, setDetails] = useState<any>([])
    const [vehicleDetails, setVehicleDetails] = useState<any>([])
    const [upzilla, setUpzilla] = useState<any[]>([])
    const [landmark, setLandmark] = useState<any[]>([])
    const [caller, setCaller] = useState<any[]>([])
    const [location, setLocation] = useState<any>([])
    const param = useParams();
    const getVehicleValues:any = useSelector((state:RootState) =>state.vehicleField)

    useEffect(() => {
      const init = async () => {
        setLoading(true);
        const postData = { type: "vehicle"}
        try {
          const response = await axiosServices.post(
            `data/get-all`,postData
          );
          if (response.status === 200) {
            setVehicleDetails(response.data?.dataList);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      init();
    }, []);

    //upzilla drop down data
    useEffect(() => {
      const init = async () => {
        setLoading(true);
        const postData = { type: "upazilla"}
        try {
          const response = await axiosServices.post(
            `data/get-all`,postData
          );
          if (response.status === 200) {
            setUpzilla(response.data?.dataList);
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      init();
    }, []);

  //caller drop down data
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const postData = { type: "caller"}
      try {
        const response = await axiosServices.post(
          `data/get-all`,postData
        );
        if (response.status === 200) {
          setCaller(response.data?.dataList);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, []);

    //landmark drop down data
    const handleLandmarkFilter = async (e:any) => {
      const postData={zone: e.target.value}
      setLoading(true);
      try {
        const response = await axiosServices.post(
          `landmark/get-all`, postData
        );
        if (response.status === 200) {
          setLandmark(response.data?.landmarkList);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };


    useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `zone/get-all`
            );
            if (response.status === 200) {
              setZones(response.data?.zoneList);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);
  
  
    useEffect(() => {
      const init = async () => {
        setLoading(true);
        try {
          const postData = { incidentUuid: param.id }
          
          const response = await axiosServices.post(
            `incident/get-details`,
            postData
          );
          console.log(response.data);

          if (response.status === 200) {
            setDetails(response.data?.incidentDetail);
            setValueTime(response.data?.incidentDetail.dateAndTime)
            setValueBasic(response.data?.incidentDetail.timeofArrival)
            setVehicle(response.data?.vehicleList)
            setLocation(response.data?.incident?.result[0])
            setLoading(false);
          }
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      init();
    }, [param.id]);


    const handleVihicaleChange=(e:any)=>{
      const att:any = e.target.name;
      const values:any = e.target.value;
      const body:any = { "fieldName":att ,value: values}
      dispatch(addFieldReducer(body))
      setVehicleValues(getVehicleValues)  
    }

    const dateValues = () =>{
      const date = new Date(valueTime)
      
      const day = date.getDate()
      const month = date.getMonth()+1
      const year = date.getFullYear()
      return month + "/" + day + "/" + year
    }


    const timeValues = () =>{
      const date = new Date(valueTime)
      const mins = date.getMinutes()
      const hour = date.getHours()

      if(mins.toString.length === 1){
        return hour + ":" + mins
      }
      else{
        return hour + ":" + mins
      }
    }

    return (
      
        <Wrapper title={`Incident Information Form ( Incident No: ${details.incident} )`} backLink="/reports/incidents-report">
            {loading && <Loader />}
            {details.volunteerCount && location.zone_uuid && location.landmark_uuid && 
            
          <Formik
            initialValues={{
                upazila: details.upazila,
                zone: location.zone_uuid,
                crashLandmark: location.landmark_uuid,
                volunNumberPresent:details.volunteerCount,
                volunNumberPresentTime:details.volunteerResponseTime,
                caller:details.caller,
                volumCom:details.communicationMethod,
                numberStaffPresent: details?.numberStaffPresent,
                numberStaffPresentTime:details.fieldStaffResponseTime,
                totalNumberOfVehicleOccupants:details.vehicleOccupantCount,
                totalNumberOfInjured:details.totalInjuredCount,
                numberOfInjuredReceivingTreatmentAndTakenToHospital:details.tlTreatReleaseCount,
                numberOfInjuredReceivingTreatment:details.tlTreatHospitalCount,
                refusedTreatmentDueToLowInjurySeverity:details.noTreatCount,
                hospitalImmediatelyByTlStaffWithoutTreatment:details.tlImmeHospitalCount,
                refusedTreatmentAndWentToHospital:details.noTreatHospitalCount,
                numberDeadAtTheScene:details.causalTyCount,
                localPolicePresent: !details.localPolicePresent ? 0 : 1,
                fireBrigadePresent: !details.fireBrigadePresent ? 0 : 1,
                highwayPolicePresent: !details.highwayPolicePresent ? 0 : 1,
                submit: null,
            }}
            validationSchema={Yup.object().shape({
              })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {

              const body: any = {
                  incidentDetail:{
                  uuid:details.uuid,
                  dateAndTime: valueTime && dateValues() +" "+ timeValues(),
                  timeofArrival: valueBasic && valueBasic.getHours() + ":" + valueBasic.getMinutes(),
                  upazila:values.upazila,
                  zoneName:values.zone,
                  location:values.crashLandmark,
                  volunteerCount:values.volunNumberPresent,
                  volunterResponseTime:values.volunNumberPresentTime,
                  caller:values.caller,
                  communicationMethod:values.volumCom,
                  numberStaffPresent:values.numberStaffPresent,
                  numberStaffPresentTime:values.numberStaffPresentTime,
                  vehicleOccupantCount:0,
                  totalInjuredCount:values.totalNumberOfInjured,
                  tlTreatHospitalCount:values.numberOfInjuredReceivingTreatmentAndTakenToHospital,
                  tlTreatReleaseCount:values.numberOfInjuredReceivingTreatment,
                  noTreatCount:values.refusedTreatmentDueToLowInjurySeverity,
                  tlImmeHospitalCount:values.hospitalImmediatelyByTlStaffWithoutTreatment,
                  noTreatHospitalCount:values.refusedTreatmentAndWentToHospital,
                  causalTyCount:values.numberDeadAtTheScene,
                  localPolicePresent:values.localPolicePresent,
                  fireBrigadePresent:values.fireBrigadePresent,
                  highwayPolicePresent:values.highwayPolicePresent,
              },
              incident: {
                landmark: details.landmark_uuid,
                uuid: param.iid
            },
            vehicle:vehicleValues
          };
  
              try {
                setLoading(true);
                const postData = serializeValidData("incidentDetails", body);
                const response = await axiosServices.post(
                  "incident/update-details",
                  postData
                );
                if (response.status === 200) {
                  dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message: "Incident Details Updated Successfully",
                    variant: "alert",
                    alertSeverity: "success",
                  });
                  navigate("/reports/incidents-report", { replace: true });
                }
                setLoading(false);
              } catch (err: any) {
                dispatch({
                  type: SNACKBAR_OPEN,
                  open: true,
                  message: "Incident Details Updated Failed",
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
                    <Typography sx={{ marginBottom:4}} variant="h2">Incident Identification</Typography>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6} md={2}>
                        <Typography
                            variant="h5"
                            sx={{ marginTop: 2, textAlign: "right" }}
                        >
                            Date of Crash and Time
                        </Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props:any) => <TextField fullWidth {...props} helperText="" disabled/>}
                                label="Date & Time"
                                value={valueTime}
                                onChange={(value:any) => {
                                    setValueTime(value)
                                }}
                                
                            />
                        </LocalizationProvider>
                        </Grid>

                        <Grid item xs={6} md={2}>

                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Time of Volunteer Arrival at Scene
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <TimePicker
                                renderInput={(props:any) => <TextField fullWidth {...props} helperText="" disabled/>}
                                label="Time"
                                value={valueBasic}
                                onChange={(value:any) => {

                                    setValueBasic(value)
                                }}
                                
                            />
                        </LocalizationProvider>
                    </Grid>
                    </Grid>


                    <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Upzilla
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                          {langString("Upazila")}
                        </InputLabel>
                        <Select
                          name="upazila"
                          id="dependson-select"
                          fullWidth
                          value={values.upazila}
                          label={langString("Upazila")}
                          onChange={handleChange}
                        >
                          
                        {
                          upzilla.map((item:any)=><MenuItem value={item.value}>{item.value}</MenuItem>)
                        }
                          
                        </Select>
                      </FormControl>
                    </Grid>

                <Grid item xs={6} md={2}>
                  <Typography
                    variant="h5"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    {langString("Zone")}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel id="dependson-select-label">
                      {langString("zone")}
                    </InputLabel>
                    <Select
                      name="zone"
                      id="dependson-select"
                      fullWidth
                      label={langString("Zone")}
                      value={values.zone}
                      onChange={(e)=>handleLandmarkFilter(e)}
                      onBlur={handleBlur}
                    >
                      {
                        zones.map((item: any) =><MenuItem value={item.uuid}>{langString(`${item.name}`)}</MenuItem>)
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
                        Location of Crash
                      </Typography>
                    </Grid>
    
                    <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                          {langString("Location of Crash")}
                        </InputLabel>
                        <Select
                          name="crashLandmark"
                          id="dependson-select"
                          fullWidth
                          value={values.crashLandmark}
                          label={langString("Location of Crash")}
                          onChange={handleChange}
                        >
                          
                        {
                          landmark.map((item:any)=><MenuItem value={item.uuid}>{item.name}</MenuItem>)
                        }
                          
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Caller
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                            Caller
                        </InputLabel>
                        <Select
                          name="caller"
                          id="dependson-select"
                          fullWidth
                          value={values.caller}
                          label={langString("caller")}
                          onChange={handleChange}
                        >
                          {
                            caller.map((item:any)=><MenuItem value={item.value}>
                            {item.value}
                          </MenuItem>)

                          }
                        </Select>
                      </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Volunteer Data</Typography>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Number of Volunteers Present
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={2}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="number"
                          label={langString("Number of Volunteers Present")}
                          name="volunNumberPresent"
                          value={values.volunNumberPresent}
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
                        Volunteer Response Time (From crash) (minutes)
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={2}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="number"
                          label={langString("Volunteer Response Time (From crash) (minutes)")}
                          name="volunNumberPresentTime"
                          value={values.volunNumberPresentTime}
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
                        Volunteer Communication
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={2}>
                      <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                            Volunteer Communication
                        </InputLabel>
                        <Select
                          name="volumCom"
                          id="dependson-select"
                          fullWidth
                          value={values.volumCom}
                          label={langString("Volunteer Communication")}
                          onChange={handleChange}
                        >
                          
                        <MenuItem value="call">{langString(`Call`)}</MenuItem>
                        <MenuItem value="sms">{langString(`SMS`)}</MenuItem>
                          
                        </Select>
                      </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Field Staff Data</Typography>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Number of Field Staff Present
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="number"
                          label={langString("Number of Field Staff Present")}
                          name="numberStaffPresent"
                          value={values.numberStaffPresent}
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
                        Field Staff Response Time (minutes)
                      </Typography>
                    </Grid>
    
                    <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="number"
                          label={langString("Field Staff Response Time (minutes)")}
                          name="numberStaffPresentTime"
                          value={values.numberStaffPresentTime}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                      </FormControl>
                    </Grid>

                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Injured Data</Typography>


                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                <Grid item xs={6} md={2}>
                      <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Total number of vehicle occupants
                      </Typography>
                </Grid>
    
                <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="number"
                          label={langString("Total number of vehicle occupants")}
                          name="totalNumberOfVehicleOccupants"
                          value={values.totalNumberOfVehicleOccupants}
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
                        Total number of injured
                      </Typography>
                </Grid>
    
                <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="number"
                          label={langString("Total number of injured")}
                          name="totalNumberOfInjured"
                          value={values.totalNumberOfInjured}
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
                        Number of injured receiving treatment at the scene by TL staff and released to go home
                      </Typography>
                </Grid>
    
                <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="number"
                          label={langString("receiving treatment")}
                          name="numberOfInjuredReceivingTreatment"
                          value={values.numberOfInjuredReceivingTreatment}
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
                        Number of injured who received treatment and taken to hospital later by TL staff
                      </Typography>
                </Grid>
    
                <Grid item xs={6} md={4}>
                      <FormControl
                        fullWidth
                      >
                        <TextField
                          id="outlined-adornment-name-user-create"
                          type="number"
                          label={langString("Number of injured who received treatment")}
                          name="numberOfInjuredReceivingTreatmentAndTakenToHospital"
                          value={values.numberOfInjuredReceivingTreatmentAndTakenToHospital}
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
                        Number of injured sent to hospital immediately by TL staff without treatment
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                    <FormControl
                        fullWidth
                    >
                        <TextField
                        id="outlined-adornment-name-user-create"
                        type="number"
                        label={langString("TL staff without treatment")}
                        name="hospitalImmediatelyByTlStaffWithoutTreatment"
                        value={values.hospitalImmediatelyByTlStaffWithoutTreatment}
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
                        Number of injured who refused treatment due to low injury severity
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                    <FormControl
                        fullWidth
                    >
                        <TextField
                        id="outlined-adornment-name-user-create"
                        type="number"
                        label={langString("low injury severity")}
                        name="refusedTreatmentDueToLowInjurySeverity"
                        value={values.refusedTreatmentDueToLowInjurySeverity}
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
                        Number of injured who refused treatment and went to hospital
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                    <FormControl
                        fullWidth
                    >
                        <TextField
                        id="outlined-adornment-name-user-create"
                        type="number"
                        label={langString("refused treatment and went to hospital")}
                        name="refusedTreatmentAndWentToHospital"
                        value={values.refusedTreatmentAndWentToHospital}
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
                        Number dead at the scene
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                    <FormControl
                        fullWidth
                    >
                        <TextField
                        id="outlined-adornment-name-user-create"
                        type="number"
                        label={langString("Number dead at the scene")}
                        name="numberDeadAtTheScene"
                        value={values.numberDeadAtTheScene}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        />
                    </FormControl>
                </Grid>
                </Grid>

            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Other responders</Typography>


                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>


                <Grid item xs={6} md={2}>
                    <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Were the Local Police Present?
                    </Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="localPolicePresent"
                          id="dependson-select"
                          fullWidth
                          value={values.localPolicePresent}
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
                        Were the Highway Police Present?
                    </Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                <FormControl
                        fullWidth
                      >
                        <InputLabel id="dependson-select-label">
                        </InputLabel>
                        <Select
                          name="highwayPolicePresent"
                          id="dependson-select"
                          fullWidth
                          value={values.highwayPolicePresent}
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
                        Was the Fire Brigade Present?
                    </Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                <FormControl
                        fullWidth
                      >
                        <Select
                          name="fireBrigadePresent"
                          id="dependson-select"
                          fullWidth
                          value={values.fireBrigadePresent}
                          onChange={handleChange}
                        >
                          
                        <MenuItem value={1}>{langString(`Yes`)}</MenuItem>
                        <MenuItem value={0}>{langString(`No`)}</MenuItem>
                          
                        </Select>
                      </FormControl>
                </Grid>

                </Grid>

            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Number of Vehicles Involved in Crash</Typography>
            
            
            
                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
            
                <Grid item xs={6} md={3}>
                <Typography
                        variant="h5"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Number of Vehicles Involved in Crash
                    </Typography>
                </Grid>

                <Grid item xs={6} md={7}>
                <FormControl
                        fullWidth
                      >

                        <Autocomplete
                                multiple
                                id="tags-outlined"
                                options={vehicleDetails}
                                getOptionLabel={(option) => option.value}
                                onChange={(event: any, newValue: any)=> setVehicle(newValue)}
                                filterSelectedOptions
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Select Vehicles"
                                  />
                                )}
                              />
                      </FormControl>
                </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                    {
                      vehicle.map((item:any)=>{

                        return(
                        <>
                          <Grid item xs={6} md={2}>
                          <Typography
                                variant="h5"
                                sx={{ marginTop: 2, textAlign: "right" }}
                            >
                            {item.value}
                          </Typography>
                          </Grid>
                          <Grid item xs={6} md={4}>
                          <FormControl
                          fullWidth
                        >
                            <TextField
                              id="outlined-adornment-name-user-create"
                              type="number"
                              name={`${item.id}`}
                              onChange={(e)=>handleVihicaleChange(e)}
                            />
                          </FormControl>
                          </Grid>
                        </>
                      )})
                    }

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
                      onClick={() => navigate("/reports/incidents-report", { replace: true })}
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
        }
        </Wrapper>
    );
};

export default IncidentFormEdit;






