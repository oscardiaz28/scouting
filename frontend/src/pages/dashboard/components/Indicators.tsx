import { UserCheck, UserPlus, Video } from "lucide-react"
import { IndicatorItem } from "./IndicatorItem"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { axiosInstance } from "../../../lib/axios"
import { SkeletonIndicators } from "./SkeletonIndicators"

interface IndicatorsType {
    activePlayers: number,
    prospectPlayers: number,
    registeredPlayers: number,
    videos: number
}


export const Indicators = () => {

    const [stats, setStats] = useState<IndicatorsType | null>(null)
    const [fetchLoaded, setFetchLoaded] = useState(true)

    console.log(stats)

    useEffect(() => {
        const fetchKPI = async () => {
            try {
                const resp = await axiosInstance.get("/dashboard")
                setStats(resp.data)
            } catch (err) {
                toast.error("No se ha podido obtener los valores")
            } finally {
                setFetchLoaded(false)
            }
        }
        fetchKPI()
    }, [])

    const indicatorItems = stats ? [
        {
            title: "Videos Analizados",
            icon: <Video className="text-[#00AABC] w-6 h-6" />,
            stats: stats.videos,
            value: 5
        },
        {
            title: "Jugadores Registrados",
            icon: <UserPlus className="text-[#00AABC] w-6 h-6" />,
            stats: stats.registeredPlayers,
            value: 15
        },
        {
            title: "Jugadores Activos",
            icon: <UserCheck className="text-[#00AABC] w-6 h-6" />,
            stats: stats.activePlayers,
            value: 10
        },
        {
            title: "Jugadores Prospectos",
            icon: <Video className="text-[#00AABC] w-6 h-6" />,
            stats: stats.prospectPlayers,
            value: 11
        },
    ] : []

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {fetchLoaded ? (
                <SkeletonIndicators />
            ) : (
                indicatorItems.map( (item, idx) => (
                    <IndicatorItem key={idx} item={item} />
                ))
            )}
        </div>
    )
}
