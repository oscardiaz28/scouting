type Posicion = "delantero" | "mediocampista" | "defensa" | "arquero";
type Categoria = "Pase" | "Regate" | "Defensa" | "Fisico";

export const getPesosPorCategoria = (posicion: string, categoria: string) => {
    
  const map : any = {
    delantero: {
      Pase: {
        "Visión del Juego": 0.05,
        "Definición": 0.5,
        "Centros": 0.1,
        "Asistencias": 0.05,
        "Filtrados": 0.1,
        "Largos": 0.1,
        "Cortos": 0.1,
      },
      Regate: {
        "Agilidad": 0.35,
        "Técnica": 0.35,
        "Sprints": 0.15,
        "Control de Balón": 0.15,
      },
      Fisico: {
        "Fuerza": 0.25,
        "Velocidad": 0.4,
        "Resistencia": 0.2,
        "Salto": 0.15,
      },
    },
    mediocampista: {
      Pase: {
        "Visión del Juego": 0.2,
        "Definición": 0.15,
        "Centros": 0.1,
        "Asistencias": 0.2,
        "Filtrados": 0.15,
        "Largos": 0.1,
        "Cortos": 0.1,
      },
      Regate: {
        "Agilidad": 0.25,
        "Técnica": 0.3,
        "Sprints": 0.15,
        "Control de Balón": 0.3,
      },
      Fisico: {
        "Fuerza": 0.2,
        "Velocidad": 0.3,
        "Resistencia": 0.35,
        "Salto": 0.15,
      },
    },
    defensa: {
      Defensa: {
        "Intercepciones": 0.6,
        "Agresividad": 0.4,
      },
      Pase: {
        "Visión del Juego": 0.1,
        "Definición": 0.05,
        "Centros": 0.05,
        "Asistencias": 0.05,
        "Filtrados": 0.15,
        "Largos": 0.3,
        "Cortos": 0.3,
      },
      Fisico: {
        "Fuerza": 0.4,
        "Velocidad": 0.2,
        "Resistencia": 0.2,
        "Salto": 0.2,
      },
    },
    arquero: {
      Pase: {
        "Visión del Juego": 0.2,
        "Definición": 0,
        "Centros": 0.1,
        "Asistencias": 0,
        "Filtrados": 0.25,
        "Largos": 0.25,
        "Cortos": 0.2,
      },
      Fisico: {
        "Fuerza": 0.2,
        "Velocidad": 0.3,
        "Resistencia": 0.1,
        "Salto": 0.4,
      },
    },
  };

  return map[posicion]?.[categoria] ?? {};

};