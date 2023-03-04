import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import BasicDataTable, { ColumnType } from "components/common/BasicDataTable";
import ConfirmButton from "components/common/ConfirmButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { SERVICEPROVIDERS } from "utils/Constants";
import {  serializeValidData } from "utils/Helpers";
import langString from "utils/langString";
import SearchIcon from "@mui/icons-material/Search";

export default function ServiceList() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Columns: ColumnType[] = [
    {
      header: "SL No",
      accessor: "id",
      content: (item:any) => <Typography>{rows.indexOf(item)+ startIndex + 1}</Typography>
    },
    {
      header: "Responder Id",
      accessor: "responderId",
      content: (item: any) => <Typography>{item.res_id}</Typography>,
    },
    { 
      header: "Responder Name", 
      accessor: "name",
      content: (item: any) => <Typography>{item.responder_name}</Typography>
    },
    {
      header: "Contact Number",
      accessor: "contact",
      content: (item: any) => <Typography>{item.responder_phone_number}</Typography>,
    },
    {
      header: "Zone",
      accessor: "zone",
      content: (item: any) => <Typography>{item.zone_name}</Typography>,
    },
    {
      header: "Status",
      accessor: "status",
      content: (item: any) => <Typography>{item.responder_status === true ? "Active" : "Inactive"}</Typography>
    },
    
    {
      header: "Action",
      accessor: "action",
      content: (item: any) => (
        <Box display="flex" sx={{ justifyContent: 'space-around' }}>
          {/* <Button
            component={Link}
            variant="contained"
            color="primary"
            to={`/service-details/${item.id}`}
            size="small"
          >
            View
          </Button> */}
          
          <Button
            component={Link}
            variant="contained"
            color="secondary"
            to={`/responder/edit/${item.responder_id}`}
            size="small"
            sx={{ marginLeft: 0.5 }}
          >
            Edit
          </Button>
          
           <ConfirmButton
            subTitle={`Responder Name: ${item.responder_name}`}
            confirmed={() => deleteListItem(item.responder_id)}
          />
          
          
        </Box>
      ),
    },
  ];


  const deleteListItem = async (id: string) => {
    if (id) {
      setLoading(true);
      try {
        const postData = serializeValidData("responders", { "responder":{uuid:id} });
        console.log(postData)
        const response = await axiosServices.post(
          `responder/delete`,
          postData,
        );
        if (response.status === 204) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "Responder deleted successfully.",
            variant: "alert",
            alertSeverity: "success",
          });
          const allRows = [...rows];
          const filtered = allRows.filter((item: any) => item.responder_id !== id);
          setRows(filtered);
          setLoading(false);
          console.log(filtered);
          navigate('/responder', {replace: true})
        }
      } catch (error: any) {
        setLoading(false);
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: error,
          variant: "alert",
          alertSeverity: "error",
        });
      }
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const response = await axiosServices.post(
          `responder/get-all?limit=${rowsPerPage}&currentPage=${page + 1}`
        );
        if (response.status === 200) {
          if (response.data) {
              setCount(response.data.paginationInfo.totalData);
              setRows(response.data?.responderList);
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

  const handleSearch =(value:string)=>{
    setSearch(value);
    const body = {searchString: value}
    axiosServices.post('responder/search',body).then((response)=>{
      setCount(response.data.paginationInfo.totalData);
      setRows(response.data?.responderList);
      setStartIndex(response.data?.paginationInfo.startIndex);
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <Wrapper title={langString("Feedback")} addLink="/feedback/add" >
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
            placeholder="Search Responder"
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
}
