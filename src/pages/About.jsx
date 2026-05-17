import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { animate, motion, stagger } from 'motion/react';
import '../input.css';

import Navbar from "../components/Navbar.jsx"
import Footer from "../components/Footer.jsx"
import Waves from '../components/Waves.jsx';

export default function About({isDark, toggleDarkMode, isFirstLoad}){

  const aboutElementsRef = useRef([]);
  const [isHoodieHovering, setIsHoodieHovering] = useState(false);
  const [isSauceHovering, setIsSauceHovering] = useState(false);

  useLayoutEffect(() => {
      const elements = aboutElementsRef.current.filter(el => el !== null);
      if (elements.length === 0) return;
      
      const elementDelay = isFirstLoad.current ? 0.7 : 0.1;
      
      animate(
        elements,
        { y: [-20, 0], opacity: [0, 100], filter: ["blur(6px)", "blur(0px)"] },
        { delay: stagger(0.1, { startDelay: elementDelay }), duration: 0.4 }
      );
      
      isFirstLoad.current = false;
      }, []);

  return (
    <div className="dark:text-gray-100 dark:bg-neutral-900 bg-white text-black min-h-screen flex flex-col">
      {/* <ASCIIRain 
        fontSize={16}
        isDark={isDark}
        affectedCharColor={isDark ? "#332501ff" : "#f6de8fff"}
      /> */}
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
      <div className="px-6 lg:px-15 max-w-[1750px] mx-auto relative z-10 flex flex-col flex-1">
        <div id='landing-page' className="landing-page-container flex flex-col flex-1">
          <Navbar isDark={isDark} toggleDarkMode={toggleDarkMode} isFirstLoad={isFirstLoad}/>
          <div className="flex-1 flex flex-col gap-y-24 pt-8 lg:pt-20">

            <div className='flex flex-col lg:flex-row justify-between items-start gap-8'>
              <div className='flex flex-col gap-y-5 lg:max-w-[50%]'>
                <p ref={el => aboutElementsRef.current[0] = el} className='text-3xl 2xl:text-4xl font-semibold tracking-[-0.03em]'>About me</p>
                <div className='flex flex-col gap-y-3'>
                  <div ref={el => aboutElementsRef.current[1] = el} className='flex gap-x-3'>
                    <motion.a whileHover={{scale: 1.1}} href="https://maps.app.goo.gl/ku8iVd2gLbUgPKLQ8" target='_blank'><img src="/col_flag.png" className='w-8'></img></motion.a>
                    <motion.a whileHover={{scale: 1.1}} href="https://maps.app.goo.gl/Q3Jy6qwokZYKBfLz6" target='_blank'><img src='/usa_flag.png' className='w-8'></img></motion.a>
                  </div>
                  <p ref={el => aboutElementsRef.current[2] =el} className='text-gray-500 text-sm lg:text-base 2xl:text-lg leading-relaxed'>My name is Lucas McAllister, and I'm a Computer Science undergrad at the University of Florida from Miami Beach. My passions for design and digital media/computers led me to UX/UI design in my freshman year, where I started designing in teams building websites for clubs I was interested in. I love seeing how thoughtful design makes an impact on people - from the way my campus architecture inspires pride to the way digital experiences shape someone's impression of a product or idea.</p>
                </div>
              </div>
              <img ref={el => aboutElementsRef.current[3] = el} src="/its_me.webp" className='lg:min-w-[285px] lg:w-[45%] max-w-[400px] h-auto object-contain'></img>
            </div>

            <div className='flex flex-col lg:flex-row justify-between items-start gap-8'>
              <div className='flex flex-col gap-y-2 2xl:gap-y-4 lg:max-w-[50%]'>
                <p ref={el => aboutElementsRef.current[4] = el} className='font-sans text-xl xl:text-2xl 2xl:text-3xl font-semibold'>Balance</p>
                <div className='flex flex-col gap-y-5'>
                  <p ref={el => aboutElementsRef.current[5] =el} className='text-gray-500 text-sm lg:text-base 2xl:text-lg leading-relaxed'>Outside of design, I enjoy cooking and creating my own recipes, playing beach volleyball, building computers and working with PC hardware, reselling and collecting sneakers and fashion items, and learning more about sewing and pattern making.</p>
                  <p ref={el => aboutElementsRef.current[6] =el} className='text-gray-500 text-sm lg:text-base 2xl:text-lg leading-relaxed'>Some interesting personal stuff I've been up to recently:</p>
                  <p ref={el => aboutElementsRef.current[7] =el} className='text-gray-500 text-sm lg:text-base 2xl:text-lg leading-relaxed'>-Ranking every restaurant I've been to<br/>-Sewing a <motion.a className='bg-yellow-200 dark:bg-yellow-400/30 font-sans cursor-default' onHoverStart={() => setIsHoodieHovering(true)} onHoverEnd={() => setIsHoodieHovering(false)}>hoodie</motion.a> from a pattern I drafted<br/>-Perfecting my <motion.a className='bg-yellow-200 dark:bg-yellow-400/30 font-sans cursor-default' onHoverStart={() => setIsSauceHovering(true)} onHoverEnd={() => setIsSauceHovering(false)}>vodka sauce</motion.a> recipe</p>
                </div>
              </div>
              <div className="w-full lg:w-[45%] max-w-[571px] relative overflow-hidden aspect-[571/612]">
                <img
                  ref={el => aboutElementsRef.current[8] =el}
                  className="absolute w-1/3 h-auto left-[5%] top-0 object-cover -translate-x-2" 
                  src="/bravas.webp" 
                />
                <img 
                  ref={el => aboutElementsRef.current[9] =el}
                  className="absolute w-[55%] h-auto left-[43%] top-[3%]" 
                  src="/laptop.webp" 
                />
                <motion.img 
                  ref={el => aboutElementsRef.current[10] =el}
                  animate={{scale: isHoodieHovering ? 1.05 : 1}}
                  className="absolute w-[39%] h-auto left-0 top-[38%] object-cover -translate-y-3 -translate-x-2" 
                  src="/hoodie.webp" 
                />
                <motion.img
                  ref={el => aboutElementsRef.current[11] =el}
                  animate={{scale: isSauceHovering ? 1.05 : 1}}
                  className="absolute w-[55%] h-auto left-[43%] top-[48%] -translate-y-4" 
                  src="/sauce.webp" 
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
    
  )
}