const si = require('systeminformation');
const app = require('express')();
const server = require('http').createServer(app);
const options = {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
};
const io = require('socket.io')(server, options);

// configuration
const refreshInterval = 3000;
const periodSeconds = 60;
const periodMaxLen = (periodSeconds * 1000) / refreshInterval;

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


io.on("connection", (socket) => {

    console.log("New connection: " + socket.id);
    const tempInPeriod = [];

    monitorCPU(socket, tempInPeriod);
});


function monitorCPU(socket, tempInPeriod) {
    setInterval(function () {
        si.cpuTemperature()
            .then(function (data) {
                const tempNow = parseFloat(data.main.toFixed(1));
                const tempAvg = parseFloat(calcAverage(tempNow, tempInPeriod).toFixed(1));

                console.log("Current temp: " + tempNow);
                console.log("Last min average: " + tempAvg);

                socket.emit("update", tempNow, tempAvg);
            })
            .catch((error) => console.error(error));
    }, refreshInterval);
}

function calcAverage(temp, tempInPeriod) {
     
    tempInPeriod.push(temp);

    // var 1
    if (tempInPeriod.length > periodMaxLen) {
        tempInPeriod.shift();
    }
    
    // var 2
    // tempInPeriod = [...tempInPeriod, temp].slice(-periodMaxLen);

    // var 3
    // tempInPeriod =
    //     tempInPeriod.length > periodMaxLen
    //         ? [...tempInPeriod, temp].slice(-periodMaxLen)
    //         : [...tempInPeriod, temp];


    console.log(tempInPeriod);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let total = tempInPeriod.reduce(reducer);

    return total / tempInPeriod.length;
}

server.listen(5000, () => {
    console.log("listening on *:5000");
});

