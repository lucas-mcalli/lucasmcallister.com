import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { animate, motion, stagger, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import '../input.css';

import Navbar from "../components/ui/Navbar.jsx"
import Footer from "../components/ui/Footer.jsx"
import Waves from '../components/ui/Waves.jsx';
import { ParallaxGallery } from '../components/ui/ParallaxGallery.jsx';

const galleryImagePool = Array.from(
  { length: 95 },
  (_, index) => `https://cdn.lucasmcallister.com/about/gallery_photos/gallery_${index + 1}.avif`
)
const galleryImageNumbers = Array.from({ length: 95 }, (_, index) => index + 1)
for (let index = galleryImageNumbers.length - 1; index > 0; index--) {
  const randomIndex = Math.floor(Math.random() * (index + 1))
  const currentNumber = galleryImageNumbers[index]
  galleryImageNumbers[index] = galleryImageNumbers[randomIndex]
  galleryImageNumbers[randomIndex] = currentNumber
}

const galleryImages = galleryImageNumbers
  .slice(0, 20)
  .map(number => galleryImagePool[number - 1])

export default function About({isDark, toggleDarkMode, isFirstLoad}){

  const aboutElementsRef = useRef([]);
  const navbarRef = useRef(null);
  const galleryRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(() => typeof window === 'undefined' ? 0 : window.innerHeight);
  const [navbarHeight, setNavbarHeight] = useState(72);
  const [fadeAmount, setFadeAmount] = useState(0);
  const [isHoodieHovering, setIsHoodieHovering] = useState(false);
  const [isSauceHovering, setIsSauceHovering] = useState(false);

  const { scrollYProgress: galleryApproach } = useScroll({
    target: galleryRef,
    offset: ['start end', 'start start'],
  });
  const initialGalleryProgress = viewportHeight
    ? Math.max(0, Math.min(1, (viewportHeight - navbarHeight) / viewportHeight))
    : 0;
  const fadeDistance = Math.min(320, viewportHeight * 0.4);
  const dissolveEnd = viewportHeight
    ? Math.min(1, initialGalleryProgress + fadeDistance / viewportHeight)
    : 1;
  const dissolveProgress = useTransform(galleryApproach, value => {
    const range = Math.max(0.001, dissolveEnd - initialGalleryProgress);
    const linearProgress = Math.max(0, Math.min(1, (value - initialGalleryProgress) / range));
    return linearProgress * linearProgress * (3 - 2 * linearProgress);
  });
  const navbarOpacity = useTransform(dissolveProgress, [0, 1], [1, 0]);
  const grainOpacity = useTransform(dissolveProgress, [0, 0.4, 1], [0, 0.24, 0.38]);

  useMotionValueEvent(dissolveProgress, 'change', value => {
    setFadeAmount(Math.max(0, Math.min(1, value)));
  });

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    return () => window.removeEventListener('resize', updateViewportHeight);
  }, []);

  useLayoutEffect(() => {
    if (!navbarRef.current) return;
    const updateNavbarHeight = () => setNavbarHeight(navbarRef.current?.offsetHeight ?? 72);
    updateNavbarHeight();
    const observer = new ResizeObserver(updateNavbarHeight);
    observer.observe(navbarRef.current);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
      const elements = aboutElementsRef.current.filter(el => el !== null);
      if (elements.length === 0) return;

      const fontsReady = typeof document !== 'undefined' && document.fonts
        ? Promise.race([
            document.fonts.ready,
            new Promise(resolve => setTimeout(resolve, 1200)),
          ])
        : Promise.resolve();

      let cancelled = false;
      fontsReady.then(() => {
        if (cancelled) return;
        const startDelay = isFirstLoad.current ? 0.2 : 0.1;
        const controls = animate(
          elements,
          { y: [-20, 0], opacity: [0, 100], filter: ["blur(3px)", "blur(0px)"] },
          { delay: stagger(0.1, { startDelay }), duration: 0.4 }
        );
        Promise.resolve(controls.finished ?? controls).then(() => {
          if (!cancelled) window.dispatchEvent(new Event('hero-animation-complete'));
        }).catch(() => {});
      });

      isFirstLoad.current = false;
      return () => { cancelled = true; };
      }, []);

  return (
    <div className="dark:text-gray-100 dark:bg-neutral-900 bg-white text-black min-h-screen flex flex-col">
      {/* <ASCIIRain 
        fontSize={16}
        isDark={isDark}
        affectedCharColor={isDark ? "#332501ff" : "#f6de8fff"}
      /> */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Waves
          lineColor={isDark ? "#1f1f1f" : "#F5F5F5"}
          backgroundColor={isDark ? "rgba(0,0,0,0)" : "rgba(255, 255, 255, 0)"}
          waveSpeedX={0}
          waveSpeedY={0.04}
          waveAmpX={15}
          waveAmpY={25}
          friction={0.75}
          tension={0.001}
          maxCursorMove={20}
          xGap={12}
          yGap={36}
        />
      </div>
      <div className="relative z-10 w-full">
        <div className="relative">
          <motion.div
            ref={navbarRef}
            className="sticky top-0 z-30 px-6 lg:px-20 max-w-[1900px] mx-auto"
            style={{
              opacity: navbarOpacity,
              pointerEvents: fadeAmount >= 0.99 ? 'none' : 'auto',
            }}
          >
            <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad}/>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay"
              style={{ opacity: grainOpacity }}
            >
              <svg className="h-full w-full" preserveAspectRatio="none">
                <filter id="about-navbar-grain" x="0" y="0" width="100%" height="100%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="8" result="grain" />
                  <feColorMatrix in="grain" type="saturate" values="0" />
                  <feComponentTransfer>
                    <feFuncA type="table" tableValues="0 0.18" />
                  </feComponentTransfer>
                </filter>
                <rect width="100%" height="100%" filter="url(#about-navbar-grain)" />
              </svg>
            </motion.div>
          </motion.div>
          <div ref={galleryRef}>
            <ParallaxGallery images={galleryImages} imagePool={galleryImagePool} fullScreen />
          </div>
        </div>
        <div className="px-6 lg:px-20 max-w-[1900px] mx-auto relative z-10 flex flex-col flex-1">
          <div id='landing-page' className="landing-page-container flex flex-col flex-1">
          <div className="flex-1 flex flex-col gap-y-24 pt-8 lg:pt-20">

            <div className='flex flex-col lg:flex-row justify-between items-start gap-8'>
              <div className='flex flex-col gap-y-5 lg:max-w-[50%]'>
                <p ref={el => aboutElementsRef.current[0] = el} className='text-3xl 2xl:text-4xl font-semibold tracking-[-0.03em]'>About me</p>
                <div className='flex flex-col gap-y-3'>
                  <div ref={el => aboutElementsRef.current[1] = el} className='flex gap-x-3'>
                    <motion.a whileHover={{scale: 1.1}} href="https://maps.app.goo.gl/ku8iVd2gLbUgPKLQ8" target='_blank'><img src="https://cdn.lucasmcallister.com/about/col_flag.png" className='w-8'></img></motion.a>
                    <motion.a whileHover={{scale: 1.1}} href="https://maps.app.goo.gl/Q3Jy6qwokZYKBfLz6" target='_blank'><img src='https://cdn.lucasmcallister.com/about/usa_flag.png' className='w-8'></img></motion.a>
                  </div>
                  <p ref={el => aboutElementsRef.current[2] =el} className='text-gray-500 text-sm lg:text-base 2xl:text-lg leading-relaxed'>My name is Lucas McAllister, and I'm a Computer Science undergrad at the University of Florida from Miami Beach. My passions for design and digital media/computers led me to UX/UI design in my freshman year, where I started designing in teams building websites for clubs I was interested in. I love seeing how thoughtful design makes an impact on people - from the way my campus architecture inspires pride to the way digital experiences shape someone's impression of a product or idea.</p>
                </div>
              </div>
              <img ref={el => aboutElementsRef.current[3] = el} src="https://cdn.lucasmcallister.com/about/its_me.webp" className='w-full lg:min-w-[285px] lg:w-[45%] max-w-[400px] h-auto object-contain'></img>
            </div>

            <div className='flex flex-col lg:flex-row justify-between items-start gap-8'>
              <div className='flex flex-col gap-y-2 2xl:gap-y-4 lg:max-w-[50%]'>
                <p ref={el => aboutElementsRef.current[4] = el} className='font-sans text-xl xl:text-2xl 2xl:text-3xl font-semibold'>Balance</p>
                <div className='flex flex-col gap-y-5'>
                  <p ref={el => aboutElementsRef.current[5] =el} className='text-gray-500 text-sm lg:text-base 2xl:text-lg leading-relaxed'>Outside of design, I enjoy cooking and creating my own recipes, playing beach volleyball, building computers and working with PC hardware, reselling and collecting sneakers and fashion items, and traveling, having been to 10 countries so far.</p>
                  <p ref={el => aboutElementsRef.current[6] =el} className='text-gray-500 text-sm lg:text-base 2xl:text-lg leading-relaxed'>Some interesting personal stuff I've been up to recently:</p>
                  <p ref={el => aboutElementsRef.current[7] =el} className='text-gray-500 text-sm lg:text-base 2xl:text-lg leading-relaxed'>-Ranking every restaurant I've been to<br/>-Sewing a <motion.a className='bg-yellow-200 dark:bg-yellow-400/30 font-sans cursor-default' onHoverStart={() => setIsHoodieHovering(true)} onHoverEnd={() => setIsHoodieHovering(false)}>hoodie</motion.a> from a pattern I drafted<br/>-Perfecting my <motion.a className='bg-yellow-200 dark:bg-yellow-400/30 font-sans cursor-default' onHoverStart={() => setIsSauceHovering(true)} onHoverEnd={() => setIsSauceHovering(false)}>vodka sauce</motion.a> recipe</p>
                </div>
              </div>
              <div className="w-full lg:w-[45%] max-w-[571px] relative overflow-hidden aspect-[571/612]">
                <img
                  ref={el => aboutElementsRef.current[8] =el}
                  className="absolute w-1/3 h-auto left-[5%] top-0 object-cover -translate-x-2" 
                  src="https://cdn.lucasmcallister.com/about/bravas.webp" 
                />
                <img 
                  ref={el => aboutElementsRef.current[9] =el}
                  className="absolute w-[55%] h-auto left-[43%] top-[1%]" 
                  src="https://cdn.lucasmcallister.com/about/canal.avif" 
                />
                <motion.img 
                  ref={el => aboutElementsRef.current[10] =el}
                  animate={{scale: isHoodieHovering ? 1.05 : 1}}
                  className="absolute w-[40%] h-auto left-0 top-[38%] object-cover -translate-y-3 -translate-x-2" 
                  src="https://cdn.lucasmcallister.com/about/hoodie.webp" 
                />
                <motion.img
                  ref={el => aboutElementsRef.current[11] =el}
                  animate={{scale: isSauceHovering ? 1.05 : 1}}
                  className="absolute w-[55%] h-auto left-[43%] top-[48%] -translate-y-4" 
                  src="https://cdn.lucasmcallister.com/about/sauce.webp" 
                />
              </div>
            </div>

          </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
    
  )
}
