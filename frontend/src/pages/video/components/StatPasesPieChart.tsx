import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { COLORS } from "../VideoAnalysis"

interface DistribucionPases{
    cortos: number,
    largos: number,
    filtrados: number,
    centros: number
}

interface PasesProps{
    distribucionPases: DistribucionPases;
}

export const StatPasesPieChart = ( { distribucionPases } : PasesProps ) => {

    return (
        <ResponsiveContainer width="100%" height="90%">
            <PieChart >
                <Pie
                    data={Object.entries(distribucionPases).map(([Key, value]) => ({
                        name: Key,
                        value
                    }))}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#00bcd4"
                >
                    {
                        Object.entries(distribucionPases).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))
                    }
                </Pie>
                <Tooltip />
                <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                />
            </PieChart>
        </ResponsiveContainer>
    )
}