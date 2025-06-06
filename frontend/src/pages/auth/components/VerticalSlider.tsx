import { useEffect, useRef } from 'react'
import './vertical-slider.css'

export const VerticalSlider = () => {

  const refs = useRef<(HTMLDivElement | null)[]>([])

  const columns: string[][] = [
    ["/images/image1.jpg", "/images/image2.avif", "/images/image3.avif"],
    ["/images/image3.avif", "/images/image1.jpg", "/images/image2.avif"],
    ["/images/image2.avif", "/images/image3.avif", "/images/image1.jpg"],
    ["/images/image4.avif", "/images/image3.avif", "/images/image2.avif"],
  ]

  useEffect(() => {
    const speeds = [8, 1, 8]; //pixeles por frame
  
    const intervals = refs.current.map((ref, index) => {
      return setInterval(() => {
        if (ref) {
          ref.scrollTop += speeds[index];
          if (ref.scrollTop + ref.clientHeight >= ref.scrollHeight) {
            ref.scrollTop = 0;
          }
        }
      }, 16);
    });
  
    return () => intervals.forEach(clearInterval);
  }, []);


  return (
    <div className='max-w-[870px] mx-auto px-4 py-4'>

      <div className='multi-column-slider'>
        <div className="fade-top" />
        <div className="columns-container">
          {
            columns.map( (images, index) => (
              <div className='column rounded-2xl flex flex-col gap-5' key={index} ref={ (el) => (refs.current[index] = el) }>
                {images.map( (img, idx) => (
                  <div className='slide  rounded-3xl' key={idx}>
                    <img className='w-full h-full rounded-2xl' src={img} alt="" />
                  </div>
                ) )}
              </div>
            ) )
          }
        </div>
        <div className='fade-bottom' />
      </div>

    </div>
  )
}
