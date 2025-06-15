export const ProgressBar = ( {progress} : {progress: number} ) => {
    return (
        <div className='w-full bg-gray-500 rounded-full h-1'>
            <div className='bg-[#13AA14] h-1 rounded-full' style={{width: `${progress}%`}}></div>
        </div>
    )
}