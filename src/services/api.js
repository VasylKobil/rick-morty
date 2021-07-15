const url = 'https://rickandmortyapi.com/api';

export const requests = {
    getCharacters: function (){
        return fetch(url + '/character')
            .then(res => res.json())
            .then((characters) => {return characters});
    },
    getCharactersFilter: function (str){
        return fetch(url + `/character/${str}` )
            .then(res => res.json())
            .then((characters) => {return characters});
    },
    getMultiplyCharacters: function (arrayNumOfCharacters){
        return fetch(url + '/character/' + arrayNumOfCharacters)
            .then(res => res.json())
            .then((characters) => {return characters});
    },
    getEpisodes: function (){
        return fetch(url + '/episode')
            .then(res => res.json())
            .then((characters) => {return characters});
    },
    getMultiplyEpisodes: function (arrayNumOfEpisodes){
        return fetch(url + '/episode/' + arrayNumOfEpisodes)
            .then(res => res.json())
            .then((characters) => {return characters});
    },
    getEpisodesFilter: function (str){
        return fetch(url + `/episode/${str}` )
            .then(res => res.json())
            .then((characters) => {return characters});
    },
    getCharacter: function (id){
        return fetch(url + '/character/' + id)
            .then(res => res.json())
            .then((character) => {return character});
    },
    getLocations: function (){
        return fetch(url + '/location')
            .then(res => res.json())
            .then((locations) => {return locations});
    },
    getMultiplyLocations: function (arrayNumOfLocations){
        return fetch(url + '/location/' + arrayNumOfLocations)
            .then(res => res.json())
            .then((locations) => {return locations});
    },
    getLocationFilter: function (str){
        return fetch(url + `/location/${str}` )
            .then(res => res.json())
            .then((characters) => {return characters});
    }
}