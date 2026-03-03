import { motion } from 'motion/react';
import { useRef } from 'react';
import { useProjectAnimation } from '../helpers/useProjectAnimation';
import { useActiveSection } from '../helpers/useActiveSection';
import Timeline from "./Timeline.jsx"

const AtriumProject = ({getGraphic, projectElementsRef, isExpanded}) => {

  const contextRef = useRef(null)
  const problemRef = useRef(null)
  const processRef = useRef(null)
  const designRef = useRef(null)
  const reflectionRef = useRef(null)

  const sections = [
    { id: 'context', ref: contextRef },
    { id: 'problem', ref: problemRef },
    { id: 'process', ref: processRef },
    { id: 'design', ref: designRef },
    { id: 'reflection', ref: reflectionRef },
  ];

  // Use custom hook to track active section
  const activeSection = useActiveSection(sections, isExpanded);
  
  // Use custom hook for element animations
  useProjectAnimation(projectElementsRef, isExpanded);

  return (
    <>
      <Timeline 
        ref={el => projectElementsRef.current[2] = el} 
        sections={sections}
        activeSection={activeSection}
      />
      <div className="flex gap-7 2xl:gap-10 flex-col relative pointer-events-none">
      <section id="CONTEXT" className="scroll-mt-45" ref={el => {
        projectElementsRef.current[0] = el;
        contextRef.current = el;
      }
      }>
        <p className="text-xs sm:text-sm">CONTEXT</p>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7">
          <div className="flex items-center w-full gap-6 xl:gap-8 lg:w-[90%] 2xl:w-[70%]">
            <p className="font-serif mt-2 sm:text-xl lg:text-2xl xl:text-3xl xl:w-[60%] 2xl:w-[70%]">This project was submitted to SwampHacks XI, the University of Florida’s flagship 36 hour hackathon.</p>
            <img className="w-1/10 h-1/10 max-w-[100px] max-h-[100px] min-w-[80px] max-w-[80px] rotate-[17.45deg] rounded-full shadow-[0px_0px_21.399999618530273px_12px_rgba(0,0,0,0.25)] dark:shadow-[0px_0px_21.4px_12px_rgba(255,255,255,0.25)] outline outline-1 outline-black" src="/swamphacks_logo.jpg" alt="SwampHacks logo" />
          </div>   
          <div className='flex items-center w-full gap-6 xl:gap-10 xl:w-[80%] 2xl:w-[70%]'>
            <div className="flex flex-col ml-3 xl:ml-4 gap-2 items-center max-w-[100px] w-[20%]">
              <img src={getGraphic("three")} className="h-auto w-full" alt="Three team members illustration" />
              <p className=" font-sans text-xs lg:text-sm xl:text-base whitespace-nowrap">Team Members</p>
            </div>
            <div className='flex flex-col gap-3 w-[75%]'>
              <p className="font-sans text-xs md:text-base lg:text-lg">As a front-end developer and designer, my role was scoping the project around our time constraints, building a cohesive brand and visual identity, and designing and implementing screens with reusable components.</p>
            <p className="font-sans text-xs md:text-base lg:text-lg z-10">Built with <motion.a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="underline pointer-events-auto" whileHover={{ color: '#eec12e' }}>Next.js</motion.a> + <motion.a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="underline pointer-events-auto" whileHover={{ color: '#eec12e' }}>React</motion.a>, <motion.a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="underline pointer-events-auto" whileHover={{ color: '#eec12e' }}>Tailwind</motion.a>, <motion.a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="underline pointer-events-auto" whileHover={{ color: '#eec12e' }}>Supabase</motion.a>, and hosted with <motion.a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="underline pointer-events-auto" whileHover={{ color: '#eec12e' }}>Vercel</motion.a>.</p>
            </div>
          </div>
        </div>
      </section>
      <section id="PROBLEM" className="scroll-mt-15" ref={el => {
        projectElementsRef.current[1] = el;
        problemRef.current = el;
      }}>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7">
          <div className='flex flex-col gap-2 2xl:gap-3'>
            <p className="mt-8 lg:mt-14 2xl:mt-20 text-xs sm:text-sm">PROBLEM</p>
            <p className="font-serif sm:text-xl lg:text-2xl xl:text-3xl xl:w-[70%] 2xl:w-[70%]">How might we make club meeting attendance feel like the beginning of a relationship rather than a transaction, expanding the ways clubs and members meaningfully connect? </p>
          </div>
          <img src="/atrium_demo_1.webp" className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Image showing desktop frame" />
          <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">College students are pulled in more directions than ever: juggling classes, jobs, and a roster of clubs they care about. But between GroupMe chats, Google Drive folders, and QR codes flashed at GBMs, keeping up starts to become costly. There's no central place to track what orgs they're a part of, and meetings meant to bring them community end up demanding more attention and focus than they can spare.</p>
          <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">For club owners, there's often no reliable way to track who keeps showing up, no mechanism to reward committed members, and no easy way to present resources without interrupting the flow of a meeting. The result: a disconnect between the community they work tirelessly to build and the data that backs it.</p>
        </div>
      </section>
      <section id="PROCESS" className="scroll-mt-15" ref={el => {
        projectElementsRef.current[3] = el;
        processRef.current = el;
      }}>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7" >
          <div className="flex flex-col gap-2 2xl:gap-3">
            <p className=" mt-8 lg:mt-14 2xl:mt-20 text-xs sm:text-sm">PROCESS</p>
            <p className=" font-serif sm:text-xl lg:text-2xl xl:text-3xl xl:w-[70%] 2xl:w-[70%]">Observing how clubs on campus currently track and incentivize attendance to define project scope.</p>
          </div>
          <div className="flex flex-col gap-6 2xl:gap-8">
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">Since Atrium was conceptualized from observable issues in our community, it was easy to see where gaps existed in club membership systems and attendance tracking, namely in keeping a provable record of member activity and measuring participation event-by-event. Additionally, we found that many clubs successfully incentivized participation through point systems and other attendance based rewards.</p>
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">Knowing that time would be a huge source of pressure throughout, it was important to set my team up for success by scoping the project appropriately and creating a sitemap to clarify our workflow and desired outcomes for our MVP. For a 36 hour timeline, we prioritized three areas:</p>
            <img src={getGraphic("atrium_objectives")} className="w-[75%] lg:w-[60%] xl:w-[50%] h-auto" alt="Three key objectives of Atrium's site" />
            <p className=" font-serif sm:text-xl lg:text-2xl xl:text-3xl xl:w-[70%] 2xl:w-[70%]">Establishing visual identity from design to implementation.</p>
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">With the clock running, visual identity had to be simple yet intentional. The goal was a modern and approachable design that suited both organizers and members, meaning a restrained color palette, clean typography, and components built for consistency and simplicity. Visually, the design needed to communicate professionalism, utility, and friendliness while feeling adjacent to apps students use every day.</p>
            <img src={getGraphic("atrium_brand")} className="md:mt-6 xl:w-[75%] 2xl:w-[60%] h-auto" alt="Atrium's core brand colors and typography" />
          </div>
        </div>
      </section>
      <section id="DESIGN" className="scroll-mt-15 -translate-y-8" ref={el => {
        projectElementsRef.current[4] = el;
        designRef.current = el;
      }}>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7">
          <div className='flex flex-col gap-2 2xl:gap-3'>
            <p className=" mt-8 lg:mt-14 2xl:mt-20 text-xs sm:text-sm">DESIGN</p>
            <p className="font-serif sm:text-xl lg:text-2xl xl:text-3xl xl:w-[80%] 2xl:w-[70%]">Designed for connection and clarity.</p>
          </div>
          <div className="flex flex-col gap-6 2xl:gap-8">
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">The final screens are organized around the three priorities we scoped at the outset: account creation, org membership, and gamification. It was important to keep key interactions like joining an event simple and frictionless, ideal for a student quickly checking in. Additionally, working around the tight deadline led to a creative solution in conjoining the member and organizer view into one dashboard, presenting relevant resources by user type.</p>
            <img src="/atrium_collection.webp" className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Final design screenshots"/>
          </div>
        </div>
      </section>
      <section id="REFLECTION" className="scroll-mt-15" ref={el => {
        projectElementsRef.current[5] = el;
        reflectionRef.current = el;
      }}>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7">
          <p className="mt-8 lg:mt-14 2xl:mt-20 text-xs sm:text-sm">REFLECTION</p>
          <div className="flex flex-col gap-6 2xl:gap-8">
            <img src={getGraphic("atrium_reflections")} className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Individual reflections"/>
          </div>
          <p className="font-sans text-xs xl:w-[80%] md:text-base lg:text-lg">Ultimately for me, Atrium reinforced that a project’s technical success is inseparable from the team’s ability to move as a single unit toward a shared vision, and time spent communicating and understanding who that vision is for is time saved from problems down the road.</p>
          <div className='md:flex items-center w-full md:w-[80%]'>
            <div className="flex flex-col justify-center w-full">
              <img src="/atrium_flick.webp" className="md:mt-2 2xl:mt-5 md:mb-2 2xl:mb-5 w-full xl:w-[70%] h-auto" alt="Group photo"/>
              <p className="mt-1 mb-12 font-sans text-xs xl:w-[70%] md:text-base lg:text-lg text-center">A special thanks to <motion.a href="https://www.linkedin.com/in/adrianestevezv/" target="_blank" rel="noopener noreferrer" className="underline pointer-events-auto" whileHover={{ color: '#eec12e' }}>Adrian Estevez</motion.a> and <motion.a href="https://www.linkedin.com/in/mateomcallister/" target="_blank" rel="noopener noreferrer" className="underline pointer-events-auto" whileHover={{ color: '#eec12e' }}>Mateo McAllister</motion.a> for being exceptional teammates and motivators throughout.</p>
            </div>
            <motion.a href="https://atrium.ink" target="_blank" rel="noopener noreferrer" className="inline-flex pointer-events-auto flex-shrink-0 relative group">
              <div className="flex flex-col items-center gap-2">
                <motion.div whileHover={{scale: 1.05}} className="hidden md:flex items-center gap-4 px-5 py-3 rounded-lg border-2 border-gray-200 dark:border-white relative overflow-hidden translate-x-[55%] -translate-y-10 xl:-translate-x-[55%]">
                  <img src="/ATRIUM_LOGO.png" className="w-12 h-12 relative z-10" alt="Atrium logo" />
                  <span className="text-xl font-grotesk whitespace-nowrap relative z-10">atrium.ink</span>
                </motion.div>
                <p className="hidden md:block text-xs font-sans text-center translate-x-[68%] -translate-y-10 xl:-translate-x-[68%]">Check out our desktop demo!</p>
              </div>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
    </>
  )
}

export default AtriumProject