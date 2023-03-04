import { Box, Button, Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Wrapper from "components/Card/Wrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "ui-component/Loader";
import axiosServices from "utils/axiosServices";
import langString from "utils/langString";
import { useNavigate, useParams } from "react-router-dom";
import { addAccessReducer } from "store/accessReucer";
import { RootState } from "types/vehicaleField";
import { SNACKBAR_OPEN } from "store/actions";
import makeStyles from "@mui/styles/makeStyles/makeStyles";
import Cookies from "universal-cookie";

const useStyles =  makeStyles({
    table: {
      minWidth: 650
    },
    sticky: {
      position: "sticky",
      left: 0,
      background: "white",
      boxShadow: "5px 2px 5px grey",
      borderRight: "2px solid black"
    }
  });


const AccessControl = () => {
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState<any[]>([]);
    const [flag , setFlag] = useState<boolean>(false);
    const [role, setRole]= useState(0);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const param = useParams();
    const cookies = new Cookies(); 


   let getAccessData:any = useSelector((state:RootState) => state.accessReucer)


    useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const postData = { roleId: param.id }
            
            const response = await axiosServices.post(
              `AC/getAccessMaps`,
              postData
            );
            if (response.status === 200) {
            setRows(response.data.roleMatrix);
            setRole(response.data.role);
            setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, [param.id, flag, role]);

      const checkboxHandle = (e:any,element:any,idx1:any,idx2:any) =>{
        const checkbox = e.target.checked;
        const body = {fieldName: element.moduleName+element.accessPointId, value: {
            accessPointId: element.accessPointId,
            moduleId: element.moduleId,
            permission: checkbox
        }}
        rows[idx1][idx2].permission=rows[idx1][idx2].permission^1;
        dispatch(addAccessReducer(body))
      }


      const onSubmitHandle = async () =>{

        let postData:any = []
        for (let i in getAccessData){
            postData.push(getAccessData[i])
        }
        let obj={
            roleId:param.id,
            roleMapList:  postData
        }
        
        try {
            setLoading(true);
            const response = await axiosServices.post(
                "AC/updatepermission",
                obj
              );
              if (response.status === 200) {
                dispatch({
                  type: SNACKBAR_OPEN,
                  open: true,
                  message: "Permission Aceess Updated Success",
                  variant: "alert",
                  alertSeverity: "success",
                });
                navigate("/admin/role-management/view", { replace: true });
                window.location.reload();
              }
              setFlag(!flag);
              setLoading(false);    
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: "Permission Aceess Updated Failed",
                variant: "alert",
                alertSeverity: "error",
              });
        }
      }


    return (
        <Wrapper title={langString("User Access Control")} backLink="/admin/role-management/view">
        {loading && <Loader />}

        <form noValidate>
        <TableContainer sx={{ maxHeight: 550 }}>
            <Table sx={{ minWidth: 650 }} stickyHeader aria-label="sticky table">
                <TableHead>
                    
                {
                    rows.length && <TableRow>
                        <TableCell></TableCell>
                       
                    {
                       rows[0].map((col:any)=>{
                          return <TableCell align="center">{col.accessPointName}</TableCell> 
                       }) 
                    }
                </TableRow>
                }   
                </TableHead>
                <TableBody>
                {   
                    rows.map((row,index1)=>{
                        return <TableRow>
                            {
                                row.map((element:any,index2:any)=>{
                                    if(index2===0){
                                       return <>
                                       <TableCell>{element.moduleName}</TableCell>
                                       <TableCell align="center"><Checkbox checked={ element.permission } onChange={(e)=>checkboxHandle(e,element,index1,index2)}></Checkbox></TableCell>
                                       </>
                                    }
                                    return <TableCell align="center" ><Checkbox checked={ element.permission } onChange={(e)=>checkboxHandle(e,element,index1,index2)}></Checkbox></TableCell>
                                }) 
                            }
                        </TableRow>
                    })
                }
            </TableBody>
            </Table>
            </TableContainer>

            <Box sx={{ textAlign: "right", paddingTop: 3 }}>
                    <Button
                      color="warning"
                      size="large"
                      type="button"
                      onClick={() => navigate("/admin/role-management/view", { replace: true })}
                      variant="contained"
                      sx={{ marginRight: 2 }}
                    >
                      {langString("cancel")}
                    </Button>
                    <Button
                      color="primary"
                      onClick={onSubmitHandle}
                      size="large"
                      variant="contained"
                    >
                      {langString("save")}
                    </Button>
                  </Box>
            </form>
        </Wrapper>
    );
};

export default AccessControl;