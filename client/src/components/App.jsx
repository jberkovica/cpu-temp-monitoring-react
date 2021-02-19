import React from 'react';

import Header from '../components/Header';
import TempCard from '../components/TempCard';

function App(props) {
    return (
        <div className='container-fluid'>
            <Header></Header>
            <TempCard title='Current temperature' temp={props.tempNow}></TempCard>
            <TempCard title='Last minute average' temp={props.tempAvg}></TempCard>
        </div>
    );
}

export default App;
