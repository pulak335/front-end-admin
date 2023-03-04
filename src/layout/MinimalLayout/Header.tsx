import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    blueBar: {
        backgroundColor: '#273c75',
        padding: 25,
        width: '100%',
        color: '#fff'
    },
    orgName: {
        fontSize: 25,
        marginLeft: 100
    },
    projectName: {
        fontSize: 22,
        float: 'right',
        marginRight: 100
    }
});

export default function MinimalHeader() {
    const classes = useStyles();
    return (
        <div className={classes.blueBar}>
            
        </div>
    );
}
