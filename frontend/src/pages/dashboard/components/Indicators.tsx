import { UserCheck, UserPlus, Video } from "lucide-react"

const data = [
    {
        title: "Ultimos videos analizados",
        icon: <Video className="text-[#00AABC] w-6 h-6" />,
        value: 40,
        stats: 17
    },
    {
        title: "Jugadores Registrados",
        icon: <UserPlus className="text-[#00AABC] w-6 h-6" />,
        value: 18,
        stats: 30
    },
    {
        title: "Jugadores Activos",
        icon: <UserCheck className="text-[#00AABC] w-6 h-6" />,
        value: 25,
        stats: 10
    },
    {
        title: "Jugadores Registrados",
        icon: <Video  className="text-[#00AABC] w-6 h-6" />,
        value: 40,
        stats: 4
    },
]

export const Indicators = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map( (info, idx) => (
                <div key={idx} className=" p-4 px-5 flex items-start justify-between bg-[#1A1C1E] rounded-md">
                    <div className="flex flex-col items-start gap-2 h-full">
                        <div className="flex items-center gap-3">
                            {info.icon}
                            <p className="text-sm text-gray-300">{info.title}</p>
                        </div>
                        <p className="text-3xl font-normal">{info.value}</p>
                    </div>
                    <p className="mt-auto border-1 border-emerald-500 bg-emerald-600/60 rounded-full p-1 px-2 text-xs font-semibold">+{info.stats}%</p>
                </div>
            ) )}
        </div>
    )
}
