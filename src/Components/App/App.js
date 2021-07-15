import './App.scss';
import {Header} from "../Header/Header";
import {useEffect, useState} from "react";
import {requests} from "../../services/api";
import {Characters} from "../Characters/Characters";
import {Episodes} from "../Episodes/Episodes";
import {Locations} from "../Locations/Locations";
import {MyWatch} from "../MyWatch/MyWatch";


export default function App() {
    const [characters, setCharacters] = useState('');
    const [arrayShow, setOnArrayShow] = useState([true, false,false,false])

    useEffect(() => {
       async function getCharacters (){
            const characters = await requests.getCharacters();
            setCharacters(characters);
       }
       getCharacters();
    },[])

    function onButton(number){
        const Array = [false, false, false, false];
        Array[number-1] = true;
        setOnArrayShow(Array);
    }

  return (
    <div className="App">
      <Header
          array={arrayShow}
        onCharacters={() => {onButton(1)}}
        onEpisodes={() => {onButton(2)}}
        onLocations={() => {onButton(3)}}
        onMyWatch={() => {onButton(4)}}
      />
        {characters && arrayShow[0] && <Characters characters={characters}/>}
        {arrayShow[1] && <Episodes/>}
        {arrayShow[2] && <Locations/>}
        {arrayShow[3] && <MyWatch characters={characters}/>}
    </div>
  );
}
