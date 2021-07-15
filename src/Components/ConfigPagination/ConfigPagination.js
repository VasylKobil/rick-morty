import {createStyles, makeStyles} from "@material-ui/core/styles";
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>
    createStyles({
        ul: {
            marginTop: theme.spacing(2),
            marginLeft: 360,
            paddingBottom: 20,
            '& .MuiPaginationItem-root': {
                color: '#fff'
            },
        },
    }),
);

export function ConfigPagination(props){
    const {count} = props
    const classes = useStyles();

    return(
        <>
            <Pagination
                classes={{ul: classes.ul}}
                count={count}
                color="secondary"
                onChange={(event, value) => {props.handleChange(value)}}
            />
        </>
    )
}