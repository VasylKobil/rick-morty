import './Characters.scss'
import {useEffect, useState} from "react";
import {ConfigPagination} from '../ConfigPagination/ConfigPagination';
import {requests} from "../../services/api";
import {CharacterInformation} from "../CharacterInformation/CharacterInformation";
import {Filter} from '../Filter/Filter';
import {generate} from "../../services/functions";

const statusList = [
    'Alive',
    'Dead',
    'Unknown'
]
const genderList = [
    'Female',
    'Male',
    'Genderless',
    'Unknown'
]


export function Characters(props){
    const {characters} = props
    const [character, setCharacter] = useState('');
    const [count, setCount] = useState(0);
    const [twelveCharacters, setTwelveCharacters] = useState('');
    const [species, setSpecies] = useState('');
    const [status, setStatus] = useState('');
    const [gender, setGender] = useState('');
    const [error, setError] = useState('');
    const [speciesList, setSpeciesList] = useState('');
    const [showButton, setShowButton] = useState(false);
    const [filter, setFilter] = useState(false);
    const [string, setString] = useState('');

    async function newPage(numberNewPage){
        if(filter){
            const newString = `?page=${numberNewPage}${string.substring(1)}`
            const newPageFiltered = await requests.getCharactersFilter(newString);
            setTwelveCharacters(newPageFiltered.results);
            return
        }
        const array = generate.generateNumbersArray(numberNewPage);
        const newPageCharacters = await requests.getMultiplyCharacters(array);
        setTwelveCharacters(newPageCharacters);
    }
    async function getCharacterInf(id){
        const character = await requests.getCharacter(id);
        setCharacter(character);
    }
    async function getCharacterFilter(){
        const str = await generate.generateString(species,status,gender);
        const newCharacters = await requests.getCharactersFilter(str);
        if(newCharacters.error){
            setError('Hasn\'t characters with specifies fiters');
            setTimeout(()=>{
                setError('')
            },3000)
            return
        }
        setTwelveCharacters(newCharacters.results);
        setCount(newCharacters.info.pages);
        setShowButton(true);
        setString(str);
        setFilter(true);
    }
    function onNoFilter(){
        setTwelveCharacters(characters.results);
        setCount(characters.info.pages);
        setShowButton(false);
        setFilter(false);
        setSpecies('');
        setStatus('');
        setGender('');
    }

    useEffect(()=>{
        function rewrite(){
            setTwelveCharacters(characters.results);
            setCount(characters.info.pages);
        }
        async function getSpeciesArray(){
            const species = await generate.generateSpeciesArray();
            setSpeciesList(species);
        }
        rewrite();
        getSpeciesArray();

        // eslint-disable-next-line
    },[])

    return(
        <>
            {character && <CharacterInformation character={character} closeBox={()=> setCharacter('')}/>}
            <div className='box'>
                <Filter buttons={speciesList} onFilterChange={setSpecies} name={'Filter by Species...'}/>
                <Filter buttons={statusList} onFilterChange={setStatus} name={'Filter by Status...'}/>
                <Filter buttons={genderList} onFilterChange={setGender} name={'Filter by Gender...'}/>
                <button disabled={!species && !status && !gender} onClick={getCharacterFilter}>Filter</button>
                {showButton && <button onClick={onNoFilter}>No Filter</button>}
            </div>
            {error && <div className='error'><p>{error}</p></div>}
            <div className="characters">
                <ul>
                    {twelveCharacters && twelveCharacters
                        .map((character) => (
                            <li key={character.id} onClick={()=> {getCharacterInf(character.id)}}>
                                <img src={character.image} alt={character.name}/>
                                <p>{character.name}</p>
                                <p>Status: {character.status === "unknown" ? 'Not Found' : character.status}</p>
                                <p>Number: {character.id}</p>
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