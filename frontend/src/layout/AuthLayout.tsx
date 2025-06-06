import { Outlet } from 'react-router-dom'
import { VerticalSlider } from '../pages/auth/components/VerticalSlider'

export const AuthLayout = () => {
  return (
    <div>
        {/* <Outlet /> */}

        <div className='border-b border-gray-700'>
          <div className='w-full h-[70px] flex items-center justify-between max-w-[1400px] mx-auto px-4'>
            <h1 className='text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text'>FootbalApp</h1>

            <div className='flex items-center gap-4'>
              <button className='bg-[#333] hover:bg-[#444] transition duration-300 p-2 px-4 rounded-md cursor-pointer'>Iniciar Sesión</button>
              <button className='bg-[#333]  hover:bg-[#444] transition duration-300 p-2 px-4 rounded-md cursor-pointer'>Registrarse</button>
            </div>

          </div>

        </div>

        <div>
          {/* <VerticalSlider /> */}
          

        </div>        

    </div>
  )
}
