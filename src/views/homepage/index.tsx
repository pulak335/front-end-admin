import { Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Deserializer } from "jsonapi-serializer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosServices from "utils/axiosServices";
import { useDispatch, useSelector } from "react-redux";
import { addCaseEntryReducer } from "store/caseEntry";
import langString from "utils/langString";
import Notfound from "views/Notfound/Notfound";




export default function Homepage() {
  const [dashboardData, setDashboardData] = useState<any>({});
  const [phone, setPhone] = useState<any>('');
  const [caller, setCaller] = useState<any>('');
  const theme = useTheme(); 
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handlecall = () =>{
    const data:any = {fieldName: "phoneNum", value:phone}
    dispatch(addCaseEntryReducer(data))
    const data2:any = {fieldName: "caller", value:caller}
    dispatch(addCaseEntryReducer(data2))
    navigate("/emergency-call")    
  }


  return (
    <Container>
      
    </Container>
  );
}
