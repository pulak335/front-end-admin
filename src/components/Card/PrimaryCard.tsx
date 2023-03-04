import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import langString from 'utils/langString';

type primaryCard = {
    imageUrl: string;
    title: string;
    description: string;
    redirect: string;
};

export default function PrimaryCard({ imageUrl, title, description, redirect }: primaryCard) {
    return (
        <Grid item xs={12} sm={4} lg={4} xl={4}>
            <Card sx={{ border: '1px solid lightgray', borderRadius: '5px', backgroundColor: '#f5f5f5' }}>
                <CardMedia component="img" image={imageUrl} title="Card 1" />
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item marginX="auto">
                            <Typography variant="subtitle1">{title}</Typography>
                        </Grid>
                        <Grid item textAlign="center">
                            <Typography variant="subtitle2">{description}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container>
                        <Grid item marginX="auto">
                            <Button component={Link} to={redirect} variant="contained">
                                {langString('enter')}
                            </Button>
                        </Grid>
                    </Grid>
                </CardActions>
            </Card>
        </Grid>
    );
}
