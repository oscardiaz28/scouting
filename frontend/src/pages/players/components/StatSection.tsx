import { useMemo } from "react"
import { ProgressBar } from "../../../components/common/ProgressBar"
import { ProgressBarCircular } from "../../../components/common/ProgressBarCircular"
import { getPesosPorCategoria } from "../utils/getPesosPorCategoria"
import { calcularPuntaje } from "../utils/calcularPorcentaje"

interface StatItem{
    label: string,
    value: number
}

interface StatSectionProps{
    title: string,
    items: StatItem[],
    posicion: string
}

export const StatSection = ( {title, items, posicion} : StatSectionProps ) => {

    const pesos = useMemo(() => getPesosPorCategoria(posicion, title), [posicion, title]);
    const promedio = useMemo(() => calcularPuntaje(items, pesos), [items, pesos]);

    return (
        <div>
            <h3 className='text-center text-xl font-semibold text-[#13AA14]'>{title}</h3>
            <div className='w-full flex items-center justify-center mt-3 relative'>
                <ProgressBarCircular value={promedio} />
                <p className='absolute top-1/2 left-1/2 -translate-x-1/2 text-3xl font-semibold text-[#13AA14]'>
                    {promedio}
                </p>
            </div>

            <div className='flex flex-col gap-4 mt-9'>
                {items.map( ({label, value}) => (
                    <div key={label}>
                        <div className='flex items-center justify-between mb-2 font-light'>
                            <p className='text-white/70'>{label}</p>
                            <p>{value}</p>
                        </div>
                        <ProgressBar progress={value} />
                    </div>
                ) )}
            </div>
        </div>
    )
}