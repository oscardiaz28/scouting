import { Send, Sparkles } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type ResponseType =
  | {type: "text", content: string}
  | {type: "table", headers: string[], rows: string[][]}
  | {type: "chart", data: {posicion: string, cantidad: number}[] }

const generateResponse = (question: string): ResponseType => {

  if(question.toLowerCase().includes("grafico") || question.toLowerCase().includes("gráfico")){
    return {
      type: "chart",
      data: [
        { posicion: "Delantero", cantidad: 15 },
        { posicion: "Mediocampista", cantidad: 20 },
        { posicion: "Defensa", cantidad: 10 },
        { posicion: "Arquero", cantidad: 5 }
      ]
    }
  }
  return {
    type:"text",
    content: "El jugador con mas goles es John Doe, con un total de 30 goles en 24 partidos"
  }
}
const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'];

export const AssistantPage = () => {

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [question, setQuestion] = useState('');
  const [currentResponse, setCurrentResponse] = useState<ResponseType | null>(null)

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if(question == ""){
      alert("Ingresa la pregunta")
      return
    }
    setIsAnalyzing(true)
    setTimeout(() => {
      const simulatedResponse = generateResponse(question);
      setCurrentResponse(simulatedResponse)
      setIsAnalyzing(false)
      setQuestion("")
    }, 2000);
  }
  
  return (
    <div className="grid grid-cols-1 relative md:grid-cols-[1fr_2fr] assistant-div gap-8 overflow-hidden rounded-2xl">

      <div className='bg-[#1A1C1E] py-4 px-5 rounded-2xl'>
        <h2 className='absolute top-4 left-6 text-xl font-bold'>Asistente IA</h2>

        <div className='h-full flex justify-center flex-col'>
          <p className='text-center font-bold text-xl mb-6'>¿En qué puedo ayudarte?</p>
          <form action="" onSubmit={handleSubmit} className='bg-[#111311] rounded-2xl p-4 py-2 pt-4 flex flex-col'>
            <div className='flex-1'>
              <textarea placeholder='Ingresa tu pregunta' value={question} onChange={(e) => setQuestion(e.target.value) } className='w-full h-[55px] resize-none outline-0 scrollbar'
                onKeyDown={ (e) => {
                  if(e.key === "Enter"){
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                />
            </div>
            <button type='submit' className='w-11 h-11 flex items-center justify-center ml-auto cursor-pointer rounded-full hover:bg-[#1A1C1E]'>
              <Send className='w-5 h-5' />
            </button>
          </form>
        </div>

      </div>

      <div className='py-4 px-5 rounded-2xl scrollbar overflow-y-auto'>

        {isAnalyzing ? (
          <div className='h-full flex items-center justify-center flex-col'>
              <div className='text-emerald-500 bg-emerald-950 rounded-full w-16 h-16 grid place-content-center mb-5'>
                <Sparkles className='w-8 h-8' />
              </div>
              <p className='text-gray-400'>Analizando tu pregunta</p>
          </div>
        ) : (
          currentResponse == null ? (
            <div className='h-full flex items-center justify-center flex-col'>
              <div className='text-emerald-500 bg-emerald-950 rounded-full w-16 h-16 grid place-content-center mb-5'>
                <Sparkles className='w-8 h-8' />
              </div>
              <h3 className='font-bold text-lg mb-1'>Haz una pregunta para comenzar</h3>
              <p className='text-gray-400'>Su asistente de IA puede analizar la información y mostrar un resultado</p>
          </div>
          ) : (
            <>
              {currentResponse && currentResponse.type == "chart" && (
                 <div className="h-[300px] w-full">
                      <h2 className="text-xl font-semibold mb-2">Distribución por Posición</h2>
                      <ResponsiveContainer width="100%" height="95%">
                        <PieChart>
                          <Pie
                            data={currentResponse.data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={120}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="cantidad"
                            label={({ posicion, percent }) => `${posicion} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {currentResponse.data.map((entry, index) => (
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
              )}

              {currentResponse && currentResponse.type == "text" && (
                 <div className="">
                     <p>¡Buena pregunta! {currentResponse.content}</p>
                  </div>
              )}
            </>
          )
        ) }

      </div>

    </div>
  );
};
