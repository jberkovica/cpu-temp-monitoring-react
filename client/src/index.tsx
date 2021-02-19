import React from 'react';
import ReactDOM from 'react-dom';
import { io } from 'socket.io-client';
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

const socket = io('http://localhost:5000');

socket.on('connect', () => {
    console.log('Connected:', socket.id);
});

socket.on('update', function (updTempNow, updTempAvg) {
    ReactDOM.render(
        <App tempNow={updTempNow} tempAvg={updTempAvg} />,
        document.getElementById('root')
    );
});

// TODO: should I close socket connection?
