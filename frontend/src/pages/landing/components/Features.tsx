import { ChartNoAxesColumn, Clock, Heart, Search, Video, Zap } from 'lucide-react'

const cards = [
    {
        icon: <Search className='w-7 h-7 text-[#2585FE]' />,
        title: "Reconocimiento Táctico",
        subtitle: "Identifica formaciones, roles y jugadas clave en tus videos con marcas de tiempo precisas."
    },
    {
        icon: <ChartNoAxesColumn className='w-7 h-7 text-[#2585FE]' />,
        title: "Análisis de Rendimiento",
        subtitle: "Mide estadísticas, recorridos y acciones para predecir el rendimiento de cada jugador."
    },
    {
        icon: <Heart className='w-7 h-7 text-[#2585FE]' />,
        title: "Detección de Ritmo",
        subtitle: "Mide el impacto emocional y el cambio de ritmo del partido mediante gestos de jugadores"
    },
    {
        icon: <Clock className='w-7 h-7 text-[#2585FE]' />,
        title: "Detección de Jugadas Clave",
        subtitle: "Identifica automáticamente goles, asistencias, faltas, atajadas y momentos decisivos, gracias al análisis contextual de video."
    },
    {
        icon: <Zap className='w-7 h-7 text-[#2585FE]' />,
        title: "Sugerencias de Mejora",
        subtitle: "Recibe recomendaciones impulsadas por IA para optimizar el rendimiento del jugador"
    },
    {
        icon: <Video className='w-7 h-7 text-[#2585FE]' />,
        title: "Análisis de Tendencias",
        subtitle: "Recibe información de las tendencias de los jugadores."
    }
]

export const Features = () => {
    return (

        <section className="py-20 relative overflow-hidden">

            <div className='blurry-dot'></div> 

            <div className="max-w-[1300px] mx-auto px-4 flex flex-col gap-20">

                <div className="text-center">
                    <h1 className="text-4xl md:text-[45px] font-bold text-gray-200">
                        Análisis Deportivo con IA Avanzada</h1>
                    <p className="text-lg md:text-xl font-semibold text-gray-400 mt-6 max-w-3xl mx-auto">
                    Nuestra inteligencia artificial analiza cada cuadro del video para extraer información táctica, rendimiento individual y estadísticas precisas sobre tus partidos.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {cards.map( (card, idx) => (
                            <div key={idx} className="bg-[#262627]/60 rounded-xl border-1 border-[#323233] p-6 py-7 pr-7 flex flex-col gap-4 feature-card
                            backdrop-blur-md hover:bg-[#2e2d2d]/70
                            ">
                                {card.icon}
                                <div>
                                    <h3 className="text-xl font-bold">{card.title}</h3>
                                    <p className="mt-3 font-normal text-gray-400 ">{card.subtitle}</p>
                                </div>
                        </div>
                    ) )}

                </div>
            </div>
        </section>
    )
}
