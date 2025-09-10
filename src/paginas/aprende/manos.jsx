'use client'

import Image from "next/image"
import { useState } from "react"

const Manos = (props) => {
    const { setOpt = console.log, lang = 'es' } = props
    const [aprendeVista, setaprendeVista] = useState(0)
    const cartas = IdiomasCartas[lang]
    return (
        <>
            <div className="manos">
                <div className="manos-container">
                    {
                        cartas.map((key, i) => {
                            return (
                                <>
                                    <div className={`cartas-valores-hijo${i} cartas-valores-hijo`} key={`funciones-grid-${i}`} id={`funciones-grid-${i}`}>
                                        <Image src={`/multimedia/cartas/${key.url}.png`} alt="seccionesimg" height={400} width={400} />
                                        <div className="texto">
                                            <span className="texto-titulo">
                                                {key.string}
                                            </span>
                                            <p >
                                                {key.descripcion}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })
                    }

                </div>
            </div>
        </>

    )
}
export default Manos

const IdiomasCartas = {
    es: [{ string: ' Escalera Real', descripcion: 'La mano más famosa del poker: una escalera real es invencible.Está compuesta por as, rey, dama, jota y diez de un mismo palo.', url: 'ESCALERA_REAL' },
    { string: ' Escalera de Color', descripcion: 'Cinco cartas consecutivas del mismo palo.En caso de empate, aquella que finalice en la carta más alta gana.', url: 'ESCALERA_COLOR' },
    { string: ' Poker', descripcion: 'Cuatro cartas del mismo valor y una carta no emparejada o kicker.En caso de empate, el jugador con la carta no emparejada(kicker) más alta gana.', url: 'POKER' },
    { string: ' Full', descripcion: 'Tres cartas del mismo valor y una pareja de un mismo valor diferente al anterior.En caso de empate, gana el trío más alto.', url: 'FULL_HOUSE' },
    { string: ' Color', descripcion: 'Cinco cartas del mismo palo, no consecutivas.En caso de empate, gana el jugador con la carta más alta.', url: 'COLOR' },
    { string: ' Escalera', descripcion: 'Cinco cartas consecutivas que no son del mismo palo.En caso de empate, gana la carta más alta.', url: 'ESCALERA' },
    { string: ' Trío', descripcion: 'Tres cartas del mismo valor y dos cartas desemparejadas.En caso de empate, el jugador con la carta no emparejada(o la segunda carta, de ser necesario) más alta(kicker) gana.', url: 'TRIO' },
    { string: ' Doble Pareja', descripcion: 'Dos cartas del mismo valor, dos cartas de diferente rango con el mismo valor, y un kicker.Si los jugadores tienen exactamente las mismas dobles parejas, el kicker más alto gana.', url: 'DOS_PARES' },
    { string: ' Pareja', descripcion: 'Dos cartas del mismo valor y tres cartas desemparejadas.En caso de empate, el jugador con la carta no emparejada(o la segunda o tercera carta, de ser necesario) más alta gana.', url: 'PAR' },
    { string: ' Carta Alta', descripcion: 'Cualquier mano que no esté clasificada en una de las categorías anteriores.En caso de empate, la carta más alta gana; por ejemplo "as alto".', url: 'CARTA_ALTA' }
    ],
    en: [{
        string: 'Royal flush',
        descripcion: 'The most famous hand in poker: a royal flush is invincible. It is made up of ace, king, queen, jack and ten of the same suit.', url: 'ESCALERA_REAL'
    },
    {
        string: 'Color Ladder',

        descripcion: 'Five consecutive cards of the same suit. In the event of a tie, the one that ends on the highest card wins.', url: 'ESCALERA_COLOR'
    },
    {
        string: 'Poker',

        descripcion: 'Four cards of the same rank and one unpaired card or kicker. In the event of a tie, the player with the highest unpaired card (kicker) wins', url: 'POKER'
    },
    {
        string: ' Full',
        descripcion: 'Three cards of the same value and a pair of the same value different from the previous one. In the event of a tie, the highest trio wins.', url: 'FULL_HOUSE'
    },
    {
        string: ' Color',

        descripcion: 'Five cards of the same suit, not consecutive. In the event of a tie, the player with the highest card wins.', url: 'COLOR'
    },
    {
        string: ' Stairs',

        descripcion: 'Five consecutive cards that are not of the same suit. In the event of a tie, the highest card wins.', url: 'ESCALERA'
    },
    {
        string: ' Couple',

        descripcion: 'Two cards of the same rank and three unpaired cards. In the event of a tie, the player with the highest unpaired card (or the second or third card, if necessary) wins.', url: 'TRIO'
    },
    {
        string: ' Trio',

        descripcion: 'Three cards of the same rank and two unpaired cards. In the event of a tie, the player with the highest unpaired card (or second card, if necessary) (kicker) wins.', url: 'TRIO'
    },
    { string: 'Double Pair', descripcion: 'Two cards of the same rank, two cards of different rank with the same rank, and a kicker. If the players have exactly the same two pair, the highest kicker wins.', url: 'DOS_PARES' },
    { string: 'High Letter', descripcion: 'Any hand that is not classified in one of the previous categories. In case of a tie, the highest card wins; for example "ace high".', url: 'CARTA_ALTA' }
    ],
    ger: [{
        string: 'Royal Flush',
        descripcion: 'ie berühmteste Hand im Poker: Ein Royal Flush ist unbesiegbar. Es besteht aus Ass, König, Königin, Bube und zehn derselben Farbe.',
        url: 'ESCALERA_REAL'
    },
    {
        string: 'Farbleiter Fünf',

        descripcion: 'aufeinanderfolgende Karten derselben Farbe. Bei einem Unentschieden gewinnt derjenige, der auf der höchsten Karte endet.',
        url: 'ESCALERA_COLOR'
    },
    {
        string: 'Poker Vier',

        descripcion: 'Karten des gleichen Ranges und eine ungepaarte Karte oder ein Kicker. Bei einem Unentschieden gewinnt der Spieler mit der höchsten ungepaarten Karte (Kicker).',
        url: 'POKER'
    },

    {
        string: 'Voll Drei',
        descripcion: 'Karten mit demselben Wert und ein Paar mit demselben Wert, das sich von der vorherigen unterscheidet. Bei einem Unentschieden gewinnt das höchste Trio',
        url: 'FULL_HOUSE'
    },
    {
        string: 'Farbe Fünf',

        descripcion: 'Karten derselben Farbe, nicht aufeinanderfolgend. Bei einem Unentschieden gewinnt der Spieler mit der höchsten Karte.',
        url: 'COLOR'
    },
    {
        string: 'Treppe Fünf',

        descripcion: 'aufeinanderfolgende Karten, die nicht dieselbe Farbe haben. Bei einem Unentschieden gewinnt die höchste Karte.',
        url: 'ESCALERA'
    },
    {
        string: 'Trio Drei',
        descripcion: 'Karten des gleichen Ranges und zwei ungepaarte Karten. Bei einem Unentschieden gewinnt der Spieler mit der höchsten ungepaarten Karte (oder ggf. der zweiten Karte) (Kicker).',
        url: 'TRIO'
    },
    {
        string: 'Doppelpaar Zwei',
        descripcion: 'Karten des gleichen Ranges, zwei Karten des gleichen Ranges mit dem gleichen Rang und ein Kicker. Wenn die Spieler genau die gleichen zwei Paare haben, gewinnt der höchste Kicker.',
        url: 'DOS_PARES'
    },
    {
        string: 'Paar Zwei',
        descripcion: 'Karten des gleichen Ranges und drei ungepaarte Karten. Bei einem Unentschieden gewinnt der Spieler mit der höchsten ungepaarten Karte (oder ggf. der zweiten oder dritten Karte).',
        url: 'PAR'
    },

    {
        string: 'Hoher Brief',
        descripcion: 'Jede Hand, die nicht in eine der vorherigen Kategorien eingestuft ist.Bei einem Unentschieden gewinnt die höchste Karte; zum Beispiel "Ass hoch"',
        url: 'CARTA_ALTA'
    }
    ],
    fr: [{
        string: 'Quinte royale',
        descripcion: `La main la plus célèbre du poker: une quinte flush royale est invincible.Il est composé d'un as, d'un roi, d'une reine, d'un valet et de dix de la même couleur.`,

        url: 'ESCALERA_REAL'
    },
    {
        string: 'Échelle de couleur',
        descripcion: `Cinq cartes consécutives de la même couleur.En cas d'égalité, celui qui se termine sur la carte la plus élevée l'emporte.`,
        url: 'ESCALERA_COLOR'
    },
    {
        string: 'Poker',
        descripcion: `Quatre cartes de même rang et une carte non appariée ou kicker.En cas d'égalité, le joueur avec la carte non appariée la plus élevée (kicker) l'emporte.`,
        url: 'POKER'
    },
    {
        string: 'Complet',
        descripcion: `Trois cartes de même valeur et une paire de même valeur différente de la précédente.En cas d'égalité, le trio le plus élevé l'emporte.`,
        url: 'FULL_HOUSE'
    },
    {
        string: 'Couleur',
        descripcion: `Cinq cartes de la même couleur, non consécutives.En cas d'égalité, le joueur avec la carte la plus élevée l'emporte.`,
        url: 'COLOR'
    },
    {
        string: 'Escalier',
        descripcion: `Cinq cartes consécutives qui ne sont pas de la même couleur.En cas d'égalité, la carte la plus élevée l'emporte.`,
        url: 'ESCALERA'
    },
    {
        string: 'Trio',
        descripcion: `Trois cartes de même rang et deux cartes non appariées.En cas d'égalité, le joueur avec la carte non appariée la plus élevée (ou la deuxième carte, si nécessaire) (kicker) l'emporte`,
        url: 'TRIO'
    },
    {
        string: 'Double paire',
        descripcion: `Deux cartes de même rang, deux cartes de rang différent avec le même rang et un kicker.Si les joueurs ont exactement les mêmes deux paires, le botteur le plus élevé l'emporte.`,
        url: 'DOS_PARES'
    },
    {
        string: 'Coupler',
        descripcion: `Deux cartes de même rang et trois cartes non appariées.En cas d'égalité, le joueur avec la carte non appariée la plus élevée (ou la deuxième ou la troisième carte, si nécessaire) l'emporte.`,
        url: 'PAR'
    },
    {
        string: 'Lettre haute',
        descripcion: `Toute main qui n'est pas classée dans l'une des catégories précédentes.En cas d'égalité, la carte la plus élevée l'emporte; par exemple "ace high".`,
        url: 'CARTA_ALTA'
    }
    ],
    prt: [{ string: 'Rubor Real', descripcion: 'A mão mais famosa no pôquer: um royal flush é invencível. É composto por ás, rei, rainha, valete e dez do mesmo naipe.', url: 'ESCALERA_REAL' },
    { string: 'Escada de cores', descripcion: 'Cinco cartas consecutivas do mesmo naipe. Em caso de empate, ganha aquele que terminar com a carta mais alta.', url: 'ESCALERA_COLOR' },
    { string: ' Pôquer', descripcion: 'Quatro cartas do mesmo valor e uma carta desemparelhada ou kicker. Em caso de empate, o jogador com a maior carta desemparelhada (kicker) vence.', url: 'POKER' },
    { string: ' Completo', descripcion: 'Três cartas do mesmo valor e um par do mesmo valor diferente do anterior. Em caso de empate, o trio mais alto vence.' },
    { string: ' Cor', descripcion: 'Cinco cartas del mismo palo, no consecutivas.En caso de empate, gana el jugador con la carta más alta.', url: 'COLOR' },
    { string: ' Escadas', descripcion: 'Cinco cartas consecutivas que não são do mesmo naipe. Em caso de empate, vence a carta mais alta.', url: 'ESCALERA' },
    { string: ' Trio', descripcion: 'Três cartas do mesmo valor e duas cartas desemparelhadas. Em caso de empate, o jogador com a maior carta não emparelhada (ou segunda carta, se necessário) (kicker) vence.', url: 'TRIO' },
    { string: 'Par duplo', descripcion: 'Duas cartas do mesmo valor, duas cartas de valor diferente com o mesmo valor e um kicker. Se os jogadores tiverem exatamente os mesmos dois pares, o kicker mais alto vence', url: 'DOS_PARES' },
    { string: ' Casal', descripcion: 'Duas cartas do mesmo valor e três cartas desemparelhadas. Em caso de empate, o jogador com a maior carta não emparelhada (ou a segunda ou terceira carta, se necessário) ganha.', url: 'PAR' },
    { string: 'Letra alta', descripcion: 'Qualquer mão que não esteja classificada em nenhuma das categorias anteriores. Em caso de empate, vence a carta mais alta; por exemplo, "ace high".', url: 'CARTA_ALTA' }
    ]
}