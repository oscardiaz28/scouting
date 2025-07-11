import { useForm } from "react-hook-form";
import { useAuthStore } from "../../store/useAuthStore";
import { Image } from "lucide-react";
import { Logo } from "../../components/common/Logo";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

interface BodyForm{
  username: string,
  email: string,
  password: string
}

export const SignupPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<BodyForm>()
  const { signup, isSigningIn } = useAuthStore();
  const navigate = useNavigate()

  const onSubmit = async (data: BodyForm) => {
    try{
      await signup(data)
      toast.success("Registro exitoso, inicie sesión")
      navigate("/login")
    }catch(err: any){
      console.log(err.response.data)
      toast.error(err.response?.data?.message || "No se ha podido crear su cuenta" )
    }
  }

  return (
    <div className='min-h-screen bg-[#020617] grid lg:grid-cols-2'>

      <div className='flex items-center justify-center p-6 sm:p-12'>

        <div className='w-full max-w-md'>

          <div className='mb-12'>
            <Logo size='text-4xl' />
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>

            <div className='flex flex-col gap-2'>
              <label className='font-bold text-sm text-white/90' htmlFor="">Username</label>
              <input
                {...register('username', {
                  required: "El username es requerido",
                })}
                type="text" placeholder='Username' name='username' className='border border-white/20 rounded-md py-1 px-3 h-10 text-base shadow-sm bg-transparent' id='username' />
              {errors.username && <span className='text-rose-500 text-sm'>{errors.username.message}</span>}
            </div>

            <div className='flex flex-col gap-2'>
              <label className='font-bold text-sm text-white/90' htmlFor="">Email</label>
              <input
                {...register('email', {
                  required: "El email es requerido",
                  pattern: { value: /^\S+@\S+$/i, message: 'Email no válido' }
                })}
                type="email" placeholder='Email' name='email' className='border border-white/20 rounded-md py-1 px-3 h-10 text-base shadow-sm bg-transparent' autoComplete='email' autoCorrect='off' id='email' />
              {errors.email && <span className='text-rose-500 text-sm'>{errors.email.message}</span>}
            </div>


            <div className='flex flex-col gap-2'>
              <label className='font-bold text-sm text-white/90' htmlFor="">Contraseña</label>
              <input
                {...register('password', { required: "El password es requerido" })}
                type="password" placeholder='Password' name='password' className='border border-white/20 rounded-md py-1 px-3 h-10 text-base shadow-sm bg-transparent' autoComplete='password' autoCorrect='off' id='password' />
              {errors.password && <span className='text-rose-500 text-sm'>{errors.password.message}</span>}
            </div>
            <button 
            className='bg-[#FCFBF8] text-[#1c1c1c] w-full font-semibold rounded-md h-9 text-sm cursor-pointer' type='submit'>
              { isSigningIn ? "..." : "Crea tu Cuenta"}
            </button>
          </form>

          <div className='w-full flex items-center justify-center mt-6 text-center'>
            <Link to={"/login"} className='block text-base hover:underline'>
                ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>

        </div>

      </div>

      <div className='hidden lg:flex h-screen p-4 relative '>
        <div className='w-full rounded-2xl overflow-hidden'>
          <img src="/images/train-bg.webp" alt="" className='w-full h-full object-cover opacity-70 bg-right rounded-lg overflow-hidden' />
        </div>
        <div className='bg-black/20 backdrop-blur-xl shadow-md border border-black/20 absolute max-w-md w-full text-center rounded-lg p-4 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]'>

          <div className='absolute left-[27%] top-1/2 translate-y-[-50%]'>
            <div className='relative'>
              <Image className='text-white/40 w-6 ' />
              <div className="absolute top-0 h-[2px] left-0 w-6 bg-white/50 animate-scan-vertical rounded-full origin-top"></div>
            </div>
          </div>

          <div>
            <p className='texto-cargando text-[18px]'>Analizando video</p>
          </div>
        </div>
      </div>

    </div>
  )


}
