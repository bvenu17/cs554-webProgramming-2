import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonPage = (props) => {

    const [pokemons, setPokemons] = useState(undefined);
    const [pageNumber, setPageNumber] = useState(undefined);
    const [paramValue, setParamValue] = useState(undefined);

    useEffect(
        () => {
            console.log("enter useeffect");
            setParamValue(parseInt(props.match.params.page));
            setPageNumber(parseInt(props.match.params.page));

            const offset = pageNumber * 20;
            async function fetchData() {
                try {

                    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=' + offset + '&limit=20');
                    setPokemons(data);
                    console.log("props value " + paramValue)
                    console.log("Offset is " + offset);
                    console.log("page is " + pageNumber);

                } catch (e) {
                    console.log(e);
                }
            }

            fetchData();
        }, [pageNumber, paramValue, props.match.params.page]
    );


        return (
            <div>
                {pokemons && pageNumber > pokemons.count / 20 || pageNumber < 0 ? (<p>error</p>) : (

                    <div>
                        {pokemons && pokemons.results.map((pokemon) => {
                            return (
                                <div className="pagecontainer">
                                    {/* <a className="pagecontent" href={`/pokemon/${pokemon, index + 1 + pageNumber * 20}`}>{pokemon.name}</a> */}
                                    <a className="pagecontent" href={`/pokemon/${pokemon.url.split('/')[6]}`}>{pokemon.name}</a>

                                </div>
                            )
                        }
                        )
                        }

                        <div className="pagination">
                            
                            {pokemons && pokemons.previous == null ? (<p></p>) : (<a href={`/pokemon/page/${paramValue - 1}`}><button className="btn">Previous</button></a>)}

                            {/* {pokemons && paramValue - 1 <= pokemons.count / 20 && paramValue - 1 >= 0 ? (
                                <a href={`/pokemon/page/${paramValue - 1}`}>{paramValue - 1} </a>

                            ) : (<p></p>)} */}
                         
                            {pokemons && paramValue + 1 <= pokemons.count / 20 ? (
                               <a href={`/pokemon/page/${paramValue + 1}`}> No. {paramValue + 1}</a>

                            ) : (<p></p>)}
                           

                            {pokemons && paramValue + 2 <= pokemons.count / 20 ? (
                                <a href={`/pokemon/page/${paramValue + 2}`}>No. {paramValue + 2} </a>

                            ) : (<p></p>)}

                            {pokemons && paramValue + 3 <= pokemons.count / 20 ? (
                                <a href={`/pokemon/page/${paramValue + 3}`}>No. {paramValue + 3} </a>

                            ) : (<p></p>)}

                            {pokemons && paramValue + 4 <= pokemons.count / 20 ? (
                                <a href={`/pokemon/page/${paramValue + 4}`}>No. {paramValue + 4} </a>

                            ) : (<p></p>)}

                            {pokemons && paramValue + 5 <= pokemons.count / 20 ? (
                                <a href={`/pokemon/page/${paramValue + 5}`}>No. {paramValue + 5} </a>

                            ) : (<p></p>)}

                            {pokemons && pokemons.next == null ? (<p></p>) : (<a href={`/pokemon/page/${paramValue + 1}`}><button className="btn">Next</button></a>)}
                        </div>
                    </div>

                )}


            </div>
        )
    
}

export default PokemonPage;