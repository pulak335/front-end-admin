import { Container, Grid, Typography } from '@mui/material';

export default function SuperUser() {
    return (
        <Container maxWidth="xl">
            <Grid container xs={12} spacing={1} justifyContent="center">
                <Grid item xs={12} sm={12} md={7} lg={7} xl={7} textAlign="center">
                    <Typography variant="h2" color="initial" marginY="15px">
                        Super User
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
