import './Episodes.scss'
import {useEffect, useState} from "react";
import {ConfigPagination} from '../ConfigPagination/ConfigPagination';
import {requests} from "../../services/api";
import {Filter} from '../Filter/Filter';
import {generate} from "../../services/functions";

export function Episodes(){
    const [episodes, setEpisodes] = useState('');
    const [episodesRender, setEpisodesRender] = useState('');
    const [count, setCount] = useState(0);
    const [filterName, setFilterName] = useState('');
    const [error, setError] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [namesList, setNamesList] = useState('');
    const [filter, setFilter] = useState(false);
    const [string, setString] = useState('');

    async function newPage(numberNewPage){
        if(filter){
            const newString = `?page=${numberNewPage}&${string.substring(1)}`
            const newPageFiltered = await requests.getEpisodesFilter(newString);
            setEpisodesRender(newPageFiltered.results);
            return
        }
        const array = generate.generateNumbersArray(numberNewPage);
        const newPageEpisodes = await requests.getMultiplyEpisodes(array);
        setEpisodesRender(newPageEpisodes);
    }
    async function getEpisodesFilter(){
        if(!filterName) return
        const str = `?name=${filterName.toLowerCase()}`;
        const newEpisodes = await requests.getEpisodesFilter(str);
        if(newEpisodes.error){
            setError('Hasn\'t episodes with specifies fiters');
            setTimeout(()=>{
                setError('')
            },3000)
            return
        }
        setEpisodesRender(newEpisodes.results);
        setCount(newEpisodes.info.pages);
        setShowButton(true);
        setString(str);
        setFilter(true);
    }
    function onNoFilter(){
        setEpisodesRender(episodes.results);
        setCount(episodes.info.pages);
        setShowButton(false);
        setFilterName('');
        setFilter(false);
    }

    useEffect(()=> {
        async function getEpisodes() {
            const episodes = await requests.getEpisodes();
            setEpisodes(episodes);
            setEpisodesRender(episodes.results);
            setCount(episodes.info.pages)
        }
        async function getSpeciesArray(){
            const species = await generate.generateEpisodesNamesArray()
            setNamesList(species);
        }
        getEpisodes();
        getSpeciesArray();
    },[])

    return(
        <>
            <div className='box'>
                <Filter buttons={namesList} onFilterChange={setFilterName} boolean={showButton} name={'Filter by Name...'}/>
                <button disabled={!filterName} onClick={getEpisodesFilter}>Filter</button>
                {showButton && <button onClick={onNoFilter}>No Filter</button>}
            </div>
            {error && <div className='error'><p>{error}</p></div>}
            <div className="episodes">
                <ul>
                    <li>
                        <p>NUMBER</p>
                        <p>NAME</p>
                        <p>EPISODE</p>
                        <p>DATE</p>
                    </li>
                    {episodesRender && episodesRender
                        .map((episode) => (
                            <li key={episode.id}>
                                <p>{episode.id}</p>
                                <p>{episode.name}</p>
                                <p>{episode.episode && episode.episode}</p>
                                <p>{episode.created && episode.created.slice(0,10)}</p>
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