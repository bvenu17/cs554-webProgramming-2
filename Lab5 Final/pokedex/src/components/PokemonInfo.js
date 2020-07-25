import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonInfo = (props) => {

    const [pokemonId, setPokemonId] = useState(undefined);
    const [pokemonInfo, setPokemonInfo] = useState(undefined);

    useEffect(
        () => {

            setPokemonId(parseInt(props.match.params.id));
            async function fetchData() {
                try {
                    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/' + pokemonId);
                    setPokemonInfo(data);
                    console.log('param is' + pokemonId);
                    console.log(pokemonInfo);
                } catch (e) {
                    console.log(e);
                }

            }
            fetchData();
        }, [pokemonId,pokemonInfo, props.match.params.id]
    )

        return (
            <div className="pokemoninfo">

            {!pokemonInfo ? (
                <p>error 404 not found</p>
            ): (
            <div>
                <img alt = "noimage" src = {pokemonInfo && pokemonInfo.sprites.front_default} />
                <p className="pokemonname"><b>{pokemonInfo && pokemonInfo.name}</b></p>
                <p>Id: {pokemonInfo && pokemonInfo.id}</p>
                <p>Height: {pokemonInfo && pokemonInfo.height}</p>
                <p>Wieght: {pokemonInfo && pokemonInfo.weight}</p>

            </div>
        )
    }
        </div >
    )
    
}

export default PokemonInfo;