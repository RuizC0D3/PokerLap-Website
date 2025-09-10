'use client'

import Image from "next/image"
import { useState } from "react"

const Historia = (props) => {
    const { setOpt = console.log, lang = 'es' } = props
    const [aprendeVista, setaprendeVista] = useState(0)
    const eltexto = TextoHistoria[lang]
    return (
        <>
            <div className="historia-container">
                <div className="historia-shadow">
                    <Image src={'/multimedia/historia/historia.jpg'} alt="historia" height={550} width={800} />
                    <div className="textos">
                        {eltexto.map((key, i) => {
                            return (
                                <>
                                    <p key={`funciones-grid-${i}`} id={`funciones-grid-${i}`}>
                                        {key}
                                    </p>
                                </>
                            )
                        })}
                    </div>
                </div>

            </div>


        </>

    )
}
export default Historia

export const TextoHistoria = {
    es: ['El origen del póker es mucho más antiguo de lo que parece. Hacia el año 1000 se jugaba en Persia un juego llamado âs nas. Cuyos lances fundamentales eran la pareja, el trío, un trío + una pareja (el full) y cuatro cartas del mismo número (el póquer).',
        'Además, existía también entre los jugadores la posibilidad de engañar al contrario mediante la simulación o “farol”. Cosa que se hacía con rostro impasible para no descubrir la realidad de las cartas con que se contaba, de ahí lo de “poner cara de poker”.',
        'Este juego estuvo generalizado en Oriente Próximo en la Edad Media, de donde los soldados de las cruzadas lo importaron.',
        'Se sabe que en el siglo XV se jugaba en Italia al flusso, llamado por la misma época en Francia brelán, ambos eran juegos de envite originados en el juego persa antes citado y que los árabes popularizaron.',
        'Hacia los primeros años del siglo XVI ya se jugaba en España, Italia y Francia bajo los nombres de “primero”, primiera o la prime, respectivamente. Cada jugador contaba con tres cartas: el trío era la jugada más afortunada, seguida de la pareja y del flus o tres cartas del mismo palo.',
        'A finales del siglo XVII empezaron a admitirse el farol como posibilidad y parte importante en el desarrollo del juego, y también la apuesta, modificaciones que hicieron furor en Inglaterra y Alemania a partir del año 1700.',
        'En estos países se llamó al juego pochen (fanfarronear). De esta modalidad los franceses desarrollaron otra llamada poque, juego parecido al bouillotte, que en 1803 llevaron a Nueva Orleans, capital de la entonces colonia francesa de Lousiana.'
    ],
    en: ['The origin of poker is much older than it seems. Around the year 1000 a game called âs nas was being played in Persia. Whose fundamental sets were the pair, the three of a kind, a three of a kind + a pair (the full house) and four cards of the same number (the poker).',
        'In addition, there was also the possibility for the players to deceive the opponent through simulation or “bluff”. Which was done with an impassive face so as not to discover the reality of the cards that were available, hence the "putting on a poker face."',
        ' This game was widespread in the Middle East in the Middle Ages, from where the soldiers of the crusades imported it.',
        ' It is known that in the 15th century flusso was played in Italy, called at the same time in France brelán, both were stake games originated in the aforementioned Persian game and popularized by the Arabs.',
        'Towards the first years of the 16th century it was already being played in Spain, Italy and France under the names of "first", first or first, respectively. Each player had three cards: the three of a kind was the luckiest play, followed by the pair and the flus or three cards of the same suit.',
        ' At the end of the 17th century, the lantern began to be accepted as a possibility and an important part in the development of the game, as well as gambling, modifications that were all the rage in England and Germany from the year 1700.',
        ' In these countries the game was called pochen (bragging). In this way, the French developed another called poque, a game similar to bouillotte, which in 1803 they took to New Orleans, capital of the then French colony of Louisiana.'
    ],
    ger: ['Der Ursprung des Pokers ist viel älter als es scheint. Um das Jahr 1000 wurde in Persien in Spiel namens âs nas gespielt. Wessen grundlegende Sätze waren das Paar, die Drei von einer Art, eine Drei von einer Art + ein Paar (das volle Haus) und vier Karten der gleichen Nummer (das Poker).', 'Darüber hinaus bestand für die Spieler die Möglichkeit, den Gegner durch Simulation oder „Bluff“ zu täuschen. Was mit einem teilnahmslosen Gesicht gemacht wurde, um die Realität der verfügbaren Karten nicht zu entdecken, daher das "Aufsetzen eines Pokerface"', 'Dieses Spiel war im Nahen Osten im Nahen Osten weit verbreitet, von wo die Soldaten der Kreuzzüge es importierten.', 'Es ist bekannt, dass im 15. Jahrhundert Flusso in Italien gespielt wurde, gleichzeitig in Frankreich Brelán genannt. Beide waren Pfahlspiele, die aus dem oben genannten persischen Spiel stammten und von den Arabern populär gemacht wurden.', 'In den ersten Jahren des 16. Jahrhunderts wurde es bereits in Spanien, Italien und Frankreich unter den Namen "first", first oder first gespielt. Jeder Spieler hatte drei Karten: Die drei Karten waren das glücklichste Spiel, gefolgt vom Paar und dem Flus oder drei Karten derselben Farbe.', 'Ende des 17. Jahrhunderts wurde die Laterne als eine Möglichkeit und ein wichtiger Bestandteil der Entwicklung des Spiels sowie des Glücksspiels akzeptiert, Modifikationen, die ab dem Jahr 1700 in England und Deutschland im Trend lagen', 'In diesen Ländern hieß das Spiel pochen (prahlen). Auf diese Weise entwickelten die Franzosen ein anderes Spiel namens Poque, ein Spiel ähnlich wie Bouillotte, das sie 1803 nach New Orleans, der Hauptstadt der damaligen französischen Kolonie Louisiana, brachten.'
    ],
    fr: [
        `L'origine du poker est bien plus ancienne qu'il n'y paraît. Vers l'an 1000, un jeu appelé âs nas était joué en Perse. Dont les sets fondamentaux étaient la paire, le trois d'un genre, un trois d'un genre + une paire (le full) et quatre cartes du même nombre (le poker)..`,
        `De plus, il y avait aussi la possibilité pour les joueurs de tromper l'adversaire par la simulation ou le "bluff". Ce qui a été fait avec un visage impassible pour ne pas découvrir la réalité des cartes qui étaient disponibles, d'où le «mettre sur une face de poker».`,
        `Ce jeu était répandu au Moyen-Orient au Moyen Âge, d'où les soldats des croisades l'importaient.`,
        `On sait qu'au 15ème siècle le flusso était joué en Italie, appelé en même temps en France brelán, tous deux étaient des jeux d'enjeux originaires du jeu persan susmentionné et popularisés par les Arabes.`, `Vers les premières années du XVIe siècle, il était déjà joué en Espagne, en Italie et en France sous les noms de «premier», premier ou premier, respectivement. Chaque joueur avait trois cartes: les trois d'une sorte étaient le jeu le plus chanceux, suivies de la paire et des flus ou trois cartes de la même couleur.`,
        `À la fin du XVIIe siècle, la lanterne commença à être acceptée comme une possibilité et un rôle important dans le développement du jeu, ainsi que des jeux de hasard, modifications qui faisaient fureur en Angleterre et en Allemagne à partir de 1700.`,
        `Dans ces pays, le jeu s'appelait pochen (vantardise). De cette façon, les Français ont développé un autre appelé poque, un jeu semblable à la bouillotte, qu'ils ont emmené en 1803 à la Nouvelle-Orléans, capitale de la colonie française de l'époque de la Louisiane`
    ],
    prt: [
        'A origem do pôquer é muito mais antiga do que parece.Por volta do ano 1000, um jogo chamado âs nas estava sendo disputado na Pérsia.Cujos conjuntos fundamentais eram o par, a trinca, uma trinca + um par (full house) e quatro cartas do mesmo número(o pôquer).',
        'Além disso, havia também a possibilidade de os jogadores enganarem o oponente por meio de simulação ou “blefe”.O que foi feito com uma cara impassível para não descobrir a realidade das cartas que estavam disponíveis, daí o “colocar uma cara de pau”.',
        'Este jogo foi muito difundido no Oriente Médio na Idade Média, de onde os soldados das cruzadas o importaram.',
        ' Sabe - se que no século 15 o flusso era disputado na Itália, convocado na mesma época na França de brelán, ambos eram jogos de aposta originados no citado jogo persa e popularizados pelos árabes.',
        'Nos primeiros anos do século 16 já era jogado na Espanha, Itália e França com os nomes de "primeiro", primeiro ou primeiro, respectivamente.Cada jogador tinha três cartas: a trinca era a jogada mais sortuda, seguida pelo par e o flus ou três cartas do mesmo naipe.',
        'No final do século XVII, a lanterna passou a ser aceita como uma possibilidade e uma parte importante no desenvolvimento do jogo, assim como o jogo, modificações que estavam na moda na Inglaterra e na Alemanha a partir de 1700.',
        'Nesses países, o jogo era chamado de pochen(gabar - se).Dessa forma, os franceses desenvolveram outro chamado poque, um jogo semelhante ao bouillotte, que em 1803 eles levaram para Nova Orleans, capital da então colônia francesa da Louisiana.'
    ]
}

