import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BerryInfo = (props) => {

    const [berryId, setBerryId] = useState(undefined);
    const [berryInfo, setBerryInfo] = useState(undefined);

    useEffect(
        () => {

            setBerryId(parseInt(props.match.params.id));
            async function fetchData() {
                try {
                    const { data } = await axios.get('https://pokeapi.co/api/v2/berry/' + berryId);
                    setBerryInfo(data);
                    console.log('param is' + berryId);
                    console.log(berryInfo);
                } catch (e) {
                    console.log(e);
                }

            }
            fetchData();
        }, [berryId,props.match.params.id,berryInfo]
    )

    return (

        <div>
            {!berryInfo ? (
                <p status={404}>Error 404 not found</p>
            ) : (
                <div>
                 <p>Name: <b>{berryInfo && berryInfo.name}</b></p>
                 <p>Id: {berryInfo && berryInfo.id}</p>
                 <p>Size: {berryInfo && berryInfo.size}</p>
                 <p>Smoothness: {berryInfo && berryInfo.smoothness}</p>
                 </div>
            )}

           
        </div>
    )
     
}

export default BerryInfo;