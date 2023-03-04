import { Button, Grid, TextareaAutosize, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import langString from 'utils/langString';

const RatingEmojis = [
    { rating: 1, code: '&#128534;', name: 'Worst' },
    { rating: 2, code: '&#128529;', name: 'Bad' },
    { rating: 3, code: '&#128528;', name: 'Ok' },
    { rating: 4, code: '&#128522;', name: 'Good' },
    { rating: 5, code: '&#128525;', name: 'Great' }
];

const Feedback = () => {
    const [rating, setRating] = useState(1);
    const [comment, setComment] = useState('');
    const [send, setSend] = useState(false);
    const classes = useStyles();

    const sendFeedback = () => {
        setSend(true);
        // coreAxios
        //     .patch(`/users/feedback/`, { rating, comment })
        //     .then((res) => {
        //         if (res.data.status === 200) {
        //             setSend(true);
        //         }
        //     })
        //     .catch((e: any) => {
        //         console.log(e);
        //     });
    };

    // server request
    useEffect(() => {
        // eslint-disable-next-line radix
        setRating(1);
        setComment('');
        // coreAxios
        //     .get('/users/feedback/')
        //     .then((res) => {
        //         if (res.data.status === 200) {
        //             // eslint-disable-next-line radix
        //             setRating(parseInt(res.data.data.rating!));
        //             setComment(res.data.data.comment);
        //         }
        //     })
        //     .catch((e: any) => {
        //         console.log(e);
        //     });
    }, []);

    return (
        <>
            <MainCard sx={{ marginTop: 1 }}>
                <Grid container>
                    <Grid item sm={12}>
                        <Typography variant="h3" sx={{ marginBottom: 1, textAlign: 'center' }}>
                            {langString('howwasyourexperience')}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={8} className={classes.rateSection}>
                        {RatingEmojis &&
                            RatingEmojis.map((item: any) => (
                                <Button
                                    color="warning"
                                    variant={item.rating === rating ? 'contained' : 'text'}
                                    onClick={() => setRating(item.rating)}
                                >
                                    <div className={classes.rateItem}>
                                        <div
                                            className={classes.rateItemIcon}
                                            // eslint-disable-next-line react/no-danger
                                            dangerouslySetInnerHTML={{
                                                __html: item.code
                                            }}
                                        />
                                        <Typography
                                            color={item.rating > 3 ? '#009432' : '#778ca3'}
                                            variant="h4"
                                            className={classes.alignCenter}
                                        >
                                            {item.name}
                                        </Typography>
                                    </div>
                                </Button>
                            ))}
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12} sm={8} className={classes.commentSection}>
                        <TextareaAutosize
                            aria-label="comment textarea"
                            placeholder="Comment if you have any"
                            minRows={4}
                            style={{ width: '100%' }}
                            value={comment}
                            onChange={(event: any) => setComment(event.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item sm={12} className={classes.alignCenter}>
                        <Button color="primary" variant="contained" onClick={() => sendFeedback()}>
                            {langString('submit')}
                        </Button>
                    </Grid>
                </Grid>
                {send && (
                    <Grid container>
                        <Grid item sm={12} className={classes.alignCenter}>
                            <Typography color="#009432" variant="h4">
                                {langString('feedbacksendsuccessfully')}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </MainCard>
        </>
    );
};

export default Feedback;

const useStyles = makeStyles({
    rateSection: {
        margin: '0 auto',
        textAlign: 'center'
    },
    commentSection: {
        marginTop: 50,
        marginLeft: '20%'
    },
    alignCenter: {
        textAlign: 'center',
        marginTop: 20
    },
    rateItem: {
        float: 'left',
        margin: 10
    },
    rateItemIcon: {
        textAlign: 'center',
        margin: 1,
        fontSize: 50
    }
});
