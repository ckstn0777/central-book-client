import { css } from '@emotion/react'
import { useCallback, useRef, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { noimage } from '../../assets/images'

export type AnimationImageProps = {
  title?: string
  image_url?: string
}

const calc = (x: number, y: number, rect: DOMRect) => [
  -(y - rect.top - rect.height / 2) / 5,
  (x - rect.left - rect.width / 2) / 5,
  1.2,
]

const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

function AnimationImage({ title, image_url }: AnimationImageProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [xys, setXys] = useState([0, 0, 1])
  const [wait, setWait] = useState(false)
  const onImageMouseOver = useCallback(
    e => {
      if (!wait) {
        setWait(true)
        setTimeout(() => {
          const rect = ref.current?.getBoundingClientRect()
          setXys(calc(e.clientX, e.clientY, rect!))
          setWait(false)
        }, 200)
      }
    },
    [wait]
  )

  const props = useSpring({
    xys,
    config: {
      mass: 1,
      tension: 100,
      friction: 26,
      clamp: false,
      precision: 0.01,
      velocity: 0,
      easing: t => t,
    },
  })

  return (
    <animated.div
      style={{ transform: props.xys.to(trans) }}
      onMouseLeave={() => {
        setTimeout(() => {
          setXys([0, 0, 1])
        }, 200)
      }}
      ref={ref}
      onMouseMove={onImageMouseOver}
    >
      {/* <SaseoBook title={title || ''} image_url={image_url || noimage} /> */}
      <img src={image_url || noimage} alt="book thumnail" />
    </animated.div>
  )
}

export default AnimationImage
