import { animate, stagger } from 'motion';
import { useEffect, useRef, useState } from 'react';

import Timeline from "./Timeline.jsx"

const GGProject = ({getGraphic, projectTwoElementsRef, showProjectTwo}) => {

  const contextRef = useRef(null)
  const problemRef = useRef(null)
  const researchRef = useRef(null)
  const designRef = useRef(null)
  const handoffRef = useRef(null)

  const [activeSection, setActiveSection] = useState(null)

  // Determine which section is most prominently in view
  useEffect(() => {
    const determineActiveSection = () => {
      const sections = [
        { ref: contextRef, id: 'context' },
        { ref: problemRef, id: 'problem' },
        { ref: researchRef, id: 'research' },
        { ref: designRef, id: 'design' },
        { ref: handoffRef, id: 'handoff' }
      ]

      // Reference point: 35% from top of viewport (slightly above timeline for better UX)
      const referencePoint = window.innerHeight * 0.35
      let closestSection = null
      let closestDistance = Infinity

      sections.forEach(({ ref, id }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect()
          // Check if section is in viewport
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Calculate distance from reference point to section's top
            const distance = Math.abs(rect.top - referencePoint)
            if (distance < closestDistance) {
              closestDistance = distance
              closestSection = id
            }
          }
        }
      })

      setActiveSection(closestSection)
    }

    // Throttle resize handler to prevent excessive calls
    let resizeRAF = null
    const handleResize = () => {
      if (resizeRAF) return
      resizeRAF = requestAnimationFrame(() => {
        determineActiveSection()
        resizeRAF = null
      })
    }

    // Check on mount and scroll
    determineActiveSection()
    window.addEventListener('scroll', determineActiveSection, { passive: true })
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('scroll', determineActiveSection)
      window.removeEventListener('resize', handleResize)
      if (resizeRAF) {
        cancelAnimationFrame(resizeRAF)
      }
    }
  }, [showProjectTwo])

    // Project two element animation
  useEffect(() => {
    const elements = projectTwoElementsRef.current.filter(el => el !== null);
    if (elements.length === 0) return;

    animate(
      elements,
      {y: [15, 0], opacity: [0,100], filter:["blur(6px)", "blur(0px)"]},
      {delay: stagger(0.15, { startDelay: 0.1 }), duration: 0.3, easing: "ease-out"}
    );
  }, [showProjectTwo])

  return (
    <>
      <Timeline 
        ref={el => projectTwoElementsRef.current[2] = el} 
        activeSection={activeSection}
      />
      <div className="project-two flex gap-7 2xl:gap-10 flex-col relative pointer-events-none">
      <section id="CONTEXT" className="scroll-mt-35" ref={el => {
        projectTwoElementsRef.current[0] = el;
        contextRef.current = el;
      }
      }>
        <p className="text-xs sm:text-sm">CONTEXT</p>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7">
          <div className="flex items-center w-full gap-6 xl:gap-10 xl:w-[90%] 2xl:w-[70%]">
            <p className="font-serif mt-2 sm:text-xl lg:text-2xl xl:text-3xl xl:w-[75%] 2xl:w-[70%]">This project was completed as part of a Gator User Design initiative to give members experience in research-driven design serving other on-campus organizations.</p>
            <img className="w-1/10 h-1/10 max-w-[100px] max-h-[100px] min-w-[80px] max-w-[80px] rotate-[17.45deg] rounded-full shadow-[0px_0px_21.399999618530273px_12px_rgba(0,0,0,0.25)] dark:shadow-[0px_0px_21.4px_12px_rgba(255,255,255,0.25)] outline outline-1 outline-black" src="/gator_user_design_logo.jpeg" alt="Gator User Design logo" />
          </div>   
          <div className='flex items-start xl:items-center w-full gap-6 xl:gap-10 xl:w-[80%] 2xl:w-[70%]'>
            <div className="flex flex-col ml-3 xl:ml-4 gap-2 xl:gap-5 items-center max-w-[100px] w-[20%]">
              <img src={getGraphic("six")} className="h-auto w-full" alt="Six team members illustration" />
              <p className=" font-sans text-xs lg:text-sm xl:text-base whitespace-nowrap">Team Members</p>
            </div>
            <div className='flex flex-col gap-2 2xl:gap-4 items-center'>
              <p className=" font-sans text-xs md:text-base lg:text-lg">Gator Gaming is a student org at UF founded in 2010 focused on building community through video games. They host tournaments, social events, and GatorLAN, a signature in-person gaming event for the greater North/Central Florida community. We were tasked with redesigning their website, which should act as a recruitment tool as well as provide continuous info for existing members.</p>
              <img src={getGraphic("timeline")} className="hidden sm:block" alt="Project timeline showing key milestones" />
            </div>
          </div>
          <img src={getGraphic("timeline")} className="sm:hidden -mt-2" alt="Project timeline showing key milestones" />
        </div>
      </section>
      <section id="PROBLEM" className="scroll-mt-15" ref={el => {
        projectTwoElementsRef.current[1] = el;
        problemRef.current = el;
      }}>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7">
          <div className='flex flex-col gap-2 2xl:gap-3'>
            <p className="mt-8 lg:mt-14 2xl:mt-20 text-xs sm:text-sm">PROBLEM</p>
            <p className="font-serif sm:text-xl lg:text-2xl xl:text-3xl xl:w-[70%] 2xl:w-[70%]">How might we communicate value to prospective members while serving as a central hub for existing ones? How can we memorably distinguish ourselves from others?</p>
          </div>
          <img src="/problem_image.jpg" className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Image showing final mobile prototypes" />
          <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">The University of Florida is home to over 1,000 student organizations, each with their own story, mission, and community.  Yet despite this abundance, students struggle to find clubs that reflect their interests due to outdated online information, a lack of clear digital presence, and poor branding. Understanding that this was the difference between a club being discovered or overlooked was fundamental to our process.</p>
        </div>
      </section>
      <section id="RESEARCH" className="scroll-mt-15" ref={el => {
        projectTwoElementsRef.current[3] = el;
        researchRef.current = el;
      }}>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7" >
          <div className="flex flex-col gap-2 2xl:gap-3">
            <p className=" mt-8 lg:mt-14 2xl:mt-20 text-xs sm:text-sm">RESEARCH</p>
            <p className=" font-serif sm:text-xl lg:text-2xl xl:text-3xl xl:w-[70%] 2xl:w-[70%]">Understanding what our product would be used for, who it will serve, and the opportunities it may bring for the club.</p>
          </div>
          <div className="flex flex-col gap-6 2xl:gap-8">
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">After interviewing club executives and understanding what their priorities and expectations are for a website redesign, each group member created a user persona. Together, we identified 4 key user groups that our redesign needed to support.</p>
            <img src={getGraphic("key_users")} className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Four key user personas for Gator Gaming website" />
            <p className=" font-serif mt-2 2xl:mt-4 sm:text-xl lg:text-2xl xl:text-3xl xl:w-[80%] 2xl:w-[70%]">Next, we defined what constitutes a successful design in our case.</p>
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">First, we quickly wrote down ways the current website fails to deliver on the goals of our key user groups. </p>
            <img src={getGraphic("notes")} className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Research notes on current website failures" />
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">Next, we evaluated the websites of comparable clubs using the opportunities identified in our original site analysis as criteria. This helped us find gaps that could guide our strategy in the redesign.</p>
            <img src={getGraphic("comp_analysis")} className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Competitive analysis of similar club websites" />
            <img src={getGraphic("gaps")} className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Identified gaps and opportunities in competitive analysis" />
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">We then surveyed existing members to better understand the role the website should play for Gator Gaming and to learn from their joining experience and sustained membership. From the results, we identified three major insights that would shape our design for prospective members.</p>
            <div className='flex justify-center xl:w-[80%] 2xl:w-[70%]'>
              <img src={getGraphic("survey_insights")} className="xl:w-[85%] 2xl:w-[80%] h-auto" alt="Three major insights from member survey results" />
            </div>
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">Finally, compiling all of our research, we created a list of 3 core goals, each with actionable objectives for our redesign.</p>
            <div className='flex justify-center xl:w-[80%] 2xl:w-[70%]'>
              <img src={getGraphic("requirements")} className="xl:w-[90%] 2xl:w-[80%] h-auto" alt="Three core goals with actionable objectives for redesign" />
            </div>
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">Considering these objectives and expectations established during our initial meeting with club executives, we determined that the most straightforward layout consisted of five pages: Home, About, Team, Events, and Gallery.</p>
          </div>
        </div>
      </section>
      <section id="DESIGN" className="scroll-mt-15" ref={el => {
        projectTwoElementsRef.current[4] = el;
        designRef.current = el;
      }}>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7">
          <div className='flex flex-col gap-2 2xl:gap-3'>
            <p className=" mt-8 lg:mt-14 2xl:mt-20 text-xs sm:text-sm">DESIGN</p>
            <p className="font-serif sm:text-xl lg:text-2xl xl:text-3xl xl:w-[80%] 2xl:w-[70%]">Finding frictionless ways for users to get to what they need.</p>
          </div>
          <div className="flex flex-col gap-6 2xl:gap-8">
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">Once the site's layout was defined, the next step was to find the best way of organizing content to meet the objectives in a way users would understand. After analyzing sites from our competitive analysis and elsewhere, we created a conceptual sitemap.</p>
            <div className="flex justify-center xl:w-[80%] 2xl:w-[70%]">
              <img src={getGraphic("sitemap")} className="xl:w-[90%] 2xl:w-[70%] h-auto" alt="Conceptual sitemap for Gator Gaming website" />
            </div>
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">We then tested our initial user personas against the sitemap, ensuring that each one of their goals could be achieved intuitively and quickly using this structure.</p>
            <img src={getGraphic("user_persona_analysis")} className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="User persona analysis against sitemap structure" />
            <p className="font-serif sm:text-xl lg:text-2xl xl:text-3xl xl:w-[80%] 2xl:w-[70%]">Validating our high-fidelity designs with defined requirements.</p>
            <p className=" font-sans text-xs xl:w-[80%] 2xl:w-[70%] md:text-base lg:text-lg">Informed by the sitemap and defined requirements, each team member initially explored different layout and design approaches. These were then progressively refined into a cohesive design system, which informed the final high-fidelity prototype.</p>
            <img src={getGraphic("hifis")} className="xl:w-[70%] 2xl:w-[65%] h-auto" alt="High-fidelity design prototypes for Gator Gaming website" />
          </div>
        </div>
      </section>
      <section id="REFLECTION" className="scroll-mt-15" ref={el => {
        projectTwoElementsRef.current[5] = el;
        handoffRef.current = el;
      }}>
        <div className="flex flex-col gap-3 md:gap-5 2xl:gap-7">
          <p className="mt-8 lg:mt-14 2xl:mt-20 text-xs sm:text-sm">REFLECTION</p>
          <div className="flex flex-col gap-6 2xl:gap-8">
            <img src={getGraphic("reflections")} className="xl:w-[80%] 2xl:w-[70%] h-auto" alt="Individual reflections"/>
            <img src={getGraphic("group_reflections")} className="xl:w-[75%] 2xl:w-[65%] h-auto" alt="Group reflections"/>
          </div>
        </div>
      </section>
    </div>
  </>
  )
}

export default GGProject;