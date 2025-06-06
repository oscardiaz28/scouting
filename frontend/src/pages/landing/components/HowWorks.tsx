import { ChartNoAxesColumn, Cpu, Upload } from "lucide-react"

const steps = [
    {
        icon: <Upload className="text-emerald-400 w-9 h-9" />,
        title: "Sube tu video",
        subtitle: "Simplemente arrastra y suelta o selecciona tu archivo de video."
    },
    {
        icon: <Cpu className="text-emerald-400 w-9 h-9" />,
        title: "Procesamiento de IA",
        subtitle: "La IA analiza tu video cuadro por cuadro para extraer datos relevantes en segundos."
    },
    {
        icon: <ChartNoAxesColumn className="text-emerald-400 w-9 h-9" />,
        title: "Genera Estadísticas",
        subtitle: "Obtén visualizaciones detalladas sobre el rendimiento y contenido de tu video."
    }
]

export const HowWorks = () => {


  return (
    <section className='py-28 pb-32 relative overflow-hidden'>

        <div className="how-works-dot"></div>

        <div className='max-w-[1300px] mx-auto px-4 flex flex-col gap-20'>

            <div className='text-center'>
                <h1 className="text-4xl md:text-[45px] font-bold text-gray-200">¿Cómo funciona?</h1>
                <p className="text-lg md:text-xl font-semibold text-gray-400 mt-6 md:mt-4 max-w-3xl mx-auto">
                    Comience en minutos con nuestro sencillo proceso de tres pasos.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {
                    steps.map( (step, idx) => (
                        <div key={idx} className="flex flex-col gap-6 justify-center items-center">
                            <div className="w-24 h-24 rounded-full bg-[#242425]/50 flex items-center justify-center border-1 border-[#2D2B2F] backdrop-blur-2xl ">
                                {step.icon}
                            </div>
                            <div className="text-center">
                                <h2 className="text-xl font-bold ">{step.title}</h2>
                                <p className="mt-4 text-white/70">{step.subtitle}</p>
                            </div>
                        </div>
                    ) )
                }
            </div>

        </div>

    </section>
  )
}
