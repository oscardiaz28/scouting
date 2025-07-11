import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Player, usePlayerStore } from "../../store/usePlayerStore";
import toast from "react-hot-toast";

interface ModalProps {
    showModal: boolean,
    setShowModal: (value: boolean) => void,
    selectedPlayer: Player | null
}

export const Modal = ({ setShowModal, selectedPlayer }: ModalProps) => {

    const [error, setError] = useState(null)
    const { addPlayer, setSelectedPlayer, editPlayer } = usePlayerStore()

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Player>()

    const handleClose = () => {
        setShowModal(false)
        setSelectedPlayer(null)
    }

    const cleanEmptyFields = (data: Player ) =>
    Object.fromEntries(Object.entries(data).filter( ([_, value]) => value !== ''));

    const onSubmit = async (body: Player) => {
        const data = cleanEmptyFields(body) as Player;
        try {
            if(selectedPlayer){
                await editPlayer(selectedPlayer._id, data);
            }else{
                await addPlayer(data)
            }
            toast.success(`Jugador ${selectedPlayer ? "editado" : "registrado"} correctamente`)
            setSelectedPlayer(null)
            setShowModal(false)
        } catch (err: any) {
            const typeError = err.response.data
            if (Array.isArray(typeError)) {
                setError(err.response.data[0].message || `No se ha podido ${selectedPlayer ? "editar" : "agregar"} al jugador`)
            } else {
                setError(err.response.data.message || `No se ha podido ${selectedPlayer ? "editar" : "agregar"} al jugador`)
            }
        }
    }

    useEffect(() => {
        if(selectedPlayer){
            reset({
                dni: selectedPlayer.dni || "",
                nombre: selectedPlayer.nombre || "",
                apellido: selectedPlayer.apellido || "",
                posicion: selectedPlayer.posicion || "",
                edad: selectedPlayer.edad || undefined,
                goles: selectedPlayer.goles || undefined,
                partidos: selectedPlayer.partidos || undefined,
                pie_dominante: selectedPlayer.pie_dominante || ""
            })
        }
    }, [selectedPlayer])

    return (
        <>
            <div className="absolute top-0 left-0 h-screen w-full bg-black/70 flex justify-center p-8 overflow-auto ">
                <div className="modal-container max-w-2xl p-8 px-8 relative flex flex-col gap-6 z-50">
                    <div className="flex items-center justify-between">
                        <h1 className="font-bold text-2xl">
                            { selectedPlayer === null ? "Registrar Jugador" : "Editar Jugador" }
                        </h1>
                        <div className="cursor-pointer hover:bg-zinc-700 w-6 h-6 rounded-full flex items-center justify-center" onClick={handleClose}>
                            <X className="w-4" />
                        </div>
                    </div>
                    {error && (
                        <div className="text-black p-3 rounded-md px-3 bg-rose-500 flex items-center justify-between">
                            <div className="text-md">{error}</div>
                            <X className="w-5 cursor-pointer" onClick={() => setError(null)} />
                        </div>
                    )}

                    <div className="mt-1 w-full">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="dni">DNI</label>
                                    <input
                                        maxLength={8}
                                        {...register('dni', {
                                            required: 'El DNI es requerido',
                                            pattern: { value: /^[0-9]+$/, message: "Solo se permiten números" },
                                            minLength: { value: 8, message: "El DNI debe tener 8 dígitos" }
                                        })}
                                        type="text" placeholder="DNI" name="dni" id="dni"
                                        className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full"
                                    />
                                    {errors.dni && <span className="text-sm text-rose-500">{errors.dni.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input
                                        {...register('nombre', { required: "El nombre es requerido" })}
                                        type="text" placeholder="Nombre" name="nombre" id="nombre"
                                        className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full"
                                    />
                                    {errors.nombre && <span className="text-sm text-rose-500">{errors.nombre.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="apellido">Apellido</label>
                                    <input
                                        {...register('apellido', { required: "El apellido es requerido" })}
                                        type="text" placeholder="Apellido" name="apellido" id="apellido"
                                        className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full"
                                    />
                                    {errors.apellido && <span className="text-sm text-rose-500">{errors.apellido.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="posicion">Posición</label>
                                    <select
                                        {...register('posicion', { required: "Debes seleccionar una posición" })}
                                        name="posicion" id="posicion"
                                        className="flex-1 bg-[#070708] bg-[#334155] border-1 border-gray-600 appearance-none p-2 rounded-md text-base focus:outline-0 focus:border-1 focus:border-gray-700">
                                        <option value="">Selecciona la posición</option>
                                        <option value="delantero">Delantero</option>
                                        <option value="arquero">Arquero</option>
                                        <option value="defensa">Defensa</option>
                                        <option value="mediocampista">Mediocampista</option>
                                    </select>
                                    {errors.posicion && <span className="text-sm text-rose-500">{errors.posicion.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="edad">Edad</label>
                                    <input
                                        {...register('edad', { required: "La edad es requerida" })}
                                        type="number" placeholder="Edad" name="edad" id="edad"
                                        className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full"
                                    />
                                    {errors.edad && <span className="text-sm text-rose-500">{errors.edad.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="partidos">Partidos</label>
                                    <input
                                        {...register('partidos')}
                                        type="number" placeholder="Partidos" name="partidos" id="partidos"
                                        className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full"
                                        min={0}
                                    />
                                    {errors.partidos && <span className="text-sm text-rose-500">{errors.partidos.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="goles">Goles</label>
                                    <input
                                        {...register('goles')}
                                        type="number" placeholder="Goles" name="goles" id="goles"
                                        className="appearance-none bg-[#334155] border-1 border-gray-600 rounded-md p-2 px-3 focus:outline-0 focus:border-1 w-full"
                                        min={0}
                                    />
                                    {errors.goles && <span className="text-sm text-rose-500">{errors.goles.message}</span>}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="goles">Pie Dominante</label>
                                    <select
                                        {...register('pie_dominante', { required: "Debes seleccionar una opción" })}
                                        name="pie_dominante" id="pie_dominante"
                                        className="flex-1 bg-[#334155] border-1 border-gray-600 appearance-none p-2 rounded-md text-base focus:outline-0 focus:border-1 focus:border-gray-700">
                                        <option value="">Selecciona una opción</option>
                                        <option value="derecho">Derecho</option>
                                        <option value="izquierdo">Izquierdo</option>
                                    </select>
                                    {errors.pie_dominante && <span className="text-sm text-rose-500">{errors.pie_dominante.message}</span>}
                                </div>
                            </div>

                            <div className="flex justify-start gap-2 mt-8">
                                <button type="button" className="btn p-1 px-3 rounded-md bg-blue-800 text-white h-10 cursor-pointer"
                                    onClick={handleClose}
                                >Cancelar</button>
                                <button
                                    type="submit" className="btn p-1 px-3 rounded-md bg-rose-800 text-white h-10 cursor-pointer">
                                        {selectedPlayer ? "Editar" : "Agregar"}
                                    </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}