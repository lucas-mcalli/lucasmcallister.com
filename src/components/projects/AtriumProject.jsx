
export default function AtriumProject({getGraphic}) {

  return (
    <div className='w-full mx-auto text-pretty [&_h3]:text-balance [&_h4]:text-balance'>
    <section className='flex flex-col gap-8 lg:gap-16 scroll-mt-30 md:scroll-mt-40'>
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Context</h2>
        <div className='flex flex-col-reverse md:flex-row gap-6 md:gap-16 xl:gap-24 2xl:gap-32 items-start md:items-center w-full min-w-0'>
        <div className='flex flex-col gap-4 min-w-0 md:max-w-[70%] 2xl:max-w-[60%]'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>This project was submitted to SwampHacks XI, the University of Florida’s flagship 36 hour hackathon.</h3>
          <p className='font-sans text-sm lg:text-base text-gray-500 w-full'>
            As a front-end developer and designer, my role was scoping the project around our time constraints, building a cohesive brand and visual identity, and designing and implementing screens with reusable components.</p>
          <p className='font-sans text-sm lg:text-base text-gray-500 w-full'>
            Built with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white transition-colors">Next.js</a> + <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white transition-colors">React</a>, <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white transition-colors">Tailwind</a>, <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white transition-colors">Supabase</a>, and hosted with <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white transition-colors">Vercel</a>.</p>
        </div>
        <div className='hidden md:flex flex-col items-center gap-2 shrink-0'>
          <img src="https://cdn.lucasmcallister.com/atrium/swamphacks_logo.jpg" className='w-20 h-20 lg:w-28 lg:h-28 2xl:w-32 2xl:h-32 rounded-full object-cover' alt="SwampHacks logo" />
          <div className='flex flex-col items-center'>
            <p className='font-semibold text-xs lg:text-sm whitespace-nowrap'>36 hours</p>
            <p className='font-semibold text-xs lg:text-sm whitespace-nowrap'>3 team members</p>
          </div>
        </div>
        </div>
      </div>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Problem</h2>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>How might we make club meeting attendance feel like the beginning of a relationship rather than a transaction, expanding the ways clubs and members meaningfully connect?</h3>
          <p className='font-sans text-sm lg:text-base text-gray-500 w-full 2xl:max-w-[80%]'>
            College students are pulled in more directions than ever: juggling classes, jobs, and a roster of clubs they care about. But between GroupMe chats, Google Drive folders, and QR codes flashed at GBMs, keeping up starts to become costly. There's no central place to track what orgs they're a part of, and meetings meant to bring them community end up demanding more attention and focus than they can spare.</p>
          <p className='font-sans text-sm lg:text-base text-gray-500 w-full 2xl:max-w-[80%]'>
            For club owners, there's often no reliable way to track who keeps showing up, no mechanism to reward committed members, and no easy way to present resources without interrupting the flow of a meeting. The result: a disconnect between the community they work tirelessly to build and the data that backs it.</p>
        </div>
      </div>
      <img src="https://cdn.lucasmcallister.com/atrium/atrium_demo.avif" className="block w-full h-auto" alt="Atrium desktop demo" />
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <section className='w-full flex flex-col gap-4 lg:gap-8 xl:gap-12'>
        <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-28 md:gap-36 lg:gap-54 2xl:gap-66 justify-between lg:justify-start w-full'>
          <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Process</h2>
          <div className='flex flex-col gap-4 w-full min-w-0 2xl:max-w-[68rem]'>
            <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Observing how clubs on campus currently track and incentivize attendance to define project scope.</h3>
            <p className='font-sans text-sm lg:text-base text-gray-500 w-full'>Since Atrium was conceptualized from observable issues in our community, it was easy to see where gaps existed in club membership systems and attendance tracking, namely in keeping a provable record of member activity and measuring participation event-by-event. Additionally, we found that many clubs successfully incentivized participation through point systems and other attendance based rewards.</p>
          </div>
        </div>
        <div className='subsectionList flex flex-col gap-16 lg:gap-20 mt-10 lg:mt-15 w-full'>

          <div className='listItemGroup flex flex-col gap-6 lg:gap-10'>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
              <h4 className='text-lg xl:text-xl w-full'>Scoping for a 36 hour timeline</h4>
            </div>
            <p className='text-sm lg:text-base text-gray-500 w-full xl:w-[90%]'>Knowing that time would be a huge source of pressure throughout, it was important to set my team up for success by scoping the project appropriately and creating a sitemap to clarify our workflow and desired outcomes for our MVP. For a 36 hour timeline, we prioritized three areas:</p>
            <img src={getGraphic("atrium_objectives")} className="w-full sm:w-[85%] lg:w-[70%] h-auto" alt="Three key objectives of Atrium's site" />
          </div>

          <div className='listItemGroup flex flex-col gap-6 lg:gap-10'>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
              <h4 className='text-lg xl:text-xl w-full'>Establishing visual identity from design to implementation</h4>
            </div>
            <p className='text-sm lg:text-base text-gray-500 w-full xl:w-[90%]'>With the clock running, visual identity had to be simple yet intentional. The goal was a modern and approachable design that suited both organizers and members, meaning a restrained color palette, clean typography, and components built for consistency and simplicity. Visually, the design needed to communicate professionalism, utility, and friendliness while feeling adjacent to apps students use every day.</p>
            <img src={getGraphic("atrium_brand")} className="w-full h-auto" alt="Atrium's core brand colors and typography" />
          </div>
        </div>
      </section>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Design</h2>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>Designed for connection and clarity.</h3>
          <p className='font-sans text-sm lg:text-base text-gray-500 w-full 2xl:max-w-[80%]'>
            The final screens are organized around the three priorities we scoped at the outset: account creation, org membership, and gamification. It was important to keep key interactions like joining an event simple and frictionless, ideal for a student quickly checking in. Additionally, working around the tight deadline led to a creative solution in conjoining the member and organizer view into one dashboard, presenting relevant resources by user type.</p>
        </div>
      </div>
      <img src="https://cdn.lucasmcallister.com/atrium/atrium_collection.webp" className="block w-full h-auto" alt="Final design screenshots" />
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <section className='w-full flex flex-col gap-8 xl:gap-12 mb-30'>
        <div className='subsectionContainer flex flex-col sm:flex-row lg:gap-24 xl:gap-28 2xl:gap-35 justify-between lg:justify-start w-full'>
          <h2 className='text-2xl w-70 xl:w-80 font-otto xl:text-4xl font-semibold tracking-tighter'>Reflections</h2>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-30'>
          <div className='reflections flex flex-col gap-4 md:gap-5'>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
              <h4 className='text-lg xl:text-xl w-full'>Navigating time constraints in a group setting</h4>
            </div>
            <p className='text-sm lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>In this project, I learned that taking time to visualize user flows and clearly scoping for specific functionality made it easier for us to be on the same page and understand each other's code. Creating a sitemap and documenting which features we needed in our MVP in specific detail allowed us to stay present on where we were relative to the finish line, which was hugely important given our limited time.</p>
          </div>
          <div className='reflections flex flex-col gap-4 md:gap-5'>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
              <h4 className='text-lg xl:text-xl w-full'>Understanding more than just your part is key</h4>
            </div>
            <p className='text-sm lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>As a front-end developer, I had previously underestimated the importance of understanding the database and backend functionality of a project, and this project changed that. I found that a lot of the principles of modularity and reusability that make React so powerful were deeply ingrained into Supabase, and understanding that made writing reusable frontend components feel much more natural.</p>
          </div>
        </div>
        <figure className='flex flex-col gap-2 w-full'>
          <img src="https://cdn.lucasmcallister.com/atrium/atrium_flick.webp" className="block w-full h-auto rounded" alt="Group photo" />
          <figcaption className='text-xs lg:text-sm text-gray-500'>
            A special thanks to my teammates <a href="https://www.linkedin.com/in/adrianestevezv/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white transition-colors">Adrian Estevez</a> and <a href="https://www.linkedin.com/in/mateomcallister/" target="_blank" rel="noopener noreferrer" className="underline hover:text-black dark:hover:text-white transition-colors">Mateo McAllister</a>.
          </figcaption>
        </figure>
      </section>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
    </section>
  </div>
  )
}
