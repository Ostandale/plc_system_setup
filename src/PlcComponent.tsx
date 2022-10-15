
import './PlcComponent.css';
import SettingScreen from './SettingScreen';

function PlcComponent({ props }: any, key: any) {
    console.log(props)
    return (
        <div className='plcComponent' onClick={() => btnOn(props)}>
            {props}
            <div className='ipadd'>192.168.10.100</div>
            <div className='line'></div>
            <div>command read</div>
            <div>command write</div>
            <div>data read</div>
        </div>
    )
}

function btnOn(value: number) {
    console.log(value);
    return (< SettingScreen props={value} />)
}
export default PlcComponent;