import { Player } from "../../../store/usePlayerStore"
import { capitalize } from "../../../utils/utils"

export const PlayerSection = ( {player} : {player : Player} ) => {

    return (
        <div className='flex flex-col self-start items-center bg-[#1E293B] p-6 rounded-lg'>
          <p className='mb-5 text-2xl font-bold'>{player.nombre} {player.apellido}</p>
          <img className='rounded-full w-full max-w-[140px] mx-auto' src="/images/default-avatar.jpg" alt="" />
          <div className="mt-7 grid grid-cols-2 w-full">
            <div className="space-y-2 text-white/70 font-light">
              <p className="">Edad:</p>
              <p className="">Club:</p>
              <p className="">Posición:</p>
              <p className="">Pie Dominante:</p>
            </div>
            <div className="space-y-2">
              <p>{player.edad} años</p>
              <p>FC Barcelona</p>
              <p>{capitalize(player.posicion)}</p>
              <p>{capitalize(player.pie_dominante)}</p>
            </div>
          </div>
        </div>
    )
}