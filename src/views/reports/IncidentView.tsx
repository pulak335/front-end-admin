import { FormControl, Grid, Paper, TextField, Typography } from '@mui/material';
import Wrapper from 'components/Card/Wrapper';
import React,{useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { gridSpacing } from 'store/constant';
import axiosServices from 'utils/axiosServices';

const IncidentView = () => {
    const [details, setDetails] = useState<any>([])
    const [loading, setLoading] = useState(false);
    const [vehicle, setVehicle] = useState<any[]>([]);
    const param = useParams();
    
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
              setVehicle(response.data?.vehicleList)
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
        <Wrapper title="Incident Information Details" editLink={`/incident-report/${param.id}/incident-edit`} backLink="/reports/incidents-report">
            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                    <Typography sx={{ marginBottom:4}} variant="h2">Incident Identification</Typography>
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={6} md={2}>
                        <Typography
                            variant="h2"
                            sx={{ marginTop: 2, textAlign: "right" }}
                        >
                            Date of Crash and Time: 
                        </Typography>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.dateAndTime && `${details.dateAndTime}` }</Typography>
                        </Grid>

                        <Grid item xs={6} md={2}>

                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Time of Volunteer Arrival at Scene: 
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={4}>
                        <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.timeofArrival}</Typography>
                        </Grid>
                    </Grid>


                    <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Upzilla: 
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={4}>
                        <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.upazila}</Typography>
                   </Grid>

                <Grid item xs={6} md={2}>
                  <Typography
                    variant="h2"
                    sx={{ marginTop: 2, textAlign: "right" }}
                  >
                    Zone: 
                  </Typography>
                </Grid>
                <Grid item xs={6} md={4}>
                    <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.zoneName}</Typography>
                </Grid>
                    </Grid>

                  <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Location of Crash:
                      </Typography>
                    </Grid>
    
                    <Grid item xs={6} md={4}>
                    <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.location}</Typography>
                    </Grid>

                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Caller: 
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={4}>
                    <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.caller}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Volunteer Data</Typography>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Number of Volunteers Present
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={2}>
                  <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.volunteerCount}</Typography>
                    </Grid>

                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Volunteer Response Time (From crash) (minutes)
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={2}>
                      
                        <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.timeofArrival}</Typography>
                    </Grid>


                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Volunteer Communication: 
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={2}>
                  <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.communicationMethod}</Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Field Staff Data</Typography>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Number of Field Staff Present: 
                      </Typography>
                    </Grid>
    
                  <Grid item xs={6} md={4}>
                        <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.fieldStaffCount}</Typography>
                    </Grid>

                    <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Field Staff Response Time (minutes): 
                      </Typography>
                    </Grid>
    
                    <Grid item xs={6} md={4}>
                    <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.fieldStaffResponseTime && `${details.fieldStaffResponseTime} mins` } </Typography>
                    </Grid>

                </Grid>
            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Injured Data</Typography>


                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Total number of vehicle occupants: 
                      </Typography>
                </Grid>
    
                <Grid item xs={6} md={4}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.vehicleOccupantCount}</Typography>
                </Grid>
                
                <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Total number of injured: 
                      </Typography>
                </Grid>
    
                <Grid item xs={6} md={4}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.totalInjuredCount}</Typography>
                </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Number of injured receiving treatment at the scene by TL staff and released to go home:
                      </Typography>
                </Grid>
    
                <Grid item xs={6} md={4}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.tlTreatReleaseCount}</Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                      <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                      >
                        Number of injured who received treatment and taken to hospital later by TL staff:
                      </Typography>
                </Grid>
    
                <Grid item xs={6} md={4}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.tlTreatHospitalCount}</Typography>
                </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                <Grid item xs={6} md={2}>
                    <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Number of injured sent to hospital immediately by TL staff without treatment: 
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.noTreatHospitalCount}</Typography>
                </Grid>


                <Grid item xs={6} md={2}>
                    <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Number of injured who refused treatment due to low injury severity: 
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.noTreatCount}</Typography>
                </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>

                <Grid item xs={6} md={2}>
                    <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Number of injured who refused treatment and went to hospital:
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.noTreatCount}</Typography>
                </Grid>


                <Grid item xs={6} md={2}>
                    <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Number dead at the scene
                    </Typography>
                </Grid>

                <Grid item xs={6} md={4}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.casualtyCount}</Typography>
                </Grid>
                </Grid>

            </Paper>

            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Other responders</Typography>


                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>


                <Grid item xs={6} md={2}>
                    <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Were the Local Police Present:
                    </Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.localPolicePresent ? 'Yes' : 'No'}</Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                    <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Were the Highway Police Present:
                    </Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.highwayPolicePresent ? 'Yes' : 'No'}</Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                    <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "right" }}
                    >
                        Was the Fire Brigade Present:
                    </Typography>
                </Grid>

                <Grid item xs={6} md={2}>
                <Typography variant="h2" sx={{ marginTop: 2, textAlign: "left",color:"#357e2a" }}>{details.fireBrigadePresent ? 'Yes' : 'No'}</Typography>
                </Grid>

                </Grid>

            </Paper>
            {vehicle.length !== 0 ?
            <Paper elevation={2} sx={{ padding: 3, margin:2 }}>
                <Typography sx={{ marginBottom:1}} variant="h2">Number of Vehicles Involved in Crash</Typography>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
            
                <Grid item xs={6} md={3}>
                <Typography
                        variant="h2"
                        sx={{ marginTop: 2, textAlign: "left" }}
                    >
                        Number of Vehicles Involved in Crash
                    </Typography>
                </Grid>

                {
                  vehicle.map((item:any)=> <Grid item xs={6} md={7}><Typography sx={{ marginBottom:1}} variant="h3">`${item.name}: ${item.number}`</Typography>
                  
                </Grid>)
                }
                </Grid>

            </Paper>: null
          }
        </Wrapper>
    );
};

export default IncidentView;