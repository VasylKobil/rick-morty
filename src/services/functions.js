import {requests} from "./api";

export const generate = {
    generateSpeciesArray: async function(){
        const numbers =  [];
        const allNames = [];
        for(let i = 0; i < 100; i++){numbers.push(i)}
        const characters = await requests.getMultiplyCharacters(numbers);
        characters.forEach(it => {allNames.push(it.species)})
        return [...new Set(allNames)];
    },
    generateEpisodesNamesArray: async function(){
        const numbers =  [];
        const allNames = [];
        for(let i = 0; i < 100; i++){numbers.push(i)}
        const episodes = await requests.getMultiplyEpisodes(numbers);
        episodes.forEach(it => {allNames.push(it.name)})
        return [...new Set(allNames)];
    },
    generateCharactersNamesArray: async function(num){
        const numbers =  [];
        const allNames = [];
        for(let i = 0; i < num; i++){numbers.push(i)}
        const episodes = await requests.getMultiplyLocations(numbers);
        episodes.forEach(it => {allNames.push(it.name)})
        const filterNames = allNames.filter(it=> it !== "unknown");
        return [...new Set(filterNames)];
    },
    generateString: function(species, status, gender){
        const textSpecies = `species=${species && species.toLowerCase()}`;
        const textStatus = `status=${status && status.toLowerCase()}`;
        const textGender = `gender=${ gender.toLowerCase()}`;
        return `?${species && textSpecies}&${status && textStatus}&${gender && textGender}`;
    },
    generateStringLocations: function(name, dimension, type){
        const textName = `name=${name && name.toLowerCase()}`;
        const textDimension = `dimension=${dimension && dimension.toLowerCase()}`;
        const textType = `type=${type && type.toLowerCase()}`;
        return `?${name && textName}&${dimension && textDimension}&${type && textType}`;
    },
    generateNumbersArray: function(number){
        const array = [];
        if(number !== 1 && number !== 2){
            number = number + number - 2
        }
        let num = Number(number.toString().length === 1 && number === 1  ? number : number + '0')
        let save = Number(num)
        for(let i = 0; i < 20; i++){
            array.push(save)
            save++
        }
        return array;
    },
    generateLocationsNamesArray: async function(){
        const numbers =  [];
        const allNames = [];
        for(let i = 0; i < 100; i++){numbers.push(i)}
        const episodes = await requests.getMultiplyLocations(numbers);
        episodes.forEach(it => {allNames.push(it.name)})
        return [...new Set(allNames)];
    },
    generateLocationsDimensionArray: async function(){
        const numbers =  [];
        const allDimensions = [];
        for(let i = 0; i < 100; i++){numbers.push(i)}
        const episodes = await requests.getMultiplyLocations(numbers);
        episodes.forEach(it => {allDimensions.push(it.dimension)})
        const dimensionsFiltered = allDimensions.filter(it => it !== undefined);
        return [...new Set(dimensionsFiltered)];
    },
    generateLocationsTypeArray: async function(){
        const numbers =  [];
        const allTypes = [];
        for(let i = 0; i < 100; i++){numbers.push(i)}
        const episodes = await requests.getMultiplyLocations(numbers);
        episodes.forEach(it => {allTypes.push(it.type)})
        const typesFiltered = allTypes.filter(it => it !== undefined);
        return [...new Set(typesFiltered)];
    }
}
