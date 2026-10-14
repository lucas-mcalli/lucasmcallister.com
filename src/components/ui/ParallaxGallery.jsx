import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, motion, stagger, useScroll, useTransform } from 'motion/react'
import { ChevronDown } from 'lucide-react'

function CyclingGalleryPhoto({ imagePool, initialSrc }) {
  const tileRef = useRef(null)
  const currentSrcRef = useRef(initialSrc)
  const [photo, setPhoto] = useState({ current: initialSrc, previous: null })
  const [isNearViewport, setIsNearViewport] = useState(false)

  useEffect(() => {
    const tile = tileRef.current
    if (!tile) return
    if (!('IntersectionObserver' in window)) {
      setIsNearViewport(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      setIsNearViewport(entry.isIntersecting)
    }, { rootMargin: '100px' })
    observer.observe(tile)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isNearViewport || imagePool.length < 2) return

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const connection = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection
    const prefersDataSaving = connection?.saveData
      || connection?.effectiveType === 'slow-2g'
      || connection?.effectiveType === '2g'
    if (prefersReducedMotion || prefersDataSaving) return

    let timeoutId
    let cancelled = false
    const scheduleNextPhoto = () => {
      timeoutId = window.setTimeout(() => {
        const currentSrc = currentSrcRef.current
        const candidates = imagePool.filter(src => src !== currentSrc)
        const nextSrc = candidates[Math.floor(Math.random() * candidates.length)]
        const preload = new window.Image()
        preload.decoding = 'async'
        preload.fetchPriority = 'low'

        let imageReady
        if (typeof preload.decode === 'function') {
          preload.src = nextSrc
          imageReady = preload.decode()
        } else {
          imageReady = new Promise((resolve, reject) => {
            preload.onload = resolve
            preload.onerror = reject
          })
          preload.src = nextSrc
        }

        imageReady.then(() => {
          if (cancelled) return
          const previousSrc = currentSrcRef.current
          currentSrcRef.current = nextSrc
          setPhoto({ current: nextSrc, previous: previousSrc })
          scheduleNextPhoto()
        }).catch(() => {
          if (!cancelled) scheduleNextPhoto()
        })
      }, 3000 + Math.random() * 2000)
    }

    scheduleNextPhoto()
    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
    }
  }, [imagePool, isNearViewport])

  useEffect(() => {
    if (photo.previous === null) return
    const previousSrc = photo.previous
    const timeoutId = window.setTimeout(() => {
      setPhoto(current => current.previous === previousSrc
        ? { ...current, previous: null }
        : current
      )
    }, 850)
    return () => window.clearTimeout(timeoutId)
  }, [photo.previous])

  const imageClassName = 'absolute inset-0 m-0 h-80 w-full rounded object-cover object-left-top p-0'
  const currentImageNumber = photo.current.match(/gallery_(\d+)\.avif$/)?.[1]

  return (
    <div ref={tileRef} className="relative h-80 w-full overflow-hidden rounded">
      {photo.previous !== null && (
        <motion.img
          key={`previous-${photo.previous}`}
          src={photo.previous}
          className={imageClassName}
          height={400}
          width={400}
          alt=""
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          loading="lazy"
        />
      )}
      <motion.img
        key={`current-${photo.current}`}
        src={photo.current}
        className={imageClassName}
        height={400}
        width={400}
        alt={currentImageNumber ? `Gallery photo ${currentImageNumber}` : 'Gallery photo'}
        initial={photo.previous === null ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        loading={photo.current === initialSrc ? 'lazy' : 'eager'}
      />
    </div>
  )
}

