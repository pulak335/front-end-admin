import { Box, Button, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import BasicDataTable, { ColumnType } from "components/common/BasicDataTable";
import ConfirmButton from "components/common/ConfirmButton";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SNACKBAR_OPEN } from "store/actions";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import { serializeValidData } from "utils/Helpers";
import langString from "utils/langString";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function ServiceList() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch()

  const Columns: ColumnType[] = [
    {
      header: "User Name",
      accessor: "userName",
      content: (item: any) => <Typography>{item.userName}</Typography>,
    },
    {
      header: "Full Name",
      accessor: "fullName",
      content: (item: any) => <Typography>{item.firstName}  {item.lastName}</Typography>,
    },
    {
      header: "User Role",
      accessor: "userRole",
      content: (item: any) => <Typography>{item.role}</Typography>,
    },
    {
      header: "Number",
      accessor: "contact",
      content: (item: any) => <Typography>{item.phone}</Typography>,
    },

    {
      header: "Email",
      accessor: "email",
      content: (item: any) => <Typography>{item.email}</Typography>,
    },
    {
      header: "Status",
      accessor: "status",
      content: (item: any) => <Typography>{item.status ? 'Active' : 'Inactive'}</Typography>,
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
            to={`/admin/user-manage/edit/${item._id}`}
            size="small"
            sx={{ marginLeft: 0.5 }}
          >
            Edit
          </Button>
        

          <ConfirmButton
            subTitle={`Delete User: ${item.userName}`}
            confirmed={() => deleteListItem(item._id)}
          />
        </Box>
      ),
    },
  ];

  const deleteListItem = async (id: number) => {
    if (id) {
      setLoading(true);
      console.log(`/user/signin/${id}`)
      try {
        const response = await axiosServices.delete(
          `/user/signin/${id}`
        );
        

        if (response.status === 204) {
          dispatch({
            type: SNACKBAR_OPEN,
            open: true,
            message: "User deleted successfully.",
            variant: "alert",
            alertSeverity: "success",
          });
          const allRows = [...rows];
          const filtered = allRows.filter((item: any) => item._id !== id);
          setRows(filtered);
          setLoading(false);
        }
      } catch (error: any) {
        setLoading(false);
        dispatch({
          type: SNACKBAR_OPEN,
          open: true,
          message: "Loged in user can't delete",
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
        const response = await axiosServices.get(
          `/user/signin`
        );
        if (response.status === 200) {
          if (response.data) {
            setRows(response.data?.data);
        }
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    init();
  }, [page, rowsPerPage, search]);

  const handleSearch =(value:string)=>{
    setSearch(value);
    const body = {searchString: value}
    axiosServices.post('user/search',body).then((response)=>{
      setCount(response.data.paginationInfo.totalData);
      setRows(response.data?.userList);
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    <Wrapper title={langString("Users Management")} addLink="/admin/user-manage/add">
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
            placeholder="Search User"
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
