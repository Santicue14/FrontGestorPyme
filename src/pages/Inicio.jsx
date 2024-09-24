import { StatsChart } from "../components/StatsChart"
export const Inicio = () => {
    return (
        <main className="h-96">
            <div className="info grid grid-flow-col grid-cols-2 border border-red-600 h-full gap-2">
                <section className="border border-blue-400">
                    Ultimas ventas
                    {/*Tabla de ventas */}
                </section>
                <section>
                    Comparación entre meses
                    {/* Grafico de meses */}
                    <StatsChart />
                </section>
                <section>Clientes frecuentes
                    {/* Lista de clientes */}
                </section>
            </div>
        </main>
    )
}