export function ParallaxGallery({
  images,
  imagePool = images,
  className = '',
  fullScreen = false,
}) {
  const gridRef = useRef(null)
  const photoElementsRef = useRef([])
  const [viewport, setViewport] = useState(() => typeof window === 'undefined'
    ? { height: 0, width: 0 }
    : { height: window.innerHeight, width: window.innerWidth }
  )

  useEffect(() => {
    const updateViewport = () => setViewport({ height: window.innerHeight, width: window.innerWidth })
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  useLayoutEffect(() => {
    const photos = photoElementsRef.current.filter(Boolean)
    if (!photos.length) return

    const controls = animate(
      photos,
      { y: [24, 0], opacity: [0, 1], filter: ['blur(6px)', 'blur(0px)'] },
      { delay: stagger(0.035, { startDelay: 0.05 }), duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    )

    return () => controls.stop()
  }, [])

  const columnCount = viewport.width >= 1280 ? 5 : 3
  const imageColumns = Array.from({ length: columnCount }, (_, columnIndex) => {
    const start = Math.floor(images.length * columnIndex / columnCount)
    const end = Math.floor(images.length * (columnIndex + 1) / columnCount)
    return images.slice(start, end).map((src, index) => ({ src, index: start + index }))
  })
  const maxColumnLength = Math.max(0, ...imageColumns.map(column => column.length))
  // Each image is 20rem tall with a 2.5rem gap; the grid keeps 10rem below the images.
  const contentHeight = maxColumnLength ? maxColumnLength * 360 + 120 : 0
  const fullScreenScrollDistance = viewport.height
    ? Math.max(viewport.height, contentHeight - viewport.height)
    : 0
  const scrollDistance = fullScreen ? fullScreenScrollDistance : 200
  const { scrollY, scrollYProgress } = useScroll(fullScreen
    ? { target: gridRef, offset: ['start start', 'end end'] }
    : { container: gridRef, offset: ['start start', 'end start'] }
  )

  const translateYColumns = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])
  const translateXColumns = [
    useTransform(scrollYProgress, [0, 1], [0, -200]),
    useTransform(scrollYProgress, [0, 1], [0, -80]),
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    useTransform(scrollYProgress, [0, 1], [0, 80]),
    useTransform(scrollYProgress, [0, 1], [0, 200]),
  ]
  const rotateColumns = [
    useTransform(scrollYProgress, [0, 1], [0, -10]),
    useTransform(scrollYProgress, [0, 1], [0, -5]),
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    useTransform(scrollYProgress, [0, 1], [0, 5]),
    useTransform(scrollYProgress, [0, 1], [0, 10]),
  ]
  const scrollCueOpacity = useTransform(scrollY, [0, 50], [1, 0])
  const titleOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0])

  const columns = (
    <div className="mx-auto grid max-w-[1600px] grid-cols-3 items-start gap-10 px-10 py-15 xl:grid-cols-5 xl:gap-14">
      {imageColumns.map((column, columnIndex) => {
        const animationIndex = columnCount === 3 ? columnIndex * 2 : columnIndex
        return (
          <motion.div
            key={`grid-${columnIndex + 1}`}
            className="grid gap-10"
            style={{
              y: translateYColumns,
              x: translateXColumns[animationIndex],
              rotateZ: rotateColumns[animationIndex],
            }}
          >
            {column.map(({ src, index }) => (
              <motion.div key={`image-${index}`} ref={element => { photoElementsRef.current[index] = element }}>
                <CyclingGalleryPhoto imagePool={imagePool} initialSrc={src} />
              </motion.div>
            ))}
          </motion.div>
        )
      })}
    </div>
  )

  if (fullScreen) {
    return (
      <section
        ref={gridRef}
        className="relative w-full"
        style={{ height: `${viewport.height + fullScreenScrollDistance}px` }}
        aria-label="Photo gallery"
      >
        <div className={`sticky top-0 h-screen w-full overflow-hidden ${className}`}>
          {columns}
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6 text-center"
            style={{ opacity: titleOpacity }}
          >
            {/* This is a placeholder for a title. Going without it for now. */}
            {/* <h2 className="text-5xl font-otto tracking-tight text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)] sm:text-5xl lg:text-6xl">
              Field Notes
            </h2> */}
          </motion.div>
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-[100px] z-30 flex justify-center text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.8)]"
            style={{ opacity: scrollCueOpacity }}
            animate={{ y: [0, 6, 0], scale: [1, 0.92, 1] }}
            transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
          >
            <ChevronDown
              aria-hidden="true"
              className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)] drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
              size={72}
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <div
      ref={gridRef}
      className={`h-[40rem] w-full items-start overflow-y-auto ${className}`}
    >
      {columns}
    </div>
  )
}
