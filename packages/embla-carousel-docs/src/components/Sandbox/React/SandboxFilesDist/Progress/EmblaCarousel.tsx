import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel, {
  EmblaCarouselType,
  EmblaOptionsType
} from 'embla-carousel-react'
import imageByIndex from '../imageByIndex'

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const [scrollProgress, setScrollProgress] = useState(0)

  const onScroll = useCallback((emblaApi: EmblaCarouselType) => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()))
    setScrollProgress(progress * 100)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onScroll(emblaApi)
    emblaApi.on('reInit', onScroll)
    emblaApi.on('scroll', onScroll)
  }, [emblaApi, onScroll])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img
                className="embla__slide__img"
                src={imageByIndex(index)}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="embla__progress">
        <div
          className="embla__progress__bar"
          style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
        />
      </div>
    </div>
  )
}

export default EmblaCarousel
