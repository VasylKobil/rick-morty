import './CharacterInformation.scss';
import CloseIcon from '@material-ui/icons/Close';
import {IconButton} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    myClassName: {
        color: "black",
        position: 'relative',
        width: 40,
        height: 40,
        top: '0',
        left: '0',
        "&:hover": {
            cursor: 'pointer',
        }
    }
}));

export function CharacterInformation(props){
    const {character} = props
    const classes = useStyles();
    const close = props.closeBox;

    return(
        <div className="containerInf">
            <div className="boxCenter">
                <IconButton className={classes.myClassName} onClick={close}>
                    <CloseIcon fontSize='large'/>
                </IconButton>
                <img src={character.image} alt={character.name}/>
                <ul>
                    <li>Name: {character.name === "unknown" ? 'Not Found' : character.name}</li>
                    <li>Original Name: {character.origin.name === "unknown" ? 'Not Found' : character.origin.name}</li>
                    <li>Status: {character.status === "unknown" ? 'Not Found' : character.status}</li>
                    <li>Gender: {character.gender === "unknown" ? 'Not Found' : character.gender}</li>
                    <li>Species: {character.species === "unknown" ? 'Not Found' : character.species}</li>
                    <li>Type: {character.type === "" ? 'Not Found' : character.type}</li>
                </ul>
            </div>
        </div>
    )
}