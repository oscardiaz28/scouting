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
  LineChart,
  Line
} from "recharts";

export default function VideoAnalysisCharts() {
  const habilidades = [
    { skill: "Velocidad", value: 88 },
    { skill: "Pase", value: 75 },
    { skill: "Regate", value: 82 },
    { skill: "Tiro", value: 70 },
    { skill: "Resistencia", value: 91 },
    { skill: "Defensa", value: 65 }
  ];

  const acciones = [
    { tipo: "Pases completados", cantidad: 25 },
    { tipo: "Regates", cantidad: 12 },
    { tipo: "Tiros", cantidad: 4 },
    { tipo: "Intercepciones", cantidad: 7 },
    { tipo: "Faltas cometidas", cantidad: 2 }
  ];

  const tiposDePase = [
    { tipo: "Corto", valor: 15 },
    { tipo: "Largo", valor: 5 },
    { tipo: "Filtrado", valor: 3 },
    { tipo: "Centro", valor: 2 }
  ];

  const velocidad = [
    { tiempo: 0, velocidad: 3 },
    { tiempo: 1, velocidad: 5 },
    { tiempo: 2, velocidad: 7 },
    { tiempo: 3, velocidad: 6 },
    { tiempo: 4, velocidad: 8 }
  ];

  const zonasCampo = [
    { zona: "Defensiva", tiempo: 40 },
    { zona: "Media", tiempo: 30 },
    { zona: "Ofensiva", tiempo: 30 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Radar Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Perfil de Habilidades</h2>
        <RadarChart outerRadius={90} width={400} height={300} data={habilidades}>
          <PolarGrid />
          <PolarAngleAxis dataKey="skill" />
          <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        </RadarChart>
      </div>

      {/* Bar Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Acciones Realizadas</h2>
        <BarChart width={400} height={300} data={acciones}>
          <XAxis dataKey="tipo" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="cantidad" fill="#82ca9d" />
        </BarChart>
      </div>

      {/* Pie Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Distribución de Tipos de Pase</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={tiposDePase}
            dataKey="valor"
            nameKey="tipo"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </div>

      {/* Line Chart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Velocidad Durante la Jugada</h2>
        <LineChart width={400} height={300} data={velocidad}>
          <XAxis dataKey="tiempo" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="velocidad" stroke="#ff7300" />
        </LineChart>
      </div>

      {/* Pie Chart de Zonas */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Distribución en el Campo</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={zonasCampo}
            dataKey="tiempo"
            nameKey="zona"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#00bcd4"
            label
          />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
