import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function DataLoading() {
    return (
        <Box sx={{ display: 'flex', marginLeft: '45%' }}>
            <CircularProgress />
        </Box>
    );
}
