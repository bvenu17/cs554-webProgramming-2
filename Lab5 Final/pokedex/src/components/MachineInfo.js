import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MachineInfo = (props) => {

    const [machineId, setMachineId] = useState(undefined);
    const [machineInfo, setMachineInfo] = useState(undefined);

    // const param = parseInt(props.match.params.id);

    useEffect(
        () => {

            setMachineId(parseInt(props.match.params.id));
            async function fetchData() {
                try {
                    const { data } = await axios.get('https://pokeapi.co/api/v2/machine/' + machineId);
                    setMachineInfo(data);
                    console.log('param is' + machineId);
                    console.log(machineInfo);
                } catch (e) {
                    console.log(e);
                }

            }
            fetchData();
        }, [machineId, machineInfo, props.match.params.id]
    )

        return (
            <div>
                {!machineInfo ? (
                    <p>404 error not found</p>
                ) : (
                        <div>
                            <p>Id: <b>{machineInfo && machineInfo.id}</b></p>
                            <p>Name: {machineInfo && machineInfo.item.name}</p>
                            <p>Move: {machineInfo && machineInfo.move.name}</p>
                            <p>Versions: {machineInfo && machineInfo.version_group.name}</p>
                        </div>
                    )}

            </div>
        )
    
}

export default MachineInfo;