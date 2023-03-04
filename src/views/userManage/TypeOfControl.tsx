import { Button, Grid, Paper, Typography } from '@mui/material';
import { IconEdit } from '@tabler/icons';
import Wrapper from 'components/Card/Wrapper';
import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Loader from 'ui-component/Loader';
import axiosServices from 'utils/axiosServices';

const TypeOfControl = () => {
const [loading, setLoading] = useState(false)
const [roles, setRoles] = useState<any[]>([])

    useEffect(() => {
        const init = async () => {
          setLoading(true);
          try {
            const response = await axiosServices.post(
              `role/get-all`
            );
            if (response.status === 200) {
              if (response.data) {
                setRoles(response.data?.roleList);
              }
              setLoading(false);
            }
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
        };
        init();
      }, []);


    return (
        <Wrapper title='Type of Users Role'>
          {loading && <Loader/>}
            {
            roles.map(item=>(
            <Paper elevation={5} style={{marginTop:'10px'}}>
                <Grid container sx={{marginLeft: '15px'}} style={{display:'flex', justifyContent:'space-between'}} alignItems="center">
                    <Typography variant='h3' align='left' alignItems="center"> {item.name} </Typography>
                    <Button
                        component={Link}
                        to={`/admin/user-access-control/${item.id}`}
                        sx={{marginRight:"10px"}}
                        >
                    <IconEdit
                        size={36}
                        strokeWidth={1}
                        color={'black'}
                    />
                    </Button>

                </Grid>
            </Paper>
                ))
            }
        </Wrapper>
    );
};

export default TypeOfControl;