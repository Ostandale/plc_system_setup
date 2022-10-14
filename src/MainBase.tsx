import React from 'react';
import './MainBase.css';
import PlcComponent from './PlcComponent';

function MainBase() {
    const plcs = ['PLC 1', 'PLC 2', 'PLC 3', 'PLC 4', 'PLC 5', 'PLC 6', 'PLC 7', 'PLC8'];
    return (
        <div >
            親
            <div className='base'>
                {plcs.map((value, index) => {
                    return <PlcComponent name={value} />
                })}
                <PlcComponent name="test test" />
            </div>
        </div>
    )
}
export default MainBase;