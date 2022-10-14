import React from 'react';
import './PlcComponent.css';

function PlcComponent(get_props: any) {
    return (

        <button className='button'>
            {get_props.name}
            <div className='line'></div>
            <button onClick={btnOn}>設定</button>
            <div>設定２</div>

        </button>

    )
}

function btnOn() {
    console.log("aaa");
}
export default PlcComponent;