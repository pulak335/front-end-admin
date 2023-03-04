import React, { useEffect, useState } from "react";
// material-ui
import { Box, Button, Grid, InputAdornment, makeStyles, TextField, Typography } from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import BasicDataTable, { ColumnType } from "components/common/BasicDataTable";
import SearchBox from "components/common/SearchBox";
import { Deserializer } from "jsonapi-serializer";
import { useDispatch, useSelector } from "react-redux";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import langString from "utils/langString";
import Gmap from "./Gmap";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addCaseEntryReducer } from 'store/caseEntry';
import { serializeValidData } from "utils/Helpers";
import { SNACKBAR_OPEN } from "store/actions";
import { useNavigate } from "react-router-dom";
import TableCollapsible from "ui-component/Tables/TableCollapsible";
import SearchIcon from "@mui/icons-material/Search";

// ==============================|| FORM WIZARD - BASIC  ||============================== //







export default function InjuredLocation() {

    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<any[]>([]);
    const [nearResponder, setNearResponder] = useState<any>()
    const [count, setCount] = useState(50);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = useState<any>(false);
    const [selected, setSelected] = useState<any>('');
    const [search, setSearch] = useState<string>('');
    const [selectedMark, setSelectedMark] = useState<any>('')




    const getCase:any = useSelector(state=>state)
    const incidentInformation = getCase.case;

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

    const handleSubmit = () => {
      setOpen(false);
      postInsdentData();
    };

    const handleClose = () => {
      setOpen(false);
    }



    const handleCheckLocation = async (item:any):Promise<any> => {
        const landmarkData:any = {fieldName:"landmark", value:item.landmark_uuid}
        dispatch(addCaseEntryReducer(landmarkData))
        setOpen(item.landmark_uuid)
        setSelected(item.landmark_uuid)
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


    const handleMarkLocation = (item:any):any => {
      let element = document.getElementById("box")
      if (element) {
        element.scrollIntoView(true)
      }

      setSelectedMark(item)
    }

    const Columns: ColumnType[] = [
        { 
          header: "Check", 
          accessor: "checked",
          content:(item:any)=> <Button onClick={()=>handleCheckLocation(item)} color="success" variant="contained">Select</Button>
        },
        {
          header: "Landmark Name",
          accessor: "name",
          content: (item:any) => <Button 
          onClick={()=> handleMarkLocation(item)} color="success"
          >{item.landmark_name}</Button>,
        },
        {
          header: "Zone",
          accessor: "zone",
          content: (location: any) => <Typography>{location.zone_name}</Typography>,
        }
      ];

      
      useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `landmark/get-all?limit=${rowsPerPage}&currentPage=${page + 1}`
            );
            if (response.status === 200) {
              if (response.data) {
                setCount(response.data.paginationInfo.totalData);
                setRows(response.data?.landmarkList);
              }
              setLoading(false)
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, [page, rowsPerPage]);


      const handleSearch =(value:string)=>{
        setSearch(value);
        const body = {searchString: value}
        axiosServices.post('landmark/search',body).then((response)=>{
          setCount(response.data.paginationInfo.totalData);
          setRows(response.data?.landmarkList);
        }).catch((error)=>{
          console.log(error)
        })
      }


    return (
        <div id="box">


            <Typography variant="h1" gutterBottom sx={{ mb: 2 }}>
              Provide Location details
            </Typography>
            
              <Gmap selectedMark={selectedMark} location={rows} setSelectedMark={setSelectedMark}/>

            <Wrapper title={langString("Location")}>
            {loading && <Loader />}
            <Box sx={{ marginTop: 1 }}>
                <Grid container>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    sx={{ marginBottom: 2, textAlign: "right" }}
                >
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e)=>handleSearch(e.target.value)}
                  placeholder="Search Zone"
                  size="small"
                />
                </Grid>
                </Grid>
                <BasicDataTable
                columns={Columns}
                rows={rows}
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={(value: number) => setPage(value)}
                setRowsPerPage={(value: number) => setRowsPerPage(value)}
                />
            </Box>
            </Wrapper>
      <div>
        {
          rows.filter(row => row.landmark_uuid == selected).map(item =>(
            <Dialog
            sx={{
              "& .MuiDialog-container": {
                "& .MuiPaper-root": {
                  width: "100%",
                  maxWidth: "900px",
                },
              },
            }}
            key={item.landmark_uuid}
            open={open}
            onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Button onClick={handleClose} color="error" variant="contained" style={{width:'20%',marginLeft:'20px'}}>Close</Button>
          <DialogTitle id="alert-dialog-title">
          {`${item.landmark_name} in ${item.zone_name}`} zone.
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
          ))
            }
      </div>  
        </div>
    );
}



