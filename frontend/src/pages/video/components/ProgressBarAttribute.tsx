export const ProgressBarAttribute = ( {title, value} : {title: string, value: number} ) => {

    return (
        <div className="grid grid-cols-[1fr_2fr] gap-10">
            <p>{title}</p>
            <div className="flex items-center gap-4">
            <div className="bg-gray-500 rounded-xs h-3 w-full">
                <div className="bg-[#00C49F] rounded-xs h-3" style={{width: `${value}%`}} ></div>
            </div>
            <p>{value}</p>
            </div>
        </div>
    )
}