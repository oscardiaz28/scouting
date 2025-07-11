import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    Radar,
    BarChart,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell
} from "recharts";
import { axiosInstance } from "../../lib/axios";
import { DoughnutChart } from "./components/DoughnutChart";
import { TablePlayers } from "./components/TablePlayers";


interface Acciones {
    goles: number,
    asistencias: number,
    faltas: number,
    regates: number,
    intercepciones: number
}

interface Totales {
    goles: number,
    asistencias: number,
    pases: number,
    regates: number,
    intercepciones: number,
    duelosGanados: number,
    recuperaciones: number,
    centros: number,
    faltas: number,
    tiros: number
}

interface PromedioFisico {
    resistencia: number,
    salto: number,
    agresividad: number,
    agilidad: number,
    definicion: number,
    control_balon: number
}

interface DistribucionPosicion {
    cantidad: number,
    posicion: string
}

export interface PrecisionTiros {
    goles: number,
    tiros: number,
    precisionTiros: number
}

interface DistribucionEdad {
    cantidad: number,
    edad: number
}

export interface StatsProps {
    totales: Totales,
    promedioFisico: PromedioFisico,
    acciones: Acciones,
    distribucionPosicion: DistribucionPosicion[],
    precisionTiros: PrecisionTiros,
    distribucionEdad: DistribucionEdad[]
}

export default function StatsPage() {

    const [stats, setStats] = useState<StatsProps | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    console.log(stats)

    useEffect(() => {
        const fetching = async () => {
            try {
                const resp = await axiosInstance.get("/stats")
                const hasValues = Object.keys(resp.data).length > 0
                if (!hasValues) {
                    setStats(null)
                } else {
                    setStats(resp.data)
                }
            } catch (err: any) {
                setError("No se ha podido obtener los datos")
                toast.error("No se ha podido obtener los datos")
            } finally {
                setLoading(false)
            }
        }
        fetching()
    }, [])

    const promedioFisico = stats ? [
        { skill: "Resistencia", value: stats.promedioFisico.resistencia },
        { skill: "Salto", value: stats.promedioFisico.salto },
        { skill: "Agresividad", value: stats.promedioFisico.agresividad },
        { skill: "Agilidad", value: stats.promedioFisico.agilidad },
        { skill: "Definicion", value: stats.promedioFisico.definicion },
    ] : [];

    const promedioAcciones = stats ? [
        { tipo: "Asistencias", cantidad: stats.totales.asistencias },
        { tipo: "Intercepciones", cantidad: stats.totales.intercepciones },
        { tipo: "Duelos Ganados", cantidad: stats.totales.duelosGanados },
        { tipo: "Centros", cantidad: stats.totales.centros },
        { tipo: "Faltas cometidas", cantidad: stats.totales.faltas },
        { tipo: "Tiros", cantidad: stats.totales.tiros }
    ] : [];

    const distribucionPosiciones = stats ? stats.distribucionPosicion : [];

    const distribucionEdad = stats ? stats.distribucionEdad : [];

    if (loading) {
        return (
            <h1>Obteniendo Estadísticas</h1>
        )
    }

    if (error) {
        return (
            <h1>{error}</h1>
        )
    }

    if (stats === null) {
        return <h1>Aun no hay estadísticas disponibles</h1>
    }

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const { edad, cantidad } = payload[0].payload;
            return (
                <div style={{ background: '#000', padding: '5px 10px', border: '1px solid #ccc' }}>
                    <p>{`+${edad} años - ${cantidad} jugador${cantidad > 1 ? 'es' : ''}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex flex-col gap-20 p-6">

            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Radar Chart Promedio */}
                <div className="h-[300px] w-full">
                    <h2 className="text-xl font-semibold mb-2">Promedio Rendimiento</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius={90} data={promedioFisico}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="skill" />
                            <Radar dataKey="value" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                        </RadarChart>
                    </ResponsiveContainer>

                </div>

                {/* Bar Chart Promedio Acciones */}
                <div className="h-[300px] w-full">
                    <h2 className="text-xl font-semibold mb-2">Acciones Totales</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={promedioAcciones}>
                            <XAxis dataKey="tipo" />
                            <YAxis />
                            <Tooltip
                            />
                            <Bar dataKey="cantidad" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart Posiciones */}
                <div className="h-[300px] w-full">
                    <h2 className="text-xl font-semibold mb-2">Distribución por Posición</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart >
                            <Pie
                                data={distribucionPosiciones}
                                dataKey="cantidad"
                                nameKey="posicion"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#ffc658"
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="w-full h-[350px]">
                    <h2 className="text-xl font-semibold mb-2">Precisión de Tiros</h2>
                    <div className="mt-6 text-lg flex flex-col gap-1">
                        <p className="text-[#56b3e5] font-semibold">Tiros: <span className="text-white">{stats.precisionTiros.tiros}</span> </p>
                        <p className="text-[#56b3e5] font-semibold">Goles: <span className="text-white">{stats.precisionTiros.goles}</span> </p>
                    </div>
                    <DoughnutChart precision={stats?.precisionTiros} />
                </div>

                {/* Pie Chart de Zonas */}
                <div className="w-full h-[350px]">
                    <h2 className="text-xl font-semibold mb-2">Distribución de Jugadores por Edad</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={distribucionEdad}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={120}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="cantidad"
                                label={({ edad, percent }) => `+${edad + " años"} ${(percent * 100).toFixed(0)}%`}
                                labelLine={true}
                            >
                                {distribucionEdad.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

            </div>

            <div className="col-span-1 md:col-span-2 bg-[#0e1121] pb-4 p-5 rounded-md">
                <TablePlayers />
            </div>

        </div>
    );
}
