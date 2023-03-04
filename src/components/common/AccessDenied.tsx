import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import langString from 'utils/langString';

export default function AccessDenied() {
    return (
        <Box>
            <Typography variant="h2" sx={{ color: 'red', textAlign: 'center', marginTop: 10 }}>
                {langString('accessdenied')}
            </Typography>
        </Box>
    );
}
