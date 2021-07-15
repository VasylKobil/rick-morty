import './MyWatch.scss'
import {useEffect, useState} from "react";
import {Filter} from '../Filter/Filter';
import {generate} from "../../services/functions";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export function MyWatch(props){
    const {characters} = props;
    const [elements, setElements] = useState('');
    const [input, setInput] = useState('');
    const [namesList, setNamesList] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const ele = elements.find(it=> it.id === Number(event.target.value));
        const indEle = elements.indexOf(ele);
        const updateArray = [...elements];
        updateArray[indEle].complete = event.target.checked;
        setElements(updateArray);
    };


    function createElement(){
        const array = [];
        if(elements && elements.some(it => it.name === input)){
            setError('This element has been already included in your list');
            setTimeout(()=>{
                setError('')
            },3000)
            return
        }
        array.push({
            id: Date.now(),
            name: input,
            complete: false
        });
        if(!elements){
            setElements(array);
            return;
        }
        const result = elements.concat(array);
        setElements(result);
    }
    function deleteElement(id){
       setElements(elements.filter(it=> it.id !== id))
    }

    useEffect(()=>{
        const savedState = localStorage.myWatch ? JSON.parse(localStorage.myWatch) : null;
        setElements(savedState)

        async function getNamesArray(){
            const names = await generate.generateCharactersNamesArray(characters.info.count);
            setNamesList(names);
        }
        getNamesArray();

        // eslint-disable-next-line
    }, []);

    useEffect(()=>{
        localStorage.setItem('myWatch', JSON.stringify(elements));
    }, [elements]);

    return(
        <>
            <div className='box'>
                <Filter buttons={namesList} onFilterChange={setInput} name={'Input on choose...'}/>
                <button disabled={!input} onClick={createElement}>Add</button>
            </div>
            {error && <div className='error'><p>{error}</p></div>}
            <div className="characters">
                <ul>
                    {elements && elements
                        .map((element) => (
                            <li key={element.id}>
                                <p>{element.name}</p>
                                <FormControlLabel
                                    value={element.id}
                                    control={<Switch/>}
                                    label="Complete"
                                    onChange={handleChange}
                                    checked={element.complete === true}
                                />
                                <button onClick={() => deleteElement(element.id)}>Delete</button>
                            </li>
                        ))}
                </ul>
            </div>
        </>
    )
}