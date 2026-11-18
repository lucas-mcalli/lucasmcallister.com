import { ArrowRight } from 'lucide-react';

// Temporary stand-in for images/videos until real assets are uploaded.
// Swap each <Placeholder /> for an <img> or <video> pointing at
// https://cdn.lucasmcallister.com/helpity/<file>.
function Placeholder({ label, className = '', aspect = 'aspect-video' }) {
  return (
    <div className={`${aspect} w-full rounded bg-neutral-200 dark:bg-zinc-800 border border-dashed border-neutral-400 dark:border-zinc-600 flex items-center justify-center ${className}`}>
      <span className='text-xs lg:text-sm text-gray-500 font-departure uppercase tracking-wide text-center px-4'>{label}</span>
    </div>
  );
}

function NumberBadge({ n }) {
  return (
    <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">{n}</div>
  );
}

export default function HelpityProject() {

  return (
    <div className='w-full mx-auto text-pretty [&_h3]:text-balance [&_h4]:text-balance'>
    <section className='flex flex-col gap-8 lg:gap-16 scroll-mt-25 lg:scroll-mt-15'>
      <img src="https://cdn.lucasmcallister.com/helpity/helpity_wordmark.png" className="block w-full h-auto" alt="Helpity wordmark" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Problem</h2>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>Academic coding platforms are centered on asynchronous & solitary work, limiting collaboration, academic integrity, and instructor guidance.</h3>
          <p className='font-sans text-sm lg:text-base text-gray-500 w-full 2xl:max-w-[80%] text-balance'>
            Platforms like Codio and zyBooks center on self-paced, asynchronous assignments, even though industry work is collaborative, built on pair programming, code review, and shared codebases.</p>
          <p className='font-sans text-sm lg:text-base text-gray-500 w-full 2xl:max-w-[80%] text-balance'>
            Meanwhile, instructors who want to guide students through code live often fall back on screen-sharing from an individual text editor, which lets students watch but gives them no way to take part or get help in the moment.</p>
        </div>
      </div>
      <div className='w-full flex gap-6 lg:gap-12 xl:gap-24 justify-center py-5'>
        <Placeholder label='Example 1' aspect='aspect-[9/19]' className='max-w-40 md:max-w-60 xl:max-w-72' />
        <Placeholder label='Example 2' aspect='aspect-[9/19]' className='max-w-40 md:max-w-60 xl:max-w-72' />
        <Placeholder label='Example 3' aspect='aspect-[9/19]' className='hidden md:flex max-w-60 xl:max-w-72' />
      </div>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Solution</h2>
        <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full 2xl:w-270 text-wrap'>Live teaching & individual practice with AI assistance built for the classroom.</h3>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 lg:gap-8 w-full mx-auto items-start'>
        <div className='flex flex-col items-start gap-2'>
          <Placeholder label='Feature 1 video' />
          <p className='font-semibold text-xs lg:text-sm w-full'>
            Feature 1
          </p>
          <p className='text-xs lg:text-sm text-gray-500 w-full -mt-2'>
            Short feature description
          </p>
        </div>
        <Placeholder label='Feature 1 image' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 lg:gap-8 w-full mx-auto items-start lg:-mt-10'>
        <Placeholder label='Feature 2 image' />
        <div className='flex flex-col items-start gap-2'>
          <Placeholder label='Feature 2 video' />
          <p className='font-semibold text-xs lg:text-sm w-full'>
            Feature 2
          </p>
          <p className='text-xs lg:text-sm text-gray-500 w-full -mt-2'>
            Short feature description
          </p>
        </div>
      </div>
      <div className='flex flex-col items-start gap-2'>
        <Placeholder label='Feature 3 graphic' aspect='aspect-[16/6]' className='lg:-mt-10' />
        <p className='font-semibold text-xs lg:text-sm w-full'>
          Feature 3
        </p>
        <p className='text-xs lg:text-sm text-gray-500 w-full -mt-2'>
          Short feature description
        </p>
      </div>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Research</h2>
        <div className='flex flex-col w-full min-w-0 2xl:max-w-[90%]'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Research headline goes here...</h3>
          <div className='researchList flex flex-col gap-15 mt-10 lg:mt-15'>
            <div className='researchGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <NumberBadge n={1} />
                <h4 className='text-lg xl:text-xl w-full'>Research method 1</h4>
              </div>
              {['Insight 1', 'Insight 2', 'Insight 3'].map(title => (
                <div key={title} className="w-full xl:max-w-[65rem] bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col gap-2">
                  <h5 className="font-semibold text-sm lg:text-base">{title}</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-300">Supporting data and what it means for the design.</p>
                </div>
              ))}
            </div>
            <div className='researchGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <NumberBadge n={2} />
                <h4 className='text-lg xl:text-xl w-full'>User personas</h4>
              </div>
              <div className='personas flex flex-col gap-8 mt-3'>
                {['Persona 1', 'Persona 2', 'Persona 3'].map(name => (
                  <div key={name} className='flex gap-4 items-start'>
                    <div className='lg:w-20 lg:h-20 w-16 h-16 shrink-0 rounded-full bg-neutral-200 dark:bg-zinc-800 border border-dashed border-neutral-400 dark:border-zinc-600' />
                    <div className='flex flex-col gap-1'>
                      <p className='font-semibold text-xs lg:text-sm'>{name}</p>
                      <p className='text-sm text-gray-500 w-full md:w-[80%] 2xl:w-[55%]'>Who this persona is and how their needs shaped the design.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className='flex gap-4 items-center'>
              <NumberBadge n={3} />
              <h4 className='text-lg xl:text-xl w-full'>Research method 3</h4>
            </div>
            <Placeholder label='User flows graphic' className='lg:w-[80%] 2xl:w-[60%] -mt-8' />
          </div>
        </div>
      </div>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <section className='w-full flex flex-col gap-4 lg:gap-8 xl:gap-12'>
        <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-28 md:gap-36 lg:gap-54 2xl:gap-66 justify-between lg:justify-start w-full'>
          <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Process</h2>
          <div className='flex flex-col w-full min-w-0 2xl:max-w-[68rem]'>
            <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Process headline goes here.</h3>
            <div className='flex gap-4 w-full'>
              <ArrowRight className='mt-3 shrink-0 text-gray-500' size={30} strokeWidth={1.5} />
              <p className='font-sans text-sm lg:text-base text-gray-500 mt-3.5 2xl:w-[85%]'>Process intro paragraph.</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='subsectionList flex flex-col gap-12 mt-10 lg:mt-15 w-full'>
            {[1, 2, 3].map(n => (
              <div key={n} className='listItemGroup flex flex-col gap-5'>
                <div className='flex gap-4 items-center'>
                  <NumberBadge n={n} />
                  <h4 className='text-lg xl:text-xl w-full'>Iteration {n}</h4>
                </div>
                <Placeholder label={`Iteration ${n} progression graphic`} aspect='aspect-[16/6]' />
                <p className='text-sm lg:text-base text-gray-500 w-full'>Describe what changed between iterations and why.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
        <section className='w-full flex flex-col gap-4 lg:gap-8 xl:gap-12'>
          <div className='subsectionContainer flex flex-col sm:flex-row lg:gap-24 xl:gap-28 2xl:gap-35 justify-between lg:justify-start w-full'>
            <h2 className='text-2xl w-70 xl:w-80 font-otto xl:text-4xl font-semibold tracking-tighter'>Visual Design</h2>
          </div>
          <div className='subsectionList flex flex-col gap-12 mt-8 lg:mt-15 w-full'>
            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <NumberBadge n={1} />
                <h4 className='text-lg xl:text-xl w-full'>Design system</h4>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
                <Placeholder label='Design system graphic' />
                <Placeholder label='Components graphic' />
              </div>
              <p className='text-sm lg:text-base text-gray-500 w-full'>Describe the design system.</p>
            </div>
            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <NumberBadge n={2} />
                <h4 className='text-lg xl:text-xl w-full'>Details</h4>
              </div>
              <div className='flex flex-col gap-4 w-full'>
                <Placeholder label='Details video' />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <Placeholder label='Detail 1' />
                  <Placeholder label='Detail 2' />
                </div>
                <Placeholder label='Mockup graphic' aspect='aspect-[16/7]' />
              </div>
            </div>
          </div>
        </section>
        <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
        <section className='w-full flex flex-col gap-8 xl:gap-12 mb-30'>
          <div className='subsectionContainer flex flex-col sm:flex-row lg:gap-24 xl:gap-28 2xl:gap-35 justify-between lg:justify-start w-full'>
            <h2 className='text-2xl w-70 xl:w-80 font-otto xl:text-4xl font-semibold tracking-tighter'>Reflections</h2>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 mx-auto gap-10 xl:gap-30 w-full'>
            {[1, 2].map(n => (
              <div key={n} className='reflections flex flex-col gap-4 md:gap-5'>
                <div className='flex gap-4 items-center'>
                  <NumberBadge n={n} />
                  <h4 className='text-lg xl:text-xl w-full'>Reflection {n}</h4>
                </div>
                <p className='text-sm lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>Reflection paragraph.</p>
              </div>
            ))}
          </div>
        </section>
        <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
    </section>
  </div>
  )
}
