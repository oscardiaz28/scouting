import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import { PrecisionTiros } from "../StatsPage";

Chart.register(ArcElement, Tooltip);

export const DoughnutChart = ( { precision  } : { precision: PrecisionTiros} ) => {

    // Suponiendo que el valor que deseas representar es 70% (ajústalo a lo que necesites)
    const porcentaje = Math.round(precision.precisionTiros);
    const restante = 100 - porcentaje;

    const data = {
        datasets: [
            {
                data: [porcentaje, restante],
                backgroundColor: ["#8CD610", "#EAEAEA"],
                borderWidth: 0,
                cutout: "70%"
            }
        ]
    };

    return (
        <div className=" relative mt-8 pr-8">
            <Doughnut
                data={data}
                options={{
                    plugins: {
                        legend: { display: true },
                        tooltip: { enabled: true }
                    },
                    rotation: -90,
                    circumference: 180,
                    responsive: true,
                    maintainAspectRatio: false
                }}
            />
            <div
                style={{
                    position: "absolute",
                    top: "65%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "#8CD610",
                    fontWeight: "bold",
                    fontSize: "40px"
                }}
            >
                {porcentaje}%
            </div>
        </div>
    );

}