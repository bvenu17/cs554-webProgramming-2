import React, { useState, useEffect } from 'react';
import axios from 'axios';
const BerryPage = (props) => {

    const [machine, setMachine] = useState(undefined);
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
            const offset = pageNumber * 20;
            async function fetchData() {
                try {

                    const { data } = await axios.get('https://pokeapi.co/api/v2/machine/?offset=' + offset + '&limit=20');
                    setMachine(data);
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

                {machine && pageNumber > machine.count / 20 || pageNumber < 0 ? (
                    <p>error 404 not found</p>
                ) : (
                        <div>
                            {machine && machine.results.map((item, index) => {
                                return (
                                    <div className="pagecontainer">
                                        <a className="pagecontent" href={`/machine/${item, index + 1 + pageNumber * 20}`}>Machine {`${index + 1 + pageNumber * 20}`}</a>

                                    </div>
                                )
                            }
                            )
                            }
                            {/* <Pages count={pokemons && pokemons.count} pageVal={paramValue} /> */}
                            <div className="pagination">
                                {machine && machine.previous == null ? (<p></p>) : (<a href={`/machine/page/${paramValue - 1}`}><button className="btn">Previous</button> </a>)}

                                {/* {machine && paramValue - 1 <= machine.count / 20 && paramValue - 1 >= 0 ? (
                                    <a href={`/machine/page/${paramValue - 1}`}>{paramValue - 1} </a>

                                ) : (<p></p>)} */}
                                {machine && paramValue + 1 <= machine.count / 20 ? (
                                    <a href={`/machine/page/${paramValue + 1}`}>No. {paramValue + 1}</a>

                                ) : (<p></p>)}

                                {machine && paramValue + 2 <= machine.count / 20 ? (
                                    <a href={`/machine/page/${paramValue + 2}`}>No. {paramValue + 2} </a>

                                ) : (<p></p>)}

                                {machine && paramValue + 3 <= machine.count / 20 ? (
                                    <a href={`/machine/page/${paramValue + 3}`}>No. {paramValue + 3} </a>

                                ) : (<p></p>)}

                                {machine && paramValue + 4 <= machine.count / 20 ? (
                                    <a href={`/machine/page/${paramValue + 4}`}>No. {paramValue + 4} </a>

                                ) : (<p></p>)}

                                {machine && paramValue + 5 <= machine.count / 20 ? (
                                    <a href={`/machine/page/${paramValue + 5}`}>No. {paramValue + 5} </a>

                                ) : (<p></p>)}

                                {machine && machine.next == null ? (<p></p>) : (<a href={`/machine/page/${paramValue + 1}`}><button className="btn">Next</button></a>)}
                            </div>
                        </div>
                    )}

            </div>
        )
    
}

export default BerryPage;