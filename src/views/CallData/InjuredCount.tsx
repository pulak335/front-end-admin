
import { useDispatch } from 'react-redux';
import { addCaseEntryReducer } from 'store/caseEntry';
import PropTypes from 'prop-types';

// material-ui
import { Button, Checkbox, FormControlLabel, Grid, Stack, Typography, TextField } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    injury_count: yup.string().required('Total Injury is required'),
});

// ==============================|| FORM WIZARD - BASIC  ||============================== //


export default function InjuredCount({ incidentInfo, setIncidentInfo, handleNext, setErrorIndex }:any) {
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            severe_injury_count: "",
            injury_count: ""
        },
        validationSchema,
        onSubmit: (values) => {
            setIncidentInfo({
                severe_injury_count: values.severe_injury_count,
                injury_count: values.injury_count
            });
            const totalInjuryData:any = {fieldName: "injuryCount", value:values.injury_count}
            dispatch(addCaseEntryReducer(totalInjuryData))

            const severeInjuryData:any = {fieldName: "severeInjuryCount", value:values.injury_count}
                dispatch(addCaseEntryReducer(severeInjuryData))            
            handleNext();
        }
    });

    // const handleTotalInjured = (e:any) =>{
    //     const totalInjured:number = e.target.value;
    //     const data:any = {fieldName: "injuryCount", value:totalInjured}
    //     dispatch(addCaseEntryReducer(data))
    // }

    // const handleBadInjured = (e:any) =>{
    //     const totalbedInjured = e.target.value;
    //     const data:any = {fieldName: "severeInjuryCount", value:totalbedInjured}
    //     dispatch(addCaseEntryReducer(data))
    // }
    return (
        <>
            <Typography variant="h1" gutterBottom sx={{ mb: 2 }}>
            Provide injured information details
            </Typography>
            <form onSubmit={formik.handleSubmit} id="validation-forms">
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                <TextField
                            id="severe_injury_count"
                            name="severe_injury_count"
                            label="Badly Injury"
                            defaultValue={formik.values.severe_injury_count}
                            onChange={formik.handleChange}
                            fullWidth
                            autoComplete="given-name"
                        />
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField
                            id="injury_count"
                            name="injury_count"
                            label="Total Injury *"
                            defaultValue={formik.values.injury_count}
                            onChange={formik.handleChange}
                            error={formik.touched.injury_count && Boolean(formik.errors.injury_count)}
                            helperText={formik.touched.injury_count && formik.errors.injury_count}
                            fullWidth
                            autoComplete="given-name"
                        />
                </Grid>
                </Grid>
                <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                                    Next
                                </Button>
                            </AnimateButton>
                        </Stack>
                </Grid>
            </form>
        </>
    );
}

InjuredCount.propTypes = {
    incidentInfo: PropTypes.object,
    setIncidentInfo: PropTypes.func,
    handleNext: PropTypes.func,
    setErrorIndex: PropTypes.func
};