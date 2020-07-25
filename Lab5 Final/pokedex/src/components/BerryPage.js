import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BerryPage = (props) => {

    const [berries, setBerries] = useState(undefined);
    const [pageNumber, setPageNumber] = useState(undefined);
    const [paramValue, setParamValue] = useState(undefined);

    //const paramValue = parseInt(props.match.params.page);
    //const [offset,setOffset] = useState(undefined);

    useEffect(
        () => {
            console.log("enter useeffect");
            setParamValue(parseInt(props.match.params.page));
            setPageNumber(parseInt(props.match.params.page));

            //setOffset(pageNumber * 20)
            const offset = pageNumber * 10;
            async function fetchData() {
                try {

                    const { data } = await axios.get('https://pokeapi.co/api/v2/berry/?offset=' + offset + '&limit=10');
                    setBerries(data);
                    console.log("props value " + paramValue)
                    console.log("Offset is " + offset);
                    console.log("page is " + pageNumber);

                } catch (e) {
                    console.log(e);
                }
            }

            fetchData();

            // setOffset(undefined);
        }, [pageNumber, paramValue, props.match.params.page]
    );

        return (
            <div>

                {berries && pageNumber > berries.count / 10 || pageNumber < 0 ? (
                    <p>error 404 not found</p>
                ) : (
                        <div>

                            {berries && berries.results.map((berry, index) => {

                                return (

                                    <div className="pagecontainer">
                                        <a className="pagecontent" href={`/berries/${berry, index + 1 + pageNumber * 10}`}>{berry.name}</a>
                                    </div>
                                )
                            }
                            )
                            }
                            <div className="pagination">
                                {berries && berries.previous == null ? (<p></p>) : (<a href={`/berries/page/${paramValue - 1}`}><button className="btn">Previous</button> </a>)}

                                {/* {berries && paramValue - 1 <= berries.count / 10 && paramValue - 1 >= 0 ? (
                                    <a href={`/berries/page/${paramValue - 1}`}>{paramValue - 1} </a>

                                ) : (<p></p>)} */}
                                {berries && paramValue + 1 <= berries.count / 10 ? (
                                    <a href={`/berries/page/${paramValue + 1}`}>No. {paramValue + 1} </a>

                                ) : (<p></p>)}

                                {berries && paramValue + 2 <= berries.count / 10 ? (
                                    <a href={`/berries/page/${paramValue + 2}`}>No. {paramValue + 2} </a>

                                ) : (<p></p>)}

                                {berries && paramValue + 3 <= berries.count / 10 ? (
                                    <a href={`/berries/page/${paramValue + 3}`}>No. {paramValue + 3} </a>

                                ) : (<p></p>)}

                                {berries && paramValue + 4 <= berries.count / 10 ? (
                                    <a href={`/berries/page/${paramValue + 4}`}>No. {paramValue + 4} </a>

                                ) : (<p></p>)}

                                {berries && paramValue + 5 <= berries.count / 10 ? (
                                    <a href={`/berries/page/${paramValue + 5}`}>No. {paramValue + 5} </a>

                                ) : (<p></p>)}

                                {berries && berries.next == null ? (<p></p>) : (<a href={`/berries/page/${paramValue + 1}`}><button className="btn">Next</button></a>)}
                            </div>
                        </div>
                    )}

            </div>
        )
    
}


export default BerryPage;