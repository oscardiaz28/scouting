import { BarChart, Bar, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type StatBarChartProps = {
    stats: {
        pasesCompletados: number,
        regates: number;
        tiros: number;
        intercepciones: number;
    }
}

export const StatBarChart = ({ stats }: StatBarChartProps) => {
    const data = [
        { tipo: "Pases", cantidad: stats.pasesCompletados },
        { tipo: "Regates", cantidad: stats.regates },
        { tipo: "Tiros", cantidad: stats.tiros },
        { tipo: "Intercepciones", cantidad: stats.intercepciones }
    ];

    return (
        <ResponsiveContainer width="100%" height="85%">
            <BarChart data={data}>
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
}