
import { useParams } from 'react-router-dom';
import { Box, Button, Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import BasicDataTable, { ColumnType } from "components/common/BasicDataTable";
import ConfirmButton from "components/common/ConfirmButton";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { serializeValidData } from "utils/Helpers";
import SearchIcon from "@mui/icons-material/Search";
import langString from "utils/langString";
import { gridSpacing } from 'store/constant';
import { RootState } from 'types/vehicaleField';

const IncidentProfile = () => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<any[]>([]);
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState<string>('');
    const [details, setDetails] = useState<any>([]);
    const [startIndex, setStartIndex] = useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const param = useParams();

    const Columns: ColumnType[] = [
        {
          header: "SL No",
          accessor: "id",
          content: (item:any) => <Typography>{rows.indexOf(item)+ startIndex + 1}</Typography>
        },
        { header: "Name", accessor: "name" },
        {
          header: "Age",
          accessor: "age",
          content: (item: any) => <Typography>{item.age}</Typography>,
        },
        {
          header: "Gender",
          accessor: "Gender",
          content: (item: any) => <Typography>{item.gender}</Typography>,
        },
        {
          header: "Injury Type",
          accessor: "injuryType",
          content: (item: any) => <Typography>{item.injury_severity}</Typography>,
        },
        {
          header: "Hospital Type",
          accessor: "hospital",
          content: (item: any) => <Typography>{item.hospital_type}</Typography>,
        },
        {
          header: "Action",
          accessor: "action",
          content: (item: any) => (
            <Box display="flex" sx={{ justifyContent: 'space-around' }}>
              <Button
                component={Link}
                variant="contained"
                color="primary"
                to={`/incident-report/profile/${param.id}/patient-view/${item.uuid}`}
                size="small"
              >
                View
              </Button>
              <Button
                component={Link}
                variant="contained"
                color="secondary"
                to={`/incident-report/profile/${param.id}/patient-form-edit/${item.uuid}`}
                size="small"
                sx={{ marginLeft: 0.5 }}
              >
                Edit
              </Button>
              <ConfirmButton
                subTitle={`Delete Patient Location: ${item.name}`}
                confirmed={() => deleteListItem(item.uuid)}
              />
            </Box>
          ),
        },
      ];


      useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const postData = { incidentUuid: param.id }
            const response = await axiosServices.post(
              `patient/get-all?limit=${rowsPerPage}&currentPage=${page + 1}`, postData
            );
            if (response.status === 200) {
              if (response.data) {
                setCount(response.data.paginationInfo?.totalData);
                setRows(response.data?.patientList);
                setStartIndex(response.data?.paginationInfo.startIndex);
              }
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, [page, rowsPerPage]);
    

      useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const postData = { uuid: param.id }
            
            const response = await axiosServices.post(
              `incident/get-all`,
              postData
            );
            if (response.status === 200) {
  
              setDetails(response.data.incidentList[0]);
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, [param.id]);

    
      const handleSearch =(value:string)=>{
        setSearch(value);
        const body = {searchString: value}
        axiosServices.post('patient/search',body).then((response)=>{
          setCount(response.data.paginationInfo.totalData);
          setRows(response.data?.patientList);
          setStartIndex(response.data?.paginationInfo.startIndex);
        }).catch((error)=>{
          console.log(error)
        })
      }



      const deleteListItem = async (uuid: string) => {

          setLoading(true);
          try {
            const postData = serializeValidData("Patient", { "Patient":{uuid:uuid} });
            const response = await axiosServices.post(
              `patient/delete`,
              postData,
            );
            if (response.status === 200) {
              dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: "Patient deleted successfully.",
                variant: "alert",
                alertSeverity: "success",
              });
              const allRows = [...rows];
              const filtered = allRows.filter((item: any) => item.uuid !== uuid);
              
              setRows(filtered);
              setLoading(false);
            }
          } catch (error: any) {
            setLoading(false);
            console.log(error)
            if(error){
              dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: "Patient Delete Failed",
                variant: "alert",
                alertSeverity: "error",
              });
            }
          }

      };


    return (
        <Wrapper title='Incident Profile' addLink={`/incident-report/profile/${param.id}/patient-form`} backLink={`/reports/incidents-report`}>

            {loading && <Loader />}

            <Paper elevation={4} sx={{ padding: 3, margin:2 }}>
                <Grid container spacing={gridSpacing} sx={{ marginTop: "5px" }}>
                  
                  <Grid  xs={6} md={6} item display="flex">
                    <Typography variant={"h2"}>Incident Id : </Typography>
                    <Typography variant="h2" sx={{ml:2, color:"#357e2a"}}> {details.em_id}</Typography>
                  </Grid>
                  <Grid  xs={6} md={6} alignContent="end" item display="flex">
                    <Typography variant="h2" align='right'>Zone Name : </Typography>
                    <Typography variant="h2" sx={{ml:2, color:"#357e2a"}}> {details.zone_name}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "10px" }}>
                  <Grid  xs={6} md={6} item display="flex">
                    <Typography variant="h2">Injured patient : </Typography>
                    <Typography variant="h2" sx={{ml:2, color:"#357e2a"}}> {details.injury_count}</Typography>
                  </Grid>
                  <Grid  xs={6} md={6} alignContent="end" item display="flex">
                    <Typography variant="h2" align='right'>Location Of Crash : </Typography>

                    <Typography variant="h2" sx={{ml:2, color:"#357e2a"}}> {details.landmark_name}</Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={gridSpacing} sx={{ marginTop: "10px" }}>
                  <Grid item xs={6} md={6} display="flex">
                    <Typography variant="h2">Caller:</Typography>
                    <Typography variant="h2" sx={{ml:2, color:"#357e2a"}}> {details.caller}</Typography>
                  </Grid>
                  <Grid item  xs={6} md={6} alignContent="end" display="flex">
                    <Typography variant="h2" align='right'>Vehicle :</Typography>
                    <Typography variant="h2" sx={{ml:2, color:"#357e2a"}}> {}</Typography>
                  </Grid>
                </Grid>
            </Paper>

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
                    placeholder="Search Patient"
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
    );
};

export default IncidentProfile;