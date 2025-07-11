import React, { useState } from "react"
import {motion, useAnimation} from 'framer-motion'

interface SwipeProps{
    children: React.ReactNode,
    onDelete: () => void
}

export const SwipeItem = ( {children, onDelete} : SwipeProps  ) => {

    const controls = useAnimation();
    const [swiped, setSwiped] = useState(false)

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="cursor-pointer "
        drag="x"
        dragConstraints={{ left: -100, right: 0 }}
        onDragEnd={(_, info) => {
          if (info.offset.x < -80) {
            setSwiped(true);
          } else {
            controls.start({ x: 0 });
            setSwiped(false);
          }
        }}
        animate={controls}
      >
        {children}
      </motion.div>

      {swiped && (
        <button
          className="absolute right-0 top-0 bottom-0 bg-red-500 text-white px-4"
          onClick={onDelete}
        >
          Borrar
        </button>
      )}
    </div>
  )

}
