import DateRangePicker, { DateRange } from "@mui/lab/DateRangePicker";
import { Box, Button, Grid, InputAdornment, TextField, Tooltip, Typography } from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import BasicDataTable, { ColumnType } from "components/common/BasicDataTable";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import {  serializeValidData } from "utils/Helpers";
import langString from "utils/langString";
import SearchIcon from "@mui/icons-material/Search";

import {
  IconFolderPlus,
  IconEye,
  IconTrash,
  IconReportMedical
} from "@tabler/icons"; 
import ConfirmButton from "components/common/ConfirmButton";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "store/actions";
import DeleteButton from "components/common/DeleteButton";

export default function Reports() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [fromDateRange, setFromDateRange] = useState<any>();
  const [select, setSelect] = useState(false)
  const [toDateRange, setToDateRange] = useState<any>();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string>('');
  const [startIndex, setStartIndex] = useState(0);
  const [flag, setFlag] = useState(false);
  const dispatch = useDispatch()


  const Columns: ColumnType[] = [
    {
      header: "SL No",
      accessor: "id",
      content: (item: any) => <Typography>{rows.indexOf(item)+ startIndex + 1}</Typography>
    },
    {
      header: "Emergency ID",
      accessor: "id",
      content: (item: any) => <Typography>{item.em_id}</Typography>
    },
    {
      header: "Location",
      accessor: "location",
      content: (item: any) => <Typography>{item.landmark_name}</Typography>
    },
    {
      header: "Injured",
      accessor: "injured",
      content: (item: any) => <Typography>{item.injury_count}</Typography>
    },
    {
      header: "Caller No",
      accessor: "call",
      content: (item: any) => <Typography>{item.phone_num}</Typography>,
    },
    {
      header: "Case Status",
      accessor: "casestatus",
      content: (item: any) => (
        <Typography noWrap style={{color:"#00C853"}} variant="h4" textAlign={"center"}>
          Open
        </Typography>
      ),
    },
    {
      header: "Response",
      accessor: "response",
      content: (item: any) => (
         !item.response ? <Button onClick={()=>handleResponse(item)} variant="contained" color="error" >
        Pending
      </Button>:<Button color="primary" variant="contained">
      Response
    </Button>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      content: (item: any) => (
        <>
        {
          item.has_details && <Tooltip title="Incident View">
          <Button 
            component={Link}
            color="secondary"
            to={`/incident-report/${item.incident_uuid}/incident-view`}
            size="small"
            sx={{ marginLeft: 0.5 }}
          >
            <IconEye size={28}
            strokeWidth={2}
            color="#1faa59"/>
          </Button>
          </Tooltip>
        }
        
        {
          !item.has_details && <Tooltip title="Incident Information">
          <Button 
            component={Link}
            color="success"
            to={`/incident-report/${item.incident_uuid}/incident-form`}
            size="small"
            sx={{ marginLeft: 0.5 }}
          >
            <IconFolderPlus size={28}
            strokeWidth={2}
            color="#00e676"/>
          </Button>
          </Tooltip>
        }
      <Tooltip title="Patient Information">
        <Button 
          component={Link}
          color="primary"
          to={`/incident-report/profile/${item.incident_uuid}`}
          size="small"
          sx={{ marginLeft: 0.5 }}
        >
          <IconReportMedical size={28}
          strokeWidth={2}
          color="#fc6203"/>
        </Button>
        </Tooltip>
        
        <Tooltip title="Incident Delete">
        <DeleteButton 
          subTitle={`Delete Incident: ${item.em_id}`}
          confirmed={() => deleteListItem(item.incident_uuid)}
        />

        </Tooltip>
        </>
      ),
    },
  ];


  const deleteListItem = async (uuid: string) => {
    if (uuid) {
      setLoading(true);
      try {
        const postData = serializeValidData("incidents", { "incident":{uuid:uuid} });
        const response = await axiosServices.post(
          `incident/delete`,
          postData,
        );
        if (response.status === 200) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "Incident deleted successfully.",
            variant: "alert",
            alertSeverity: "success",
          });
          const allRows = [...rows];
          const filtered = allRows.filter((item: any) => item.incident_uuid !== uuid);
          
          setRows(filtered);
          setLoading(false);
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Incident have patient information",
          variant: "alert",
          alertSeverity: "error",
        });
      }
    }
  };


  const handleResponse= async(item:any)=>{
    setSelect(item.incident_uuid)
    try {
      setLoading(true);
      const postData = serializeValidData("incidents",{incident: {
        uuid: item.incident_uuid,
        response: true
      }});
      const response = await axiosServices.post(
        "incident/update",
        postData
      );
      if (response.status === 200) {
        setFlag(!flag);
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Response Updated",
          variant: "alert",
          alertSeverity: "success",
        });
      }
      setLoading(false);
    }
     catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const response = await axiosServices.post(
          `incident/get-all?limit=${rowsPerPage}&currentPage=${page + 1}`
        );
        if (response.status === 200) {
          if (response.data) {
            setCount(response.data.paginationInfo.totalData);
            setRows(response.data?.incidentList);
            setStartIndex(response.data?.paginationInfo.startIndex);
          }
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, [
    page,
    rowsPerPage,
    flag
  ]);


  const handleFilter=()=>{
    const body = {    
      searchString: search,
      from: fromDateRange,
      to: toDateRange
    }
    axiosServices.post('incident/search',body).then((response)=>{
      setCount(response.data.paginationInfo.totalData);
      setRows(response.data?.incidentList);
      setStartIndex(response.data?.paginationInfo.startIndex);
    }).catch((error)=>{
      console.log(error)
    })
  }


  const handleSearch =(value:string)=>{
    setSearch(value);
    const body = {searchString: value}
    axiosServices.post('incident/search',body).then((response)=>{
      setCount(response.data.paginationInfo.totalData);
      setRows(response.data?.incidentList);
      setStartIndex(response.data?.paginationInfo.startIndex);
    }).catch((error)=>{
      console.log(error)
    })
  }


  return (
    <Wrapper title={`${langString("Reports")} `}>
      {loading && <Loader />}
      
        <Grid container>
        <Grid sm={2}>
          <Typography variant="h4">Report Filter By Date Range</Typography>
        </Grid>
        <Grid
            item
            xs={3}
            sm={2}
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            <Typography>From</Typography>
            <TextField type="date" onChange={(e)=>setFromDateRange(e.target.value)}/>
          </Grid>
          <Grid
            item
            xs={3}
            sm={2}
            sx={{ marginBottom: 2, textAlign: "left" }}
          >
            <Typography>To</Typography>
            <TextField type="date" onChange={(e)=>setToDateRange(e.target.value)}/>
          </Grid>
          <Grid
            item
            xs={3}
            sm={2}
            sx={{ textAlign: "left", padding:"20px"}}
          >
            <Button variant="contained" onClick={handleFilter}>Filter</Button>
          </Grid>
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
            placeholder="Search Incident"
            size="small"
          />
          </Grid>
        </Grid>
      <Box sx={{ marginTop: 1 }}>
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
}
