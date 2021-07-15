import './Header.scss';

export function Header(props){
    const {array} = props

    return(
        <div className="container">
            <button className={array[0] === true ? 'selected' : null} onClick={(e) => props.onCharacters(e)}>Characters</button>
            <button className={array[1] === true ? 'selected' : null} onClick={(e) => props.onEpisodes(e)}>Episodes</button>
            <button className={array[2] === true ? 'selected' : null} onClick={(e) => props.onLocations(e)}>Locations</button>
            <button className={array[3] === true ? 'selected' : null} onClick={(e) => props.onMyWatch(e)}>My watch</button>
        </div>
    )
}