import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../lib/axios'
import { useParams } from 'react-router-dom'
import { StatSection } from './components/StatSection'
import { PlayerSection } from './components/PlayerSection'
import { Player } from '../../store/usePlayerStore'
import { Download, Share } from 'lucide-react'

interface Radar {
  tecnica: number;
  fuerza: number;
  velocidad: number;
  regate: number;
  visionJuego: number;
}

interface DistribucionPases {
  cortos: number;
  largos: number;
  filtrados: number;
  centros: number;
}

interface DistribucionTiros {
  dentroArea: number;
  fueraArea: number;
  cabeza: number;
  pieIzquierdo: number;
  pieDerecho: number;
}

interface PlayerStats {
  pasesCompletados: number;
  regates: number;
  tiros: number;
  intercepciones: number;
  faltasCometidas: number;
  asistencias: number;
  duelosGanados: number;
  recuperaciones: number;
  goles: number;
  resistencia: number;
  salto: number;
  agresividad: number;
  centros: number;
  definicion: number;
  control_balon: number;
  agilidad: number;
  speed_max: number;
  distancia_recorrida: number;
  sprints: number;
  playerId: string;
  radar: Radar;
  distribucionPases: DistribucionPases;
  distribucionTiros: DistribucionTiros;
}

export const PlayerDetailPage = () => {

  const { id } = useParams<{ id: string }>()
  const [stats, setStats] = useState<PlayerStats | null>(null)
  const [isLoadingStats, setLoadingStats] = useState(false)
  const [playerLoaded, setPlayerLoaded] = useState(false)
  const [player, setPlayer] = useState<Player | null>(null)

  const defensaStats = useMemo(() => {
    if (!stats) return []
    return [
      { label: "Intercepciones", value: stats.intercepciones },
      { label: "Recuperaciones", value: stats.recuperaciones },
      { label: "Duelos Ganados", value: stats.duelosGanados  },
      { label: "Faltas Cometidas", value: stats.faltasCometidas  }
    ]
  }, [stats])

  const pasesStats = useMemo(() => {
    if (!stats) return []
    return [
      { label: "Visión del Juego", value: stats.radar.visionJuego },
      { label: "Definición", value: stats.definicion },
      { label: "Centros", value: stats.centros },
      { label: "Asistencias", value: stats.asistencias },
      { label: "Filtrados", value: stats.distribucionPases.filtrados },
      { label: "Largos", value: stats.distribucionPases.largos },
      { label: "Cortos", value: stats.distribucionPases.cortos },
    ]
  }, [stats])

  const regateStats = useMemo(() => {
    if (!stats) return []
    return [
      { label: "Agilidad", value: stats.agilidad },
      { label: "Técnica", value: stats.radar.tecnica },
      { label: "Sprints", value: stats.sprints },
      { label: "Control de Balón", value: stats.control_balon },
    ]
  }, [stats])

  const fisicoStats = useMemo(() => {
    if (!stats) return []
    return [
      { label: "Fuerza", value: stats.radar.fuerza },
      { label: "Velocidad", value: stats.radar.velocidad },
      { label: "Resistencia", value: stats.resistencia },
      { label: "Salto", value: stats.salto },
    ]
  }, [stats])

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true)
      try {
        const resp = await axiosInstance.get(`/players/${id}/stats`)
        const data = Object.keys(resp.data).length > 0 ? resp.data : null
        setStats(data)
      } catch (err: any) {
        toast.error(err.response?.data?.message || "No se pudo obtener las estadisticas")
      } finally {
        setLoadingStats(false)
      }
    }
    const getPlayer = async () => {
      try {
        const resp = await axiosInstance.get("/players/" + id)
        setPlayer(resp.data)
      } catch (err) {
        setPlayer(null)
      } finally {
        setPlayerLoaded(true)
      }
    }
    getPlayer()
    fetchStats()
  }, [id])

  if (!playerLoaded) {
    return <div><h1>Obteniendo datos del jugador...</h1></div>
  }

  if (!player) {
    return <div><h1>El jugador no ha sido encontrado</h1></div>
  }

  const exportToPdf = async () => {
    const baseUrl = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
    const url = `${baseUrl}/players/${id}/export`
    window.open(url, "_blank")
  }

  const handleShare = () => {
    const currentUrl = window.location.href
    navigator.clipboard.writeText(currentUrl)
    .then(() => {
      toast.success("Enlace para compartir estadisticas copiado")
    })
    .catch(() => {
      toast.error("Error al copiar enlace")
    })
  }

  return (
    <div>

      <div className="rounded-md flex justify-between mt-5 mb-12">
        <div 
        onClick={handleShare}
        className="rounded-md justify-start cursor-pointer flex items-center gap-4">
          <Share />
          <p>Compartir Estadísticias</p>
        </div>
        {stats != null && (
          <div 
          onClick={exportToPdf}
          className=" bg-[#127055] rounded-md flex items-start gap-4 p-3 px-7 cursor-pointer 
            hover:bg-[#0a634a]">
            <Download />
            <p>Descargar Reporte de Analisis</p>
          </div>
        )}

      </div>

      {/* Player Stats */}
      <div className='grid grid-cols-[25fr_75fr] gap-10 mt-5' id='player-stats'>

        <PlayerSection player={player} />

        {isLoadingStats ? (
          <p>Obteniendo Estadísticas </p>
        ) : (
          !stats ? (
            <p>Aun no cuenta con estadisticas el jugador</p>
          ) : (
            <div className='grid grid-cols-4 gap-10'>
              <StatSection title='Pase' posicion={player.posicion} items={pasesStats} />
              <StatSection title='Defensa' posicion={player.posicion} items={defensaStats} />
              <StatSection title='Regate' posicion={player.posicion} items={regateStats} />
              <StatSection title='Fisico' posicion={player.posicion} items={fisicoStats} />
            </div>
          )
        )}
      </div>

      {/* Player Videos */}
      <div>

      </div>

    </div>
  )
}
