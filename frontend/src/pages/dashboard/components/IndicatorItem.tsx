import { JSX } from "react"

interface ItemProp{
    title: string,
    icon: JSX.Element,
    stats: number,
    value: number
}

export const IndicatorItem = ( { item }: { item: ItemProp } ) => {

    return (
        <div className=" p-4 px-5 flex items-start justify-between bg-[#1E293B] border border-[#334155] rounded-md">
            <div className="flex flex-col items-start gap-2 h-full">
                <div className="flex items-center gap-3">
                    {item.icon}
                    <p className="text-sm text-gray-300">{item.title}</p>
                </div>
                <p className="text-3xl font-normal">{item.stats}</p>
            </div>
            <p className="mt-auto border-1 border-emerald-500 bg-emerald-600/60 rounded-full p-1 px-2 text-xs font-semibold">+{item.value}%</p>
        </div>
    )
}