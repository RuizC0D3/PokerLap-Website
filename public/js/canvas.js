
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
    logo: ''
}, dataFor
let ctx
let startLI
let endLI
let fullPlayers = []
let canvas

const SizeCanvas = (socketDraw = false) => {
    canvas = document.getElementById(`list-canvas`)
    canvas.width = 1600
    canvas.height = 900
    ctx = canvas.getContext("2d");
    let winWidth = window.innerWidth, winHeigth = window.innerHeight
    if (winHeigth * 1.75 > winWidth) {
        canvas.className = 'mas-h list-canvas'
    } else {
        if (winWidth > winHeigth * 1.5625) {
            canvas.className = 'mas-w-h list-canvas'
        }
    }
    ctx.clearRect(0, 0, 1600, 900);
    socketDraw ? drawBackSocket() : drawBack();
    crearContenido()
}
const querysGet = () => {
    var querystring = window.location.search
    var params = new URLSearchParams(querystring)
    var querys = {
        endLI: false,
        startLI: false,
        all: params.get('t'),
        start: params.get('i'),
        end: params.get('f'),
        especific: params.get('e'),
        shedule: params.get('r'),
        sheduleTime: params.get('m'),
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
function roundedRect(ctxr = false, x, y, width, height, radius, strokeExtra = false, noOpacity = false, pageborder = false) {
    if (ctxr) {
        ctxr.beginPath();
        ctxr.lineWidth = strokeExtra ? strokeExtra : colors.strokeWidth;
        ctxr.strokeStyle = pageborder ? pageborder : noOpacity ? 'white' : colors.strokeColor
        ctxr.moveTo(x, y + radius);
        ctxr.lineTo(x, y + height - radius);
        ctxr.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctxr.lineTo(x + width - radius, y + height);
        ctxr.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctxr.lineTo(x + width, y + radius);
        ctxr.quadraticCurveTo(x + width, y, x + width - radius, y);
        ctxr.lineTo(x + radius, y);
        ctxr.quadraticCurveTo(x, y, x, y + radius);
        ctxr.stroke();
        ctxr.fillStyle = noOpacity ? 'transparent' : colors.mesaFondo;
        ctxr.globalAlpha = noOpacity ? 1 : 0.5;
        ctxr.fill();
        ctxr.save();
    }

}
const drawBack = () => {
    if (loaded) {
        ctx.drawImage(imageNS, 0, 0, 1600, 900);
        ctx.drawImage(imageLogoPokerLap, 1350, 25);
        ctx.drawImage(imageLogoClub, 27, 5, 107, 85);
        roundedRect(ctx, 27, 5, 109, 87, 12, 4, true);
    } else {
        imageNS = new Image
        imageNS.src = `http://pkt/images/${coloresServer.imgFondo}`
        imageNS.addEventListener("load", (e) => {
            ctx.drawImage(imageNS, 0, 0, 1600, 900);
            imageLogoPokerLap = new Image
            imageLogoPokerLap.src = `http://pkt/images/logoblanco.png`
            imageLogoPokerLap.width = 300
            imageLogoPokerLap.height = 80
            imageLogoPokerLap.className = 'imagenLogoClub'
            imageLogoPokerLap.addEventListener("load", (e) => {
                ctx.drawImage(imageLogoPokerLap, 1350, 25);
                imageLogoClub = new Image
                imageLogoClub.src = `http://pkt/clubs/${coloresServer.logo}`
                imageLogoClub.className = 'imagenLogoClub'
                imageLogoClub.addEventListener("load", (e) => {
                    imageLogoClub.width = 20
                    imageLogoClub.height = 80
                    ctx.drawImage(imageLogoClub, 27, 5, 107, 85);
                    roundedRect(ctx, 27, 5, 109, 87, 12, 4, true);
                    loaded = true
                    crearContenido()
                });
            });
        });
    }

}
const drawBackSocket = () => {
    if (loaded) {
        ctx.drawImage(imageNS, 0, 0, 1600, 900);
        ctx.drawImage(imageLogoPokerLap, 1350, 25);
        ctx.drawImage(imageLogoClub, 27, 5, 107, 85);
        roundedRect(ctx, 27, 5, 109, 87, 12, 4, true);
    } else {
        imageNS = new Image
        imageNS.src = coloresServer.imgFondo.split('.') && coloresServer.imgFondo.split('.')[1] ? `./images/${coloresServer.imgFondo}` : `./images/verde.jpg`
        console.log(coloresServer.imgFondo.split('.') && coloresServer.imgFondo.split('.')[1] ? `./images/${coloresServer.imgFondo}` : `./images/verde.jpg`);
        imageNS.addEventListener("load", (e) => {
            imageLogoPokerLap = new Image
            imageLogoPokerLap.src = `./images/logoblanco.png`
            imageLogoPokerLap.width = 300
            imageLogoPokerLap.height = 80
            imageLogoPokerLap.className = 'imagenLogoClub'
            imageLogoPokerLap.addEventListener("load", (e) => {
                imageLogoClub = new Image
                imageLogoClub.src = coloresServer.logo.split('.') && coloresServer.logo.split('.')[1] ? `https://img.pkti.me/club/${coloresServer.logo}` : `./images/logoblanco.png`
                imageLogoClub.className = 'imagenLogoClub'
                imageLogoClub.addEventListener("load", (e) => {
                    imageLogoClub.width = 20
                    imageLogoClub.height = 80
                    ctx.drawImage(imageNS, 0, 0, 1600, 900);
                    ctx.drawImage(imageLogoPokerLap, 1350, 25);
                    ctx.drawImage(imageLogoClub, 27, 5, 107, 85);
                    roundedRect(ctx, 27, 5, 109, 87, 12, 4, true);
                    crearContenido()
                });
            });
        });
        loaded = true

    }

}
const crearContenido = () => {
    arrayPlayers = arrayPlayers.sort((a, b) => a.mesa - b.mesa);
    
    let losPlayers = arrayPlayers

    losPlayers.map((key, index) => {
        let initPX = index > 4 ? (((index - 5) * 315) + 25) : ((index * 315) + 25)
        let initPY = index > 4 ? 500 : 100
        let finPX = (index * 315) + 315
        let finPY = 100 + 375
        ctx.moveTo(initPX, initPY);
        roundedRect(ctx, initPX, initPY, 295, 375, 25, false, false, "#CDDE35");
        ctx.globalAlpha = 1;
        ctx.stroke();
        ctx.font = "30px Bebas";
        ctx.moveTo(initPX + 3, (32 + initPY));
        ctx.fillStyle = "#CDDE35";
        const mesaGame = `          Table  ${key.mesa}`
        ctx.fillText(mesaGame, initPX + 40, (32 + initPY));
        initPY = initPY + 10
        let fixedArray = []
        for (let indexInital = 0; indexInital < key.aforo; indexInital++) {
            fixedArray.push({ mesa: key.mesa, p: indexInital + 1, n: '' })
        }
        key.players.map((keyInp, iInp) => {
            if (keyInp.n) {
                fixedArray[parseInt(keyInp.p) - 1] = keyInp
            }
        })
        fixedArray.sort((a, b) => a.mesa - b.mesa);
        for (let iName = 0; iName < fixedArray.length; iName++) {
            if (fixedArray[iName].p) {
                const keyName = fixedArray[iName];
                ctx.beginPath();
                ctx.fillStyle = colors.fontsColor ? colors.fontsColor : 'black'
                ctx.arc(initPX + 29, (17.5 + (initPY - 4) + (36.5 * (iName + 1))), 12.5, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.moveTo(initPX + 3, (25 + (initPY - 4) + (36.5 * (iName + 1))));
                ctx.font = "22px Bebas";
                ctx.fillText(keyName.p === 10 ? 0 : keyName.p, initPX + 25, (25 + (initPY - 4) + (36.5 * (iName + 1))));
                ctx.font = "28px Bebas";
                let elName = ''
                if (keyName.n && keyName.n.split('') && keyName.n.split('').length < 15) {
                    elName = `  ${keyName.n} `
                } else {
                    if (keyName.n && keyName.n.split('') && keyName.n.split('').length >= 15) {
                        keyName.n.split('').map((keyN, iN) => {
                            if (iN < 15) {
                                elName = elName + keyN
                            }
                        })
                    }
                }
                elName = elName.trim()
                if (elName === '~reg') {
                    ctx.fillStyle = "#CDDE35"

                    ctx.fillText('Registering...', initPX + 55, (25 + initPY + (36.5 * (iName + 1))));
                    ctx.font = "28px fichas";
                    ctx.fillStyle = colors.strokeColor
                    ctx.fillText('m', initPX + 260, (25 + initPY + (36.5 * (iName + 1))));
                } else {
                    if (elName && elName.split('~') && elName.split('~')[1]) {
                        ctx.fillStyle = "#CDDE35"
                        ctx.fillText(elName.split('~')[1], initPX + 55, (25 + initPY + (36.5 * (iName + 1))));
                        ctx.font = "28px fichas";
                        ctx.fillStyle = colors.strokeColor
                        ctx.fillText('p', initPX + 265, (25 + initPY + (36.5 * (iName + 1))));

                    } else {
                        ctx.fillText(elName, initPX + 55, (25 + initPY + (36.5 * (iName + 1))));

                    }
                }
                ctx.save();

            } else {
                let elIndex = `${iName + 1}   `
                const keyName = '';
                ctx.beginPath();
                ctx.fillStyle = colors.fontsColor
                ctx.arc(initPX + 29, (17.5 + (initPY - 4) + (36.5 * (iName + 1))), 12.5, 0, 2 * Math.PI);
                ctx.stroke();
                ctx.moveTo(initPX + 3, (25 + (initPY - 4) + (36.5 * (iName + 1))));
                ctx.font = "22px Bebas";
                ctx.fillText(elIndex, initPX + 25, (25 + (initPY - 4) + (36.5 * (iName + 1))));
                ctx.font = "28px Bebas";
                ctx.save();

            }
        }
    })
    const torneoName = colors.torneoName
    const x = (canvas.width / 2) - 5;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.font = "60px Bebas";
    ctx.fillText(torneoName, x, 65);
}

const socketInitializer = async () => {
    var client = null;
    var clientID = "LS-" + new Date().getTime();
    function Conectar() {
        client = new Paho.MQTT.Client("pkt", 51043, "", clientID);
        client.onConnectionLost = onConnectionLost;
        client.onMessageArrived = onMessageArrived;
        client.connect({ onSuccess: onConnect });
    }
    Conectar()
    function onConnect() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("Contectado!");
        client.subscribe("LS");
        client.subscribe(clientID);
        client.send("newLS", '{"ID_LS":"' + clientID + '"}');
    }
    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);

        }
        setTimeout(function () { Conectar(); }, 1000);
    }
    function onMessageArrived(message) {
        server_datos = JSON.parse(message.payloadString);
        console.log(message.destinationName, ":", server_datos);

        if (server_datos.Tipo && server_datos.Tipo === 'Todo') {
            arrayPlayers = []
            coloresServer = server_datos.Colores
            colors = {
                ...coloresServer,
                strokeColor: coloresServer.Cambio ? coloresServer.Cambio : colors.titleColor,
                strokeWidth: 4,
                fontsColor: '#4EF8C2',
                bgColor: 'yellow',
                titleColor: coloresServer.Cambio ? coloresServer.Cambio : colors.titleColor,
                mesaFondo: coloresServer.Mesa,
                torneoName: coloresServer.Nombre
            }
            let startIn = 0
            for (const property in server_datos.Mesas) {
                if (property === 'M0') {
                    listaEspera = server_datos.Mesas[property].Pos
                }

                if (!startLI || (startLI && startIn >= startLI) && (endLI ? startIn > endLI ? false : true : true)) {
                    property !== 'M0' && arrayPlayers.push({ aforo: server_datos.Mesas[property].Cupo, players: server_datos.Mesas[property].Pos, mesa: server_datos.Mesas[property].ID_Mesa })

                }
                startIn++
            }
            dataFor = querysGet()
            drawBack(dataFor, arrayPlayers)

        }
        if (server_datos.Tipo && server_datos.Tipo !== 'Todo') {
            let indexF
            switch (server_datos.Tipo) {
                case 'sit':
                    console.log('sit', server_datos, arrayPlayers);
                    if (server_datos.n && server_datos.n !== '~reg' && server_datos.n.split('~') && server_datos.n.split('~')[1]) {
                        let newInfo = arrayPlayers[parseInt(server_datos.m) - 1].players[server_datos.p - 1]
                        newInfo = { ...newInfo, p: server_datos.p, n: server_datos.n }
                        arrayPlayers[parseInt(server_datos.m) - 1].players[server_datos.p - 1] = newInfo
                        crearElContetido()
                    }
                    if (server_datos.n && server_datos.n !== '~reg' && !server_datos.n.split('~') || !server_datos.n.split('~')[1]) {
                        if (arrayPlayers[parseInt(server_datos.m) - 1].mesa === server_datos.m) {
                            let newInfo = arrayPlayers[parseInt(server_datos.m) - 1].players[server_datos.p - 1]
                            newInfo = { ...newInfo, p: server_datos.p, n: server_datos.n }
                            arrayPlayers[parseInt(server_datos.m) - 1].players[server_datos.p - 1] = newInfo
                            crearElContetido()
                        }
                    }
                    if (server_datos.n && server_datos.n === '~reg') {
                        console.log(arrayPlayers[parseInt(server_datos.m) - 1]);
                        if (arrayPlayers[parseInt(server_datos.m) - 1].mesa === server_datos.m) {
                            let newInfo = arrayPlayers[parseInt(server_datos.m) - 1].players[server_datos.p - 1]
                            newInfo = { ...newInfo, p: server_datos.p, n: '~reg' }
                            arrayPlayers[parseInt(server_datos.m) - 1].players[server_datos.p - 1] = newInfo
                            crearElContetido()
                        }
                    }
                    break;

                case 'lib':
                    console.log('lib', server_datos, arrayPlayers);
                    indexF = false
                    arrayPlayers[(parseInt(server_datos.m) - 1)].players.map((key, i) => {
                        if (parseInt(key.p) === parseInt(server_datos.p)) {
                            console.log('este es', key.n);
                            indexF = i
                        }
                    })
                    let newMesa = []
                    arrayPlayers[parseInt(server_datos.m) - 1].players.map((keym, im) => {
                        im !== indexF ? newMesa.push(keym) : newMesa.push({})
                    })
                    arrayPlayers[parseInt(server_datos.m) - 1].players = newMesa
                    crearElContetido()
                    break;
                case 'misma':
                    console.log('este map', arrayPlayers[parseInt(server_datos.m) - 1]);
                    indexF = false
                    arrayPlayers[(parseInt(server_datos.m) - 1)].players.map((key, i) => {

                        if (parseInt(key.p) === parseInt(server_datos.o)) {
                            console.log('este es', key.n);
                            indexF = i
                        }
                    })
                    if (indexF) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(imageNS, 0, 0, 1600, 900);
                        ctx.drawImage(imageLogoPokerLap, 1350, 25);
                        ctx.drawImage(imageLogoClub, 27, 5, 107, 85);
                        roundedRect(ctx, 27, 5, 109, 87, 12, 4, true);
                        let ChangingPos = arrayPlayers[parseInt(server_datos.m) - 1].players[indexF]
                        console.log('cambiando este se ocupara', ChangingPos);

                        let newInfo = arrayPlayers[parseInt(server_datos.m) - 1].players[indexF]
                        newInfo.p = server_datos.n
                        if (ChangingPos.n) {
                            arrayPlayers[parseInt(server_datos.m) - 1].players[indexF] = { ...ChangingPos, p: server_datos.o }
                        }
                        arrayPlayers[parseInt(server_datos.m) - 1].players[server_datos.n - 1] = newInfo
                        crearElContetido()

                    }

                    break;
                default:
                    break;
            }
        }
    }
}
const MainJs = (socktType = false) => {
    console.log(socktType ? 'SocketStart' : 'mqtt');
    querysGet()
    !socktType && socketInitializer()
    setInterval(() => {
        SizeCanvas(socktType)
    }, 1);
}
/*  const torneoName = colors.torneoName
        let palabrasMany = torneoName.split('').length
        const x = (canvas.width / 2) - 5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.font = "30px serif";
        ctx.textAlign = "center";
        ctx.font = "60px Bebas";
        ctx.fillText(torneoName, x, 65); */