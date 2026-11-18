
export default function GGProject({getGraphic}) {

  return (
    <div className='w-full mx-auto text-pretty [&_h3]:text-balance [&_h4]:text-balance'>
    <section className='flex flex-col gap-8 lg:gap-16 scroll-mt-30 md:scroll-mt-40'>
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Context</h2>
        <div className='flex flex-col gap-8 lg:gap-12 w-full min-w-0'>
          <div className='flex flex-col-reverse md:flex-row gap-6 md:gap-16 xl:gap-24 2xl:gap-32 items-start md:items-center'>
            <div className='flex flex-col gap-4 min-w-0 md:max-w-[70%] 2xl:max-w-[60%]'>
              <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>This project was completed as part of a Gator User Design initiative to give members experience in research-driven design serving other on-campus organizations.</h3>
              <p className='font-sans text-sm lg:text-base text-gray-500 w-full'>
                Gator Gaming is a student org at UF founded in 2010 focused on building community through video games. They host tournaments, social events, and GatorLAN, a signature in-person gaming event for the greater North/Central Florida community. We were tasked with redesigning their website, which should act as a recruitment tool as well as provide continuous info for existing members.</p>
            </div>
            <div className='hidden md:flex flex-col items-center gap-2 shrink-0'>
              <img src="https://cdn.lucasmcallister.com/gator-gaming/gator_user_design_logo.jpeg" className='w-20 h-20 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32 rounded-full object-cover' alt="Gator User Design logo" />
              <p className='font-semibold text-xs lg:text-sm whitespace-nowrap'>6 team members</p>
            </div>
          </div>
          <img src={getGraphic("timeline")} className="w-full h-auto" alt="Project timeline showing key milestones" />
        </div>
      </div>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Problem</h2>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>How might we communicate value to prospective members while serving as a central hub for existing ones? How can we memorably distinguish ourselves from others?</h3>
          <p className='font-sans text-sm lg:text-base text-gray-500 w-full 2xl:max-w-[80%]'>
            The University of Florida is home to over 1,000 student organizations, each with their own story, mission, and community. Yet despite this abundance, students struggle to find clubs that reflect their interests due to outdated online information, a lack of clear digital presence, and poor branding. Understanding that this was the difference between a club being discovered or overlooked was fundamental to our process.</p>
        </div>
      </div>
      <img src="https://cdn.lucasmcallister.com/gator-gaming/problem_image.webp" className="block w-full h-auto" alt="Image showing final mobile prototypes" />
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Research</h2>
        <div className='flex flex-col w-full min-w-0 2xl:max-w-[50%]'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Understanding what our product would be used for, who it will serve, and the opportunities it may bring to the club.</h3>
        </div>
      </div>
      <div className='researchList flex flex-col gap-16 lg:gap-24 w-full'>

            <div className='researchGroup flex flex-col gap-6 lg:gap-10'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>Identifying key user groups</h4>
              </div>
              <img src={getGraphic("key_users")} className="w-full h-auto" alt="Four key user personas for Gator Gaming website" />
            </div>

            <div className='researchGroup flex flex-col gap-6 lg:gap-10'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">2</div>
                <h4 className='text-lg xl:text-xl w-full'>Defining what constitutes a successful design</h4>
              </div>
              <p className='text-sm lg:text-base text-gray-500 w-full xl:w-[90%]'>First, we quickly wrote down ways the current website fails to deliver on the goals of our key user groups.</p>
              <img src={getGraphic("notes")} className="w-full h-auto" alt="Research notes on current website failures" />
            </div>

            <div className='researchGroup flex flex-col gap-6 lg:gap-10'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">3</div>
                <h4 className='text-lg xl:text-xl w-full'>Competitive analysis</h4>
              </div>
              <img src={getGraphic("comp_analysis")} className="w-full h-auto" alt="Competitive analysis of similar club websites" />
              <img src={getGraphic("gaps")} className="w-full h-auto" alt="Identified gaps and opportunities in competitive analysis" />
            </div>

            <div className='researchGroup flex flex-col gap-6 lg:gap-10'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">4</div>
                <h4 className='text-lg xl:text-xl w-full'>Member survey</h4>
              </div>
              <p className='text-sm lg:text-base text-gray-500 w-full xl:w-[90%]'>We then surveyed existing members to better understand the role the website should play for Gator Gaming and to learn from their joining experience and sustained membership. From the results, we identified three major insights that would shape our design for prospective members.</p>
              <img src={getGraphic("survey_insights")} className="w-full lg:w-[85%] mx-auto h-auto" alt="Three major insights from member survey results" />
            </div>

            <div className='researchGroup flex flex-col gap-6 lg:gap-10'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">5</div>
                <h4 className='text-lg xl:text-xl w-full'>Core goals</h4>
              </div>
              <img src={getGraphic("requirements")} className="w-full lg:w-[90%] mx-auto h-auto" alt="Three core goals with actionable objectives for redesign" />
            </div>
      </div>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <section className='w-full flex flex-col gap-4 lg:gap-8 xl:gap-12'>
        <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-28 md:gap-36 lg:gap-54 2xl:gap-66 justify-between lg:justify-start w-full'>
          <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Design</h2>
          <div className='flex flex-col w-full min-w-0 2xl:max-w-[68rem]'>
            <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Finding frictionless ways for users to get to what they need.</h3>
          </div>
        </div>
        <div className='subsectionList flex flex-col gap-16 lg:gap-20 mt-10 lg:mt-15 w-full'>

          <div className='listItemGroup flex flex-col gap-6 lg:gap-10'>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">1</div>
              <h4 className='text-lg xl:text-xl w-full'>Conceptual sitemap</h4>
            </div>
            <p className='text-sm lg:text-base text-gray-500 w-full xl:w-[90%]'>Once the site's layout was defined, the next step was to find the best way of organizing content to meet the objectives in a way users would understand. After analyzing sites from our competitive analysis and elsewhere, we created a conceptual sitemap.</p>
            <img src={getGraphic("sitemap")} className="w-full lg:w-[85%] mx-auto h-auto" alt="Conceptual sitemap for Gator Gaming website" />
          </div>

          <div className='listItemGroup flex flex-col gap-6 lg:gap-10'>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">2</div>
              <h4 className='text-lg xl:text-xl w-full'>Testing personas against the sitemap</h4>
            </div>
            <p className='text-sm lg:text-base text-gray-500 w-full xl:w-[90%]'>We then tested our initial user personas against the sitemap, ensuring that each one of their goals could be achieved intuitively and quickly using this structure.</p>
            <img src={getGraphic("user_persona_analysis")} className="w-full h-auto" alt="User persona analysis against sitemap structure" />
          </div>

          <div className='listItemGroup flex flex-col gap-6 lg:gap-10'>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">3</div>
              <h4 className='text-lg xl:text-xl w-full'>Validating high-fidelity designs with defined requirements</h4>
            </div>
            <p className='text-sm lg:text-base text-gray-500 w-full xl:w-[90%]'>Informed by the sitemap and defined requirements, each team member initially explored different layout and design approaches. These were then progressively refined into a cohesive design system, which informed the final high-fidelity prototype.</p>
            <img src={getGraphic("hifis")} className="w-full h-auto" alt="High-fidelity design prototypes for Gator Gaming website" />
          </div>
        </div>
      </section>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <section className='w-full flex flex-col gap-8 xl:gap-12 mb-30'>
        <div className='subsectionContainer flex flex-col sm:flex-row lg:gap-24 xl:gap-28 2xl:gap-35 justify-between lg:justify-start w-full'>
          <h2 className='text-2xl w-70 xl:w-80 font-otto xl:text-4xl font-semibold tracking-tighter'>Reflections</h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-x-30 xl:gap-y-16'>
            <div className='reflections flex flex-col gap-4 md:gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>Production feasibility &amp; ease of maintenance</h4>
              </div>
              <p className='text-sm lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>With initial ideas like an interactive 3D controller model, a clock counting down to the next GatorLAN, a timeline of the club’s history, and more, we quickly realized in our competitive analysis that overdone sites were often the Achilles’ heel of otherwise successful clubs, since their content would frequently break due to a lack of maintenance.</p>
            </div>
            <div className='reflections flex flex-col gap-4 md:gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-orange-500 flex items-center justify-center font-semibold text-lg">2</div>
                <h4 className='text-lg xl:text-xl w-full'>Designing for instant appeal</h4>
              </div>
              <p className='text-sm lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>At the forefront of our work was the understanding that users often visit the site to quickly decide whether Gator Gaming is worth their time. This made it essential to communicate value immediately and use a sitemap to define clear, low-friction paths to the information and actions users cared about most.</p>
            </div>
        </div>
      </section>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
    </section>
  </div>
  )
}
