import {  PieChart, LineChart, ScatterChart, AreaChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Pie, Line, Area, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts'

const demoData = {
    habilidades: [
      {
        subject: "Técnica",
        A: 80,
        B: 90,
        fullMark: 100
      },
      {
        subject: "Velocidad",
        A: 70,
        B: 80,
        fullMark: 100
      },
      {
        subject: "Resistencia",
        A: 86,
        B: 70,
        fullMark: 100
      },
      {
        subject: "Fuerza",
        A: 99,
        B: 70,
        fullMark: 100
      },
      {
        subject: "Toma de Decisiones",
        A: 85,
        B: 80,
        fullMark: 100
      },
      {
        subject: "Visión de Juego",
        A: 65,
        B: 95,
        fullMark: 100
      }
    ],
    tiposjugadas: [
      { name: 'Bicletas', value: 70 },
      { name: 'Regates', value: 30 },
      { name: 'Desbordes', value: 40 },
      { name: 'Remates', value: 20 },
    ],
    audienceEngagement: [
      { name: '0:00', engagement: 40 },
      { name: '1:00', engagement: 60 },
      { name: '2:00', engagement: 75 },
      { name: '3:00', engagement: 90 },
      { name: '4:00', engagement: 75 },
      { name: '5:00', engagement: 85 },
    ],
    keywordMentions: [
      { velocidad: 28.4, efectividadPases: 85 ,  name: 'Jugador 1' },
      { velocidad: 31.2, efectividadPases: 78 ,  name: 'Jugador 2' },
      { velocidad: 26.7, efectividadPases: 90,  name: 'Jugador 3' },
      { velocidad: 30.1, efectividadPases: 82,  name: 'Jugador 4' },
    ]
  };
  
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];
  

export const Insights = () => {
    return (
        <section id="insights" className="py-20 px-6 relative">
          
          <div className="max-w-7xl mx-auto relative z-10">

            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Visualice sus Datos de Vídeo</h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Nuestra IA transforma el análisis de video complejo en visualizaciones de datos claras y prácticas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Radar Chart */}
              <div className="p-6 h-[400px]">
                <h3 className="text-xl font-bold mb-4 text-white text-center">Estadisticas del Jugador</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={demoData.habilidades}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar name="skills" dataKey="B" stroke="#00D492" fill="#00D492" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Object Detection Chart */}
              <div className="glass-card rounded-xl p-6 h-[400px]">
                <h3 className="text-xl font-bold mb-4 text-white text-center">Jugadas Destacadas</h3>
                <ResponsiveContainer width="100%" height="85%">
                  <PieChart>
                    <Pie
                      data={demoData.tiposjugadas}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {demoData.tiposjugadas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #ffffff20' }}
                      itemStyle={{ color: '#ffffff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
            </div>
          </div>
        </section>
      );
}
