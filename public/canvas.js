
let arrayPlayers = [], imageNS, imageLogoPokerLap, imageLogoClub
let listaEspera = {}
let coloresServer = false, loaded = false, crearElContetido = console.log
let colors = {
    strokeColor: 'black',
    strokeWidth: 4,
    fontsColor: '#4EF8C2',
    bgColor: 'yellow',
    titleColor: 'black',
    mesaFondo: 'darkblue',
    torneoName: 'ROCAS',
    imgFondo: "aceite.jpg",
    logo: "aceite.jpg"
}, dataFor
let ctx
let startLI
let endLI
let fullPlayers = []
let canvas, idRouter = 0

const querysGet = () => {
    var querystring = window.location.search
    var params = new URLSearchParams(querystring)
    var querys = {
        endLI: false,
        startLI: false,
        all: params.get('liAll'),
        start: params.get('liStart'),
        end: params.get('liEnd'),
        especific: params.get('liEspecific'),
        shedule: params.get('liShedule'),
        sheduleTime: params.get('liSheduleTime'),
    }

    if (isNaN(parseInt(querys.start))) {
        startLI = false
    } else {
        startLI = parseInt(querys.start) > 9 ? parseInt(querys.start) + 1 : parseInt(querys.start)
    }
    if (isNaN(parseInt(querys.end))) {
        endLI = false
    } else {
        endLI = parseInt(querys.end)
    }
    querys = {
        ...querys,
        endLI: endLI,
        startLI: startLI
    }
    return querys

}
const socketInitializer = async () => {

    var socket = new WebSocket('wss://wt.pkti.me');
    socket.onopen = (event) => {
        socket.send('{"action":"router","ID_Router":' + idRouter + '}');
    };
    socket.onmessage = (event) => {
        console.log('333', event);
        let dataIn = event.data
        try {
            console.log(JSON.parse(dataIn));
        } catch (error) {

        }
    };


}
const MainJs = () => {
    querysGet()
    socketInitializer()

}
