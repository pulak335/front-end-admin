import React,{useEffect, useState} from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axiosServices from 'utils/axiosServices';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TableCollapsible from 'ui-component/Tables/TableCollapsible';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serializeValidData } from 'utils/Helpers';
import { SNACKBAR_OPEN } from 'store/actions';
import { addCaseEntryReducer } from 'store/caseEntry';

const containerStyle = {
    width: '100% ',
    height: '500px'
  };
  
  const markStyle = {
    background: '#FBBC04'
  };

  const center = {
    lat: 23.770,
    lng: 90.482
  };



  const Gmap =({selectedMark,setSelectedMark}:any)=>{

    const [loading, setLoading] = useState<boolean>(false)
    const [landmark, setLandmark] = useState<any[]>([])
    const [open, setOpen] = useState<any>(false);
    const [nearResponder, setNearResponder] = useState<any>()

    const dispatch = useDispatch()
    const navigate = useNavigate()

      
  const getCase:any = useSelector(state=>state)
  const incidentInformation = getCase.case;


    

    useEffect(() => {
      const init = async () => {
        setLoading(true);
        try {
          const response = await axiosServices.post(
            `landmark/get-all`
          );
          if (response.status === 200) {
            if (response.data) {
              setLandmark(response.data?.landmarkList);
            }
            setLoading(false)
          }
          
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
      init();
    }, []);

    const postInsdentData= async()=>{
      try {
        const postData = serializeValidData("incidents",{incident:incidentInformation});
        const response = await axiosServices.post("incident/create",postData);
        if (response.status === 201) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "Incident Created Successfully",
            variant: "alert",
            alertSeverity: "success",
          });
          navigate("/reports/incidents-report", { replace: true });
        }
        setLoading(false);
      } catch (error:any) {
        console.log(error.message);
        setLoading(false);
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Incident Create Failed",
          variant: "alert",
          alertSeverity: "error",
        });
      }
    }

    const handleMarkPossition =async (item:any)=>{
        setSelectedMark(item)
        setOpen(true)

        const landmarkData:any = {fieldName:"landmark", value:item.landmark_uuid}
        dispatch(addCaseEntryReducer(landmarkData))
        const body: any = {
          latitude: item.landmark_latitude,
          longitude: item.landmark_longitude
        };

        try {
          setLoading(true);
          const response = await axiosServices.post(
            "landmark/nearest",
            body
          );
          if (response.status === 200) {
            setNearResponder(response.data)
          }
          setLoading(false);
        } catch (err: any) {
          console.log(err);
        }
    }


    const handleClose = () => {
      setSelectedMark(null)
      setOpen(false);
    }

    const handleSubmit = () => {
      setOpen(false);
      postInsdentData();
    };
    
    return (
      <>
        <LoadScript
          googleMapsApiKey="AIzaSyDOfmq8hhctB3HYvvnyylCRkzblizYM_d8"
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
          >
        {
        selectedMark ? <Marker
         position={{lat:parseFloat(selectedMark?.landmark_latitude),lng:parseFloat(selectedMark?.landmark_longitude)}}/> : landmark.map((item: any)=><Marker onClick={()=>handleMarkPossition(item)} position={{lat:parseFloat(item?.landmark_latitude),lng:parseFloat(item?.landmark_longitude)}}
         /> )
        }
          </GoogleMap>
        </LoadScript>




          <div style={{width:"450px"}}>
          {
            selectedMark && 
              <Dialog
              sx={{
                "& .MuiDialog-container": {
                  "& .MuiPaper-root": {
                    width: "100%",
                    maxWidth: "900px",
                  },
                },
              }}
              key={selectedMark.landmark_uuid}
              open={open}
              onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <Button onClick={handleClose} color="error" variant="contained" style={{width:'20%',marginLeft:'20px'}}>Close</Button>
            <DialogTitle id="alert-dialog-title" style={{lineHeight:"20px"}}>
              {`${selectedMark.landmark_name} in ${selectedMark.zone_name}`} zone.
            </DialogTitle>
            <DialogContent>
              <hr/>
              <TableCollapsible nearResponder={nearResponder}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>handleSubmit()} autoFocus>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
              }
          </div> 
          </> 
      )
  }


// {id: 3, uuid: '7d2c0427-71d8-47e1-a2c4-034544b758b3', name: 'Chillox', longitude: '2332.234', latitude: '223.325', …}

  export default Gmap;