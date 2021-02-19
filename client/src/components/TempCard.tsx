import React from 'react';

function TempCard(props) {
    return (
        <div className='temp-card'>
            <p>{props.title}</p>
            <h2 className='temperature' id='temp-now'>
                {props.temp}°
            </h2>
        </div>
    );
}

export default TempCard;
