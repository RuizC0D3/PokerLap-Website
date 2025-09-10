'use client'

import Image from "next/image"
import { useState } from "react"
import PageHead from "../../components/body/pageHead"

const SobreNosotros = (props) => {
    const { setOpt = console.log, lang = 'es' } = props
    const [carrulselVista, setcarrulselVista] = useState(0)
    const lasFunciones = TextoAcerca[lang].funciones
    return (
        <>
            <div className="sobreNosotros-container">
                <PageHead  lang= { lang }page={'Sobre Nosotros'} setOpt={setOpt} />
                <div className="sobreNosotros-introduccion">
                    <div className="imagen">
                        <Image src={'/multimedia/sobreNosotros/carta.png'} alt="carta" height={731} width={560} />
                    </div>
                    <div className="textos">
                        <div className="titulo">
                            ----{TextoAcerca[lang].titulo_a}
                            <p>POKERLAP</p>
                        </div>
                        <div className="contenido">
                            <p>
                                {TextoAcerca[lang].texto.texto_a}
                            </p>

                        </div>
                    </div>
                </div>
                <div className="sobreNosotros-funciones">
                    <div className="textos">
                        <span className="ventajas">----{TextoAcerca[lang].ventajas} </span>
                        <div className="flex-row">
                            <span className="white">
                                POKERLAP
                            </span>
                            <span className="red">
                                {TextoAcerca[lang].texto.funciones}

                            </span>
                        </div>
                        <p>
                            {TextoAcerca[lang].texto.funcionesTexto}

                        </p>
                    </div>
                    <span>---{` `} {TextoAcerca[lang].texto.titulo_a}</span>

                    <div className="sobreNosotros-funciones-grid">
                        {lasFunciones.map((key, i) => {
                            return (
                                <>
                                    <div className={`sobreNosotros-funciones-grid-hijo${i} sobreNosotros-funciones-grid-hijo`} key={`funciones-grid-${i}`} id={`funciones-grid-${i}`}>
                                        <Image src={`/multimedia/sobreNosotros/${key.imagen}.png`} alt="seccionesimg" height={17} width={57} />
                                        <div className="texto">
                                            <span className="texto-titulo">
                                                {key.titulo}
                                            </span>
                                            <p >
                                                {key.texto}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>

    )
}
export default SobreNosotros


export const TextoAcerca = {
    es: {
        texto: {
            titulo_a: 'SOBRE NOSOTROS',
            texto_a: 'Somos una empresa que busca fomentar el poker como un deporte de astucia y agilidad mental, debido a todos los problemas por no contar con la disposicion de las herrramientas necesarias paa realizar transparencia, pulcritud, tratamiento de datos de esta maravillosa pasion que fuera considerada un deporte.',
            ventajas: 'VENTAJAS',
            funciones: 'Funciones',
            funcionesTexto: '  Hacer que el Poker se distinga como un deporte de estándares de calidad y armonía para todos en cualquier lugar, un espacio agradable y de confianza donde cada persona se sienta segura que todo lo que se hace es de altos tipificado con eficacia y eficiencia.',

        },
        funciones: [
            { titulo: 'Organización Torneos', imagen: 'carta', texto: 'Un certamen pensando en todos los detalles necesarios para su buen desarrollo.' },

            { titulo: 'Estructuras', imagen: 'carta', texto: 'Orden y construcción que permiten el funcionamiento de un determinado evento.' },

            { titulo: 'Registros', imagen: 'carta', texto: 'Relación de acontecimientos ingresados, que hacen constancia de las inscripciones.' },

            { titulo: 'Registrar Pagos', imagen: 'carta', texto: 'Acción que simplifica al usuario el recaudo de su inscripción' },

            { titulo: 'Ubicación', imagen: 'carta', texto: 'Localización de cada lugar apto para el desarrollo de la actividad.' },

            { titulo: 'Calificación', imagen: 'carta', texto: 'Evaluar y puntuar las cualidades o capacidades de la labor de cada Club y Jugador.' }]
    },
    en: {
        texto: {
            titulo_a: 'ABOUT ',
            texto_a: 'We are a company that seeks to promote poker as a sport of cunning and mental agility, due to all the problems due to not having the necessary tools available to carry out transparency, neatness, data processing of this wonderful passion that was considered a sport.',
            ventajas: 'ADVANTAGES',
            funciones: 'Functions',
            funcionesTexto: 'To make Poker stand out as a sport of standards of quality and harmony for everyone in any place, a pleasant and trustworthy space where each person feels sure that everything that is done is of high standard with effectiveness and efficiency.',
        },
        funciones: [{
            titulo: 'Tournament Organization',
            imagen: 'carta',
            texto: 'A contest thinking of all the necessary details for its proper development'
        },

        {
            titulo: 'Structures',
            imagen: 'carta',
            texto: 'Order and construction that allow the operation of a certain event.'
        },

        {
            titulo: 'Records',
            imagen: 'carta',
            texto: 'List of events entered, which record the inscriptions.'
        },

        {
            titulo: 'Record Payments',
            imagen: 'carta',
            texto: 'Action that simplifies the user the collection of their registration.'
        },

        {
            titulo: 'Location',
            imagen: 'carta',
            texto: 'Location of each place suitable for the development of the activity.'
        },

        {
            titulo: 'Qualification',
            imagen: 'carta',
            texto: 'Evaluate and rate the qualities or capacities of the work of each Club and Player.'
        }]
    },
    fr: {
        funciones: [{
            titulo: `Tournois d'organisation`,
            imagen: 'carta',
            texto: `Un concours réfléchissant à tous les détails nécessaires à son bon développement`
        }, {
            titulo: `Structures`,
            imagen: 'carta',
            texto: `Ordre et construction qui permettent le fonctionnement d'un certain événement.`
        }, {
            titulo: `Registres`,
            imagen: 'carta',
            texto: `Liste des événements saisis, qui enregistrent les inscriptions`
        }, {
            titulo: `Enregistrer les paiements`,
            imagen: 'carta',
            texto: `Action qui simplifie à l'utilisateur la collecte de son inscription.`
        }, {
            titulo: `Lieu`,
            imagen: 'carta',
            texto: `Localisation de chaque lieu propice au développement de l'activité.`
        }, {
            titulo: `Qualification`,
            imagen: 'carta',
            texto: `Évaluer et noter les qualités ou capacités du travail de chaque club et joueur.`
        }],
        texto: {
            titulo_a: 'Nous',
            texto_a: `Nous sommes une entreprise qui cherche à promouvoir le poker en tant que sport de ruse et d'agilité mentale, en raison de tous les problèmes dus au fait de ne pas disposer des outils nécessaires pour effectuer la transparence, la propreté, le traitement des données de cette merveilleuse passion qui était considérée comme un sport.`,
            ventajas: 'AVANTAGE',
            funciones: 'Les Fonctions',
            funcionesTexto: `Faire du Poker se démarquer comme un sport de normes de qualité et d'harmonie pour tout le monde en tout lieu, un espace agréable et digne de confiance où chacun se sent sûr que tout ce qui est fait est de haut niveau avec efficacité et efficacité. `

        }
    },
    ger: {
        texto: {
            titulo_a: 'ÜBER UNS',
            texto_a: 'Wir sind ein Unternehmen, das Poker als einen Sport der List und geistigen Beweglichkeit fördern möchte, da all die Probleme darin bestehen, dass nicht die notwendigen Werkzeuge zur Verfügung stehen, um Transparenz, Sauberkeit und Datenverarbeitung dieser wunderbaren Leidenschaft, die als Sport angesehen wurde, durchzuführen.',
            ventajas: 'VORTEILE',
            funciones: 'Funktionen',
            funcionesTexto: 'Um Poker als Sport mit Qualitäts- und Harmonie-Standards für alle an jedem Ort hervorzuheben, ein angenehmer und vertrauenswürdiger Ort, an dem jeder sicher ist, dass alles, was getan wird, einen hohen Standard mit Effektivität und Effizienz aufweist.'
        },
        funciones: [
            {
                titulo: 'Organisationsturniere',
                imagen: 'carta',
                texto: `Ein Wettbewerb, der alle notwendigen Details für seine ordnungsgemäße Entwicklung`
            },

            {
                titulo: 'Strukturen',
                imagen: 'carta',
                texto: `Ordnung und Konstruktion, die den Betrieb eines bestimmten Ereignisses ermöglichen.`
            },

            {
                titulo: 'Aufzeichnungen',
                imagen: 'carta',
                texto: `Liste der eingegebenen Ereignisse, in denen die Inschriften aufgezeichnet sind..`
            },

            {
                titulo: 'Zahlungen aufzeichnen',
                imagen: 'carta',
                texto: `Aktion, die dem Benutzer das Sammeln seiner Registrierung vereinfacht.fe: Enregistrer les paiements.`
            },

            {
                titulo: 'Ort',
                imagen: 'carta',
                texto: `Ort jedes Ortes, der für die Entwicklung der Aktivität geeignet ist`
            },

            {
                titulo: 'Qualifikation',
                imagen: 'carta',
                texto: `Bewerten und bewerten Sie die Qualitäten oder Kapazitäten der Arbeit jedes Clubs und Spielers`
            }]
    },
    prt: {
        texto: {
            titulo_a: 'SOBRE NÓS',
            texto_a: 'Somos uma empresa que procura promover o poker como um desporto de astúcia e agilidade mental, devido a todos os problemas por não termos disponíveis as ferramentas necessárias para realizar com transparência, limpeza, tratamento de dados desta maravilhosa paixão que se considerava um desporto.',
            ventajas: 'VANTAGEM',
            funciones: 'Funções',
            funcionesTexto: 'Fazer com que o Poker se destaque como um esporte de padrões de qualidade e harmonia para todos em qualquer lugar, um espaço agradável e de confiança onde cada um tenha a certeza de que tudo o que é feito é de alto padrão com eficácia e eficiência.'

        },
        funciones: [{
            titulo: 'Torneios de Organização',
            imagen: 'carta',

            texto: 'Um concurso pensando em todos os detalhes necessários para o seu bom desenvolvimento.'
        },

        {
            titulo: 'Estruturas',
            imagen: 'carta',
            texto: 'Ordem e construção que permitem o funcionamento de um determinado evento.'
        },

        {
            titulo: 'Registros',
            imagen: 'carta',
            texto: 'Lista de eventos inscritos, que registram as inscrições.'
        },

        {
            titulo: 'Pagamentos de registro',
            imagen: 'carta',
            texto: 'Ação que simplifica ao usuário a cobrança de seu cadastro.'
        },

        {
            titulo: 'Localização',
            imagen: 'carta',
            texto: 'Localização de cada local adequado ao desenvolvimento da atividade.'
        },

        {
            titulo: 'Qualificação',
            imagen: 'carta',
            texto: 'Avalie e avalie as qualidades ou capacidades de trabalho de cada Clube e Jogador.'
        }]
    }
}

