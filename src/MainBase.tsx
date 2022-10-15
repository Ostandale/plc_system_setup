import './MainBase.css';
import PlcComponent from './PlcComponent';
import SettingScreen from './SettingScreen';

function MainBase() {
    const plcs = ['PLC 1', 'PLC 2', 'PLC 3', 'PLC 4', 'PLC 5', 'PLC 6', 'PLC 7', 'PLC 8'];
    return (
        <div >
            <div className='base'>
                {plcs.map((value, key) => {
                    return <PlcComponent props={value} key={key} />
                })}
            </div>

        </div>
    )
}
export default MainBase;