import * as React from 'react';
import{useState, useEffect} from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useLocation, useNavigation, useParams } from "react-router-dom";
import { WithRouterProps } from 'types';

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


const CostomBreadcrumbs=()=> {
  const [path, setPath] = useState('')
  const location = useLocation();
  console.log(window.location.href)
  useEffect(() => {
    setPath(location.pathname)
  }, [location.pathname])

  let pathStr = path.split("/")
  
  


  const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/material-ui/getting-started/installation/"
      onClick={handleClick}
    >
      {pathStr[1]}
    </Link>,
    <Typography key="3" color="text.primary">
      {pathStr[2]}
    </Typography>,
  ];

  return (
    <div className='breadcrumbs-background'>
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
    </div>
  );
}

export default CostomBreadcrumbs;
