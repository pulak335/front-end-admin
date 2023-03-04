import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import BasicDataTable, { ColumnType } from "components/common/BasicDataTable";
import ConfirmButton from "components/common/ConfirmButton";
// import SearchBox from "components/common/SearchBox";
// import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SNACKBAR_OPEN } from "store/actions";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { serializeValidData } from "utils/Helpers";
import SearchIcon from "@mui/icons-material/Search";
import langString from "utils/langString";

export default function ServiceList() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string>('');
  const [startIndex, setStartIndex] = useState(0);
  const dispatch = useDispatch()

  const Columns: ColumnType[] = [
    {
      header: "ID",
      accessor: "id",
      content: (item:any) => <Typography>{rows.indexOf(item)+ startIndex + 1}</Typography>
    },
    {
      header: "Role Name",
      accessor: "roleName",
      content: (item: any) => <Typography>{item.name}</Typography>,
    },
    {
      header: "Description",
      accessor: "description",
      content: (item: any) => <Typography>{item.description}</Typography>,
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
            to={`/admin/role-management/edit/${item.uuid}`}
            size="small"
            sx={{ marginLeft: 0.5 }}
          >
            Edit
          </Button>

           <ConfirmButton
            subTitle={`Delete Role Name: ${item.name}`}
            confirmed={() => deleteListItem(item.uuid)}
          />
          
        </Box>
      ),
    },
  ];


  const deleteListItem = async (uuid: string) => {
    if (uuid) {
      setLoading(true);
      try {
        const postData = serializeValidData("roles", { "role":{uuid:uuid} });
        const response = await axiosServices.post(
          `role/delete`,
          postData,
        );
        if (response.status === 200) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "Role deleted successfully.",
            variant: "alert",
            alertSeverity: "success",
          });
          const allRows = [...rows];
          const filtered = allRows.filter((item: any) => item.uuid !== uuid);
          
          setRows(filtered);
          setCount(response.data?.paginationInfo?.totalData);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "This role is used",
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
          `role/get-all?limit=${rowsPerPage}&currentPage=${page + 1}`
        );
        if (response.status === 200) {
          if (response.data) {
            setCount(response.data.paginationInfo.totalData);
            setRows(response.data?.roleList);
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
  }, [page, rowsPerPage,search]);

  const handleSearch =(value:string)=>{
    setSearch(value);
    const body = {searchString: value}
    axiosServices.post('role/search',body).then((response)=>{
      setCount(response.data.paginationInfo.totalData);
      setRows(response.data?.roleList);
      setStartIndex(response.data?.paginationInfo.startIndex);
    }).catch((error)=>{
      console.log(error)
    })
  }


  return (
    <Wrapper title={langString("Role Management")} addLink="/admin/role-management/add">
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
            placeholder="Search Role"
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
