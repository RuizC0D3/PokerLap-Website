

let idRouter = 0
let hasSocketStart = false
let clientService = false
const socketInitializers = async (idTorneo, clientIdConection) => {
    let ID_Router = 0
    if (clientIdConection) {
        ID_Router = clientIdConection
    }
    var socket = new WebSocket('wss://wt.pkti.me');
    socket.onopen = (event) => {
        console.log('conecta a: ', ID_Router);
        socket.send('{"action":"router","ID_Router":' + ID_Router + ',"ID_Torneo":' + idTorneo + '}');
    };
    socket.onmessage = (event) => {
        console.log('mensaje socket', event, arrayPlayers.length);
        let dataIn = event.data

        try {
            const DatosS = JSON.parse(JSON.parse(dataIn).Datos)
            const TipoP = JSON.parse(dataIn).Tipo
            try {
                let ID_RouterIn = DatosS.ID_Router
                console.log('entra atratr a: localstrage', ID_Router);

                if (ID_RouterIn && (!clientIdConection || (clientIdConection && parseInt(clientIdConection) !== parseInt(ID_RouterIn)))) {
                    let data = JSON.stringify({ id: ID_RouterIn, torneo: idTorneo })
                    console.log('gyarda a: localstrage', data);
                    localStorage.setItem(`clientConection${idTorneo}`, data);
                    console.log('gyuarda a: localstrage', data);
                    window.location.reload()

                }
            } catch (error) {

            }
            console.log(DatosS, TipoP);

            switch (TipoP) {
                case 'Datos':
                    if (!hasSocketStart) {
                        hasSocketStart = true
                        MainJs(true)
                    }
                    arrayPlayers = []
                    coloresServer = DatosS.Colores
                    colors = {
                        ...coloresServer,
                        strokeColor: coloresServer.Cambio ? coloresServer.Cambio : colors.titleColor,
                        strokeWidth: 4,
                        fontsColor: '#4EF8C2',
                        bgColor: 'yellow',
                        titleColor: coloresServer.Cambio ? coloresServer.Cambio : colors.titleColor,
                        mesaFondo: coloresServer.Mesa,
                        torneoName: DatosS.Nombre
                    }
                    let startIn = 0
                    for (const property in DatosS.Mesas) {
                        if (property === 'M0') {
                            listaEspera = DatosS.Mesas[property].Pos
                        }

                        property !== 'M0' && arrayPlayers.push({ aforo: DatosS.Mesas[property].Cupo, players: DatosS.Mesas[property].Pos, mesa: DatosS.Mesas[property].ID_Mesa })

                        startIn++
                    }
                    dataFor = querysGet()
                    drawBack(dataFor, arrayPlayers)
                    break;


                default:
                    break;
            }
        } catch (error) {

        }
        const verRealPos = (cupo = 0, posBase = 0) => {
            let sPosiciones = false
            switch (cupo) {
                case 2:
                    sPosiciones = "12"
                    break;
                case 3:
                    sPosiciones = "213"
                    break;
                case 4:
                    sPosiciones = "2314"
                    break;
                case 5:
                    sPosiciones = "32415"
                    break;
                case 6:
                    sPosiciones = "342516"
                    break;
                case 7:
                    sPosiciones = "4352617"
                    break;
                case 8:
                    sPosiciones = "45362718"
                    break;
                case 9:
                    sPosiciones = "546372819"
                    break;
                case 10:
                    sPosiciones = "5647382910"
                    break;

                default:
                    break;
            }
            let i
            if (posBase <= sPosiciones.length) {
                i = parseInt(sPosiciones.split('')[parseInt(posBase) - 1]) && parseInt(sPosiciones.split('')[parseInt(posBase) - 1]) <= parseInt(cupo) ? parseInt(sPosiciones.split('')[parseInt(posBase) - 1]) : 0

            } else {
                i = 10

            }
            return i
        }


        const BuscarMesa = (mesaIn) => {
            let lapos = false
            arrayPlayers.map((key, i) => {
                if (key.mesa && parseInt(key.mesa) === parseInt(mesaIn)) {
                    lapos = i
                }
            })
            return lapos
        }
        const Verindex = (pIn, mesaIn) => {
            let lapos = false
            arrayPlayers.map((key, i) => {
                if (key.mesa && parseInt(key.mesa) === parseInt(mesaIn)) {
                    key.players.map((keyP, iP) => {
                        if (keyP.p && parseInt(keyP.p) === parseInt(pIn)) {
                            lapos = iP

                        }
                    })
                }
            })
            return lapos
        }
        try {
            const DatosL = JSON.parse(dataIn)
            const TipoP = JSON.parse(dataIn).Tipo
            console.log('ewith2', TipoP, DatosL);

            switch (DatosL.Tipo) {
                case 'sentar':
                    console.log('sit', DatosL, 'porData', DatosL.Pos, 'posFix', verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos));
                    if (DatosL.Nombre && DatosL.Nombre !== '~reg' && DatosL.Nombre.split('~') && DatosL.Nombre.split('~')[1]) {
                        let newInfo = arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[Verindex(verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), DatosL.Mesa)]
                        newInfo = { ...newInfo, p: verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), n: DatosL.Nombre }
                        if (Verindex(verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), DatosL.Mesa)) {
                            arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[Verindex(verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), DatosL.Mesa)] = newInfo
                        } else {
                            arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players.push(newInfo)
                        }
                        crearElContetido()
                    }
                    if (DatosL.Nombre && DatosL.Nombre !== '~reg' && !DatosL.Nombre.split('~') || !DatosL.Nombre.split('~')[1]) {
                        const review = Verindex(verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), DatosL.Mesa)

                        let newInfo = {}

                        /*                         : { ...newInfo, p: verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), n: DatosL.Nombre }
                         */
                        console.log('asssssddadadsa', review);

                        if (!review !== true) {
                            newInfo = arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[review]
                            newInfo = { ...newInfo, p: verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), n: DatosL.Nombre }
                            arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[review] = newInfo
                            console.log('assssa');
                        } else {
                            console.log('essssee');
                            newInfo = { ...DatosL, p: verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), n: DatosL.Nombre }
                            arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players.push(newInfo)
                        }
                        crearElContetido()
                    }
                    if (DatosL.Nombre && DatosL.Nombre === '~reg') {
                        console.log(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))]);
                        if (arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].mesa === DatosL.Mesa) {
                            let newInfo = arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[Verindex(verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), DatosL.Mesa)]
                            newInfo = { ...newInfo, p: verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), n: '~reg' }
                            arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[Verindex(verRealdPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), DatosL.Mesa)] = newInfo
                            crearElContetido()
                        }
                    }
                    break;
                case 'reg':
                    console.log(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))]);
                    if (arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].mesa === DatosL.Mesa) {
                        let newInfo = arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[Verindex(verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), DatosL.Mesa)]
                        newInfo = { ...newInfo, p: verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos), n: '~reg' }
                        arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players.push(newInfo)
                        crearElContetido()
                    }
                    break;

                case 'lib':
                    console.log('lib', DatosL, arrayPlayers);
                    indexF = false
                    arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players.map((key, i) => {
                        if (parseInt(key.p) === parseInt(verRealPos(arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].aforo, DatosL.Pos))) {
                            indexF = i
                        }
                    })
                    let newMesa = []
                    arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players.map((keym, im) => {
                        im !== indexF ? newMesa.push(keym) : newMesa.push({})
                    })
                    arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players = newMesa
                    crearElContetido()
                    break;
                case 'misma':
                    const nuevaP = parseInt(verRealPos(arrayPlayers[(BuscarMesa(parseInt(DatosL.Mesa)))].aforo, parseInt(DatosL.nPos)))
                    const oldPos = parseInt(verRealPos(arrayPlayers[(BuscarMesa(parseInt(DatosL.Mesa)))].aforo, parseInt(DatosL.oPos)))
                    console.log('este map', BuscarMesa(parseInt(DatosL.Mesa)), arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))]);
                    indexF = false
                    let eld = false
                    console.log(oldPos, 'oldPos', nuevaP, 'nuevaP');
                    arrayPlayers[(BuscarMesa(parseInt(DatosL.Mesa)))].players.map((key, i) => {

                        if (parseInt(key.p) === nuevaP) {
                            console.log('este esa', key);
                            eld = { key: key, i: i }
                        }
                        if (parseInt(key.p) === oldPos) {
                            console.log('este ess', key);
                            indexF = i
                        }
                    })
                    if (indexF) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(imageNS, 0, 0, 1600, 900);
                        ctx.drawImage(imageLogoPokerLap, 1350, 25);
                        ctx.drawImage(imageLogoClub, 27, 5, 107, 85);
                        roundedRect(ctx, 27, 5, 109, 87, 12, 4, true);
                        let ChangingPos = eld && eld.key ? eld.key : false
                        console.log('cambiando este se ocupara', ChangingPos);

                        let newInfo = arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[Verindex(oldPos, DatosL.Mesa)]
                        newInfo.p = nuevaP
                        if (ChangingPos.n) {
                            arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players.push({ ...ChangingPos, p: oldPos })
                        }
                        arrayPlayers[BuscarMesa(parseInt(DatosL.Mesa))].players[Verindex(nuevaP, DatosL.Mesa)] = newInfo
                        crearElContetido()

                    }
                    break;
                case 'nueva':
                    arrayPlayers.push({
                        aforo: DatosL.Cupo,
                        mesa: DatosL.Mesa,
                        players: []
                    })
                    crearElContetido()
                    break;
                case 'del':
                    let newMesas = []
                    arrayPlayers.map((key, i) => {
                        if (key.mesa && parseInt(key.mesa) !== parseInt(DatosL.Mesa)) {
                            newMesas.push(key)
                        }
                    });
                    arrayPlayers = newMesas
                    crearElContetido()
                    break;
                default:
                    break;
            }
        } catch (error) {

        }
        arrayPlayers = arrayPlayers.sort((a, b) => a.mesa - b.mesa);

    };
    socket.onclose = (event) => {
        console.log('se cerro', event);
    };

}
const MainJsLi = (idTorneo) => {
    clientService = localStorage.getItem(`clientConection${idTorneo}`);

    console.log('socket');
    console.log('clientService', clientService ? JSON.parse(clientService) : !clientService);
    if (!clientService === true) {
        socketInitializers(idTorneo, false)

    } else {
        if (JSON.parse(clientService) && JSON.parse(clientService).id) {
            socketInitializers(idTorneo, JSON.parse(clientService).id)
        } else {
            localStorage.removeItem(`clientConection${idTorneo}`);
        }

    }

}
