import {useEffect, useState} from "react";
import {ConfigPagination} from '../ConfigPagination/ConfigPagination';
import {requests} from "../../services/api";
import {Filter} from '../Filter/Filter';
import {generate} from "../../services/functions";

export function Locations(){
    const [locations, setLocations] = useState('');
    const [locationsRender, setLocationsRender] = useState('');
    const [count, setCount] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [filterDimension, setFilterDimension] = useState('');
    const [filterType, setFilterType] = useState('');
    const [error, setError] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [namesList, setNamesList] = useState('');
    const [dimensionList, setDimensionList] = useState('');
    const [typesList, setTypesList] = useState('');
    const [filter, setFilter] = useState(false);
    const [string, setString] = useState('');

    async function newPage(numberNewPage){
        if(filter){
            const newString = `?page=${numberNewPage}&${string.substring(1)}`
            const newPageFiltered = await requests.getLocationFilter(newString);
            setLocationsRender(newPageFiltered.results);
            return
        }
        const array = generate.generateNumbersArray(numberNewPage);
        const newPageEpisodes = await requests.getMultiplyLocations(array);
        setLocationsRender(newPageEpisodes);
    }
    async function getLocationFilter(){
        const str = await generate.generateStringLocations(filterName,filterDimension,filterType);
        const newCharacters = await requests.getLocationFilter(str);
        if(newCharacters.error){
            setError('Hasn\'t locations with specifies fiters');
            setTimeout(()=>{
                setError('')
            },3000)
            return
        }
        setLocationsRender(newCharacters.results);
        setCount(newCharacters.info.pages);
        setShowButton(true);
        setString(str);
        setFilter(true);
    }
    function onNoFilter(){
        setLocationsRender(locations.results);
        setCount(locations.info.pages);
        setShowButton(false);
        setFilterName('');
        setFilter(false);
    }

    useEffect(()=> {
        async function getEpisodes() {
            const locations = await requests.getLocations();
            setLocations(locations);
            setLocationsRender(locations.results);
            setCount(locations.info.pages)
        }
        async function getNameArray(){
            const names = await generate.generateLocationsNamesArray()
            setNamesList(names);
        }
        async function getDimentionArray(){
            const dimension = await generate.generateLocationsDimensionArray()
            setDimensionList(dimension);
        }
        async function getTypeArray(){
            const types = await generate.generateLocationsTypeArray()
            setTypesList(types);
        }
        getEpisodes();
        getNameArray();
        getDimentionArray();
        getTypeArray();
    },[])

    return(
        <>
            <div className='box'>
                <Filter buttons={namesList} onFilterChange={setFilterName} boolean={showButton} name={'Filter by Name...'}/>
                <Filter buttons={dimensionList} onFilterChange={setFilterDimension} name={'Filter by Dimension...'}/>
                <Filter buttons={typesList} onFilterChange={setFilterType} name={'Filter by Type...'}/>
                <button disabled={!filterName && !filterDimension && !filterType} onClick={getLocationFilter}>Filter</button>
                {showButton && <button onClick={onNoFilter}>No Filter</button>}
            </div>
            {error && <div className='error'><p>{error}</p></div>}
            <div className="episodes">
                <ul>
                    <li>
                        <p>NUMBER</p>
                        <p>NAME</p>
                        <p>DIMENSION</p>
                        <p>TYPE</p>
                    </li>
                    {locationsRender && locationsRender
                        .map((location) => (
                            <li key={location.id}>
                                <p>{location.id}</p>
                                <p>{location.name}</p>
                                <p>{location.dimension === 'unknown' ? 'Unknown' : location.dimension}</p>
                                <p>{location.type}</p>
                            </li>
                        ))}
                </ul>
            </div>
            <ConfigPagination
                count={count && count}
                handleChange={(value)=> {newPage(value)}}
            />
        </>
    )
}