import { Grid, Paper, Typography } from '@mui/material';
import Wrapper from 'components/Card/Wrapper';
import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import axiosServices from 'utils/axiosServices';

const PatientView = () => {
    const [details, setDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const param = useParams();


    useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const postData = { uuid: param.id, incidentUuid: param.iid }
            
            const response = await axiosServices.post(
              `patient/get-all`,
              postData
            );
            if (response.status === 200) {
              setDetails(response.data.patientList[0]);
              console.log(response.data.patientList[0])
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
        <Wrapper title='Patient Profile' backLink={`/incident-report/profile/${param.iid}`}>
            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                  <Typography sx={{ marginBottom:1}} variant="h2">Patient Information</Typography>
                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Patient ID: 
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.patient_id }</Typography>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Patient Name:
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.name }</Typography>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Age:
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.age }</Typography>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Gender
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.gender }</Typography>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Type of Road User:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.type_of_vehicle_user }</Typography>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                          Location in vehicle:
                        </Typography>
                  </Grid>
      
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.location_in_vehicle}</Typography>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Injury Severity Rating: 
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.injury_severity}</Typography>
                  </Grid>

                  
                  </Grid>
                </Paper>

                <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                  <Typography sx={{ marginBottom:1}} variant="h2">Treatment Outcomes</Typography>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Did the patient receive treatment at the scene: 
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.treatment_at_scene ? 'Yes' : 'No'}</Typography>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Treated by:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.treated_by}</Typography>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         If not treated at scene, why not:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.reason_for_no_treatment}</Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Clinical outcome:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.clinical_outcome}</Typography>
                  </Grid>

                  </Grid>
                </Paper>

                <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                  <Typography sx={{ marginBottom:1}} variant="h2">If went to the Hospital</Typography>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Time (in minutes) between crash and arrival at hospital:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.arrival_delay && `${details?.arrival_delay} mins`}</Typography>
                  </Grid>


                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Transport Vehicle:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.patient_transport}</Typography>
                  </Grid>
                  </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Who accompanied the patient:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.patient_company}</Typography>
                  </Grid>

                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Hospital Type:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.hospital_type}</Typography>
                  </Grid>
                  </Grid>


                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                        <Typography
                          variant="h3"
                          sx={{ marginTop: 2, textAlign: "right" }}
                        >
                         Appropriate Receiving Hospital:
                        </Typography>
                  </Grid>
                  <Grid item xs={6} md={4}>
                  <Typography variant="h3" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details?.appropriate_hospital ? 'Yes' : 'No'}</Typography>
                  </Grid>
                  </Grid>

                </Paper>
        </Wrapper>
    );
};

export default PatientView;