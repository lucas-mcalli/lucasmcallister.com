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
    const scheduleNextPhoto = (isFirstSwitch = false) => {
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
      }, isFirstSwitch ? 1000 + Math.random() * 1500 : 3000 + Math.random() * 2000)
    }

    scheduleNextPhoto(true)
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

  const imageClassName = 'absolute inset-0 m-0 h-full w-full rounded object-cover object-center p-0'
  const currentImageNumber = photo.current.match(/gallery_(\d+)\.avif$/)?.[1]

  return (
    <div ref={tileRef} className="relative aspect-[3/4] w-full overflow-hidden rounded">
      {photo.previous !== null && (
        <motion.img
          key={`previous-${photo.previous}`}
          src={photo.previous}
          className={imageClassName}
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
  const columnElementsRef = useRef([])
  const [measuredContentHeight, setMeasuredContentHeight] = useState(0)
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
  }, [viewport.width >= 1024])

  const isXlScreen = viewport.width >= 1280
  const isLargeScreen = viewport.width >= 1024
  const visibleImages = isXlScreen ? images : images.slice(0, 16)
  const columnCount = isXlScreen ? 5 : 4
  const imageColumns = Array.from({ length: columnCount }, (_, columnIndex) => {
    const start = Math.floor(visibleImages.length * columnIndex / columnCount)
    const end = Math.floor(visibleImages.length * (columnIndex + 1) / columnCount)
    return visibleImages.slice(start, end).map((src, index) => ({ src, index: start + index }))
  })
  const maxColumnLength = Math.max(0, ...imageColumns.map(column => column.length))
  const estimatedColumnWidth = isXlScreen
    ? (viewport.width - 304) / 5
    : (viewport.width - 168) / 4
  const estimatedContentHeight = maxColumnLength
    ? maxColumnLength * (Math.max(0, estimatedColumnWidth) * 4 / 3 + 40) + 120
    : 0
  const contentHeight = measuredContentHeight || estimatedContentHeight

  useLayoutEffect(() => {
    const columns = columnElementsRef.current.filter(Boolean)
    if (!columns.length || !('ResizeObserver' in window)) return

    const updateContentHeight = () => {
      const tallestColumn = Math.max(...columns.map(column => column.offsetHeight))
      setMeasuredContentHeight(Math.ceil(tallestColumn + 120))
    }
    const observer = new ResizeObserver(updateContentHeight)
    columns.forEach(column => observer.observe(column))
    updateContentHeight()
    return () => observer.disconnect()
  }, [isLargeScreen, columnCount, images.length])
  const fullScreenScrollDistance = viewport.height
    ? Math.max(0, contentHeight - viewport.height)
    : 0
  const scrollDistance = fullScreen ? fullScreenScrollDistance : 200
  const { scrollY, scrollYProgress } = useScroll(fullScreen
    ? { target: gridRef, offset: ['start start', 'end end'] }
    : { container: gridRef, offset: ['start start', 'end start'] }
  )

  const translateYColumns = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance])
  const columnSpread = 200
  const columnRotation = 10
  const translateXColumns = [
    useTransform(scrollYProgress, [0, 1], [0, -columnSpread]),
    useTransform(scrollYProgress, [0, 1], [0, -columnSpread * 0.4]),
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    useTransform(scrollYProgress, [0, 1], [0, columnSpread * 0.4]),
    useTransform(scrollYProgress, [0, 1], [0, columnSpread]),
  ]
  const rotateColumns = [
    useTransform(scrollYProgress, [0, 1], [0, -columnRotation]),
    useTransform(scrollYProgress, [0, 1], [0, -columnRotation * 0.5]),
    useTransform(scrollYProgress, [0, 1], [0, 0]),
    useTransform(scrollYProgress, [0, 1], [0, columnRotation * 0.5]),
    useTransform(scrollYProgress, [0, 1], [0, columnRotation]),
  ]
  const scrollCueOpacity = useTransform(scrollY, [0, 50], [1, 0])
  const titleOpacity = useTransform(scrollYProgress, [0.55, 1], [1, 0])

  if (!isLargeScreen) return null

  const columns = (
    <div className="mx-auto grid w-full max-w-[2200px] grid-cols-4 items-start gap-10 px-6 py-15 xl:grid-cols-5 xl:gap-14 xl:px-10">
      {imageColumns.map((column, columnIndex) => {
        const animationIndex = columnCount === 4 && columnIndex >= 2
          ? columnIndex + 1
          : columnIndex
        return (
          <motion.div
            key={`grid-${columnIndex + 1}`}
            ref={element => { columnElementsRef.current[columnIndex] = element }}
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
