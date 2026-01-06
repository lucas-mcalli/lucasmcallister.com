import { useEffect, useRef } from "react";
import { animate, stagger, press } from "motion";

const Hero = () => {

  const homeArrowRef = useRef(null);
  const heroElementsRef = useRef([]);

  // Home arrow animation
  useEffect(() => {
    if (!homeArrowRef.current) return;

    animate(
      homeArrowRef.current,
      { y: [0, 30] },
      {
        delay: 0.5,
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'reverse'
      }
    );
  }, []);

  // Hero elements animation
  useEffect(() => {
    const elements = heroElementsRef.current.filter(el => el !== null);
    if (elements.length === 0) return;

    animate(
      elements,
      { y: [-20, 0], opacity: [0, 100], filter: ["blur(6px)", "blur(0px)"] },
      { delay: stagger(0.3, { startDelay: 0.7 }), duration: 0.6 }
    );
  }, []);

  return (
    <section id='hero' className='flex flex-col flex-grow justify-center items-center mt-0 md:items-start md:mt-[10%] xl:mt-[4%] 2xl:mt-[8%] gap-y-0 lg:gap-y-[7%]'>
      <p ref={el => heroElementsRef.current[0] = el} className='hero-element text-justify w-full text-4xl/12 text-wrap mb-[15vh] md:text-5xl/18 lg:text-left lg:text-5xl/18 2xl:text-6xl/20 3xl:text-7xl/20 lg:w-[95%] xl:w-[75%]'>
        I'm Lucas, a Computer Science undergraduate at UF focused on User Experience and front-end programming.
      </p>
      <div ref={el => heroElementsRef.current[1] = el} className="hero-element arrow-div hidden mt-0 lg:-mt-15 2xl:mt-0 lg:inline-block sm:mb-[15%] justify-start">
        <a href='#projects-section-text'>
          <svg ref={homeArrowRef} id="home-arrow" xmlns="http://www.w3.org/2000/svg" width="49" height="154" viewBox="0 0 49 154" fill="none" className="stroke-black dark:stroke-white">
            <path d="M24.5 0V152.5M24.5 152.5L48 129M24.5 152.5L1 129" strokeWidth="2"/>
          </svg>
        </a>  
      </div>
  </section>
  )
}

export default Hero;