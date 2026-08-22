
export default function TrajectoryProject({getGraphic}) {

  return (
    <div className='w-full mx-auto'>
    <section className='flex flex-col gap-8 lg:gap-16 scroll-mt-30 md:scroll-mt-40'>
      <div className='subsectionContainer w-[90%] flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-center'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Problem</h2>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>You can book a flight in five minutes. Finding out if your trip actually holds together takes a lot longer.</h3>
          <p className='font-sans text-xs lg:text-base text-gray-500 w-full 2xl:max-w-[90%]'>
            In a world where a multi-leg trip consists of flights from many different airlines, hotels booked on different apps, and the possibility for an infinite number of other intermediaries like daytrips, train tickets, etc, it is easy to quickly become overwhelmed when trying to assemble a plan for it all.</p>
          <p className='font-sans text-xs lg:text-base text-gray-500 w-full 2xl:max-w-[90%]'>
            Existing tools tend to work against the user rather than for them: calendars that don't clearly visualize how trip legs fit in with each other and don’t communicate long gaps, or at the low-tech extreme, some revert back to a stack of confirmation printouts stapled together.</p>
        </div>
      </div>
      <div className='grid grid-cols-10 gap-2 md:gap-4 lg:gap-6 w-full items-start'>
        <figure className="col-span-7 flex flex-col gap-2">
          <img
            src="https://cdn.lucasmcallister.com/photos/calendar_example.png" 
            className="w-full h-auto object-contain" 
            alt="Crowded calendar that doesn't inform users on gaps" 
          />
          <figcaption className="text-xs lg:text-sm text-gray-500">
            For example, this calendar doesn't alert you that there's a 3-hour gap between your flight to Paris and the apartment check-in.
          </figcaption>
        </figure>

        <img 
          src="https://cdn.lucasmcallister.com/photos/paper_planning.webp" 
          className="col-span-3 w-full h-auto object-contain" 
          alt="Stacked papers with a scribbled itinerary" 
        />
      </div>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Solution</h2>
        <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full 2xl:max-w-[90%]'>See what you missed. See what belongs together.</h3>
      </div>
      <div className='grid grid-cols-2 gap-2 md:gap-4 lg:gap-8 w-full mx-auto items-start'>
        <div className='flex flex-col items-start gap-2'>
          <video src='https://cdn.lucasmcallister.com/videos/log_scale_video.mp4' className='block w-full h-auto' autoPlay muted loop playsInline alt='Timeline gap visualization using logarithmic spacing'/>
          <p className='font-semibold text-xs lg:text-sm w-full'>
            Automatic Gap Generation
          </p>
          <p className='text-xs lg:text-sm text-gray-500 w-full -mt-2'>
            Using a logarithmic scale that visualizes actionable gaps while preventing layout blowout
          </p>
        </div>
        <video src='https://cdn.lucasmcallister.com/videos/gap_ui.mp4' className='block w-full h-auto' autoPlay muted loop playsInline alt='Trajectory timeline showing generated gaps between travel events'/>
      </div>
      <div className='grid grid-cols-2 gap-2 md:gap-4 lg:gap-8 w-full mx-auto items-start lg:-mt-10'>
        <img src='https://cdn.lucasmcallister.com/photos/grouping_graphic.avif' className='block w-full h-auto' alt='Event grouping concept graphic for one trip leg'
        />
        <div className='flex flex-col items-start gap-2'>
          <video src='https://cdn.lucasmcallister.com/videos/grouping_live.mp4' className='block w-full h-auto' autoPlay muted loop playsInline alt='Live demo of grouped events in the timeline'/>
          <p className='font-semibold text-xs lg:text-sm w-full'>
            Event Grouping
          </p>
          <p className='text-xs lg:text-sm text-gray-500 w-full -mt-2'>
            Know which events belong together at a glance
          </p>
        </div>
      </div>
      <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Research</h2>
        <div className='flex flex-col w-full min-w-0 2xl:max-w-[90%]'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Identifying the problem and researching user travel behavior...</h3>
          <div className='researchList flex flex-col gap-15 mt-10 lg:mt-15'>
            <div className='researchGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>Desk research & observation</h4>
              </div>
              <div className="w-full xl:max-w-[65rem] bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-3 flex flex-col gap-2">
                <h5 className="font-semibold text-sm lg:text-base">The inspiration</h5>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-300">The catalyst for this project came from my own observations of how my family plans and keeps records of trip information and structure. I noticed that planning and organizing a trip often consisted of dozens of scrambled browser tabs, handwritten notes, and once everything was sorted, an unwieldy and clunky sttack of papers with reservations, check in information, flight boarding passes, train tickets, and everything in between.</p>
              </div>
              <div className="w-full xl:max-w-[65rem] bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col gap-2">
                <h5 className="font-semibold text-sm lg:text-base">The intrinsic nature of unplanned gaps</h5>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-300">Tourism research has shown that travelers do not often plan and rigidly execute on an itinerary, and increasingly with the nature of constant internet access do travelers evaluate and change their plans continually. Emphasizing gaps in a user's trip worked to capture these moments of spontaneity and make them part of the planning experience while also reducing unwanted gaps by surfacing them, like those resulting from late check-ins.</p>
                <h5 className=" mt-2 font-semibold text-xs lg:text-sm">[Mieli, 2024]</h5>
              </div>
              <div className="w-full xl:max-w-[65rem] bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col gap-2">
                <h5 className="font-semibold text-sm lg:text-base">Information overload</h5>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-300">Research on booking behavior shows that information overload is common and is significantly shaped by the presentation of information, so it was important for my design to present information using low-effort visual cues that rely on instinct (like shorter stays being visually smaller on the timeline) to avoid information overload when planning/assembling a trip.</p>
                <h5 className=" mt-2 font-semibold text-xs lg:text-sm">[Yin & Hwang, 2024]</h5>
              </div>
            </div>
            <div className='researchGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
                <h4 className='text-lg xl:text-xl w-full'>Defining primary use cases for the extension</h4>
              </div>
              <img src={getGraphic("situations")} className='w-full lg:w-[80%] 2xl:w-[75%] h-auto' alt='The two use cases for Trajectory: planning trips, and executing them' />
            </div>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">3</div>
              <h4 className='text-lg xl:text-xl w-full'>Where existing tools fail</h4>
            </div>
            <img src={getGraphic("differentiation")} className='w-full lg:w-[80%] 2xl:w-[75%] h-auto -mt-8' alt='User flow diagrams for each persona' />
          </div>
        </div>
      </div>
      <section className='w-full flex flex-col gap-4 lg:gap-8 xl:gap-12'>
        <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
        <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-28 md:gap-36 lg:gap-54 2xl:gap-66 justify-between lg:justify-start w-full'>
          <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Process</h2>
          <div className='flex flex-col w-full min-w-0 2xl:max-w-[90%]'>
            <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Refining the design to meet defined user goals.</h3>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='subsectionList flex flex-col gap-12 mt-10 lg:mt-15 w-full'>

            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>Chrome extension format</h4>
              </div>
              <video src='https://cdn.lucasmcallister.com/videos/extension_format_animation.mp4' className='block  w-full xl:w-[90%] h-auto shadow-xl' autoPlay muted loop playsInline alt='Chrome extension format demonstration for Trajectory'/>
              <p className='text-xs lg:text-base text-gray-500 w-full xl:w-[90%]'>One of the clearest pain points established in travel decision making research is information overload, which, in this case, manifests as comparing stay/flight options across dozens of browser tabs before committing. Ensuring that Trajectory worked against this stress meant that it couldn't live in a separate app the user has to context-switch to; it needed to be present in the browser itself, accessible without disrupting the user's current action. That requirement led to the Chrome extension format. </p>
            </div>

            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
                <h4 className='text-lg xl:text-xl w-full'>Timeline elements</h4>
              </div>
              <img src='https://cdn.lucasmcallister.com/photos/trajectory_components.avif' className='block w-full xl:w-[90%] h-auto rounded' alt='Trajectory timeline component system graphic' />
              <p className='text-xs lg:text-base text-gray-500 w-full xl:w-[90%]'>To ensure the design holds up with load, each component had to be easily recognizable. Rather than relying on text labels, each event type carries its own icon. Stay events go further, using a destination splash image and a linear scale by number of nights to make each leg of a user's journey visually distinct. The result is a timeline that communicates dense travel plans with clarity and without ambiguity.</p>
            </div>

            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">3</div>
                <h4 className='text-lg xl:text-xl w-full'>AI Autofill</h4>
              </div>
              <video src='https://cdn.lucasmcallister.com/videos/autofill_vid.mp4' className='block w-full xl:w-[90%] h-auto [clip-path:inset(0px_0px_166px_0px)] mb-[-166px]' autoPlay muted loop playsInline alt='AI Autofill demonstration' />

              <p className='text-xs lg:text-base text-gray-500 w-full xl:w-[90%]'>Manual entry proved to be a significant barrier to using the extension to plan trips. Adding a single flight or stay out of the dozens a user was deciding from meant filling out a form with details that already had to be on the browser tab the user opened the extension from. For a large and complex trip, this becomes exactly the kind of tedious and error-prone process that Trajectory sought to eliminate. AI Autofill was built directly in response, using a content script that calls Gemini and returns a structured JSON matching the form schema for flights and stays, bringing down form entry from 20+ seconds to less than 5.</p>
            </div>
          </div>
        </div>
      </section>
        <section className='w-full flex flex-col gap-8 xl:gap-12 mb-30'>
          <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
          <div className='subsectionContainer flex flex-col sm:flex-row lg:gap-24 xl:gap-28 2xl:gap-35 justify-between lg:justify-start w-full'>
            <h2 className='text-2xl w-70 xl:w-80 font-otto xl:text-4xl font-semibold tracking-tighter'>Reflections</h2>
          </div>
          <div className='flex flex-col w-full gap-6 lg:gap-16 xl:gap-24'>
            <div className='grid grid-cols-1 lg:grid-cols-2 mx-auto gap-8'>
              <div className='listItemGroup flex flex-col gap-5'>
                <div className='flex gap-4 items-center'>
                  <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
                  <h4 className='text-lg xl:text-xl w-full'>Next steps: App format</h4>
                </div>
                <img src='https://cdn.lucasmcallister.com/photos/mobile_mock.avif' className='block w-full h-auto rounded' alt='Trajectory mobile app mockup' />
                <p className='text-xs lg:text-base text-gray-500 w-full'>To best serve users using Trajectory to execute on already built plans, the most natural next step would be to extend the infrastructure to a native mobile app format. Beyond giving users access to their timelines and important trip links on the fly, a mobile app enables real time utility like sending push notifications for upcoming departures or sending time-sensitive live activities for executing on stacked travel days.</p>
              </div>
              <div className='reflections flex flex-col gap-4 md:gap-5'>
                <div className='flex gap-4 items-center'>
                  <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
                  <h4 className='text-lg xl:text-xl w-full'>Next steps: Budgeting expansion</h4>
                </div>
                <img src='https://cdn.lucasmcallister.com/photos/budgeting_image.avif' className='block w-full h-auto rounded' alt='Trajectory budgeting graphic based on trip legs' />
                <p className='text-xs lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>A natural extension to future development is budgeting. Since the content script that the autofill pipeline uses already parses price information from pages it uses to extract place and date data, implementing cost data would require no new technical capability. And since prices can be attributed to each user event this way, they could be surfaced as color coded chart representing each trip leg in addition to a simple running count.</p>
              </div>
            </div>
            <div className='reflections flex flex-col gap-4 md:gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">3</div>
                <h4 className='text-lg xl:text-xl w-full'>Working within the user's context</h4>
              </div>
              <p className='text-xs lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>This project taught me that good design meets users where they already are. While observing how friends and family planned trips, I noticed how often the "solution" was whatever was closest at hand in the moment: a pen and paper, a half-used note on a phone, or a browser tab left open as a placeholder. None of these were chosen because they were optimal for the situation, but because they were the first instinct. That observation brought upon the central trade-off of the project: the Chrome extension format. It came with real constraints: limited screen space, no ability to click off the extension without closing it, and limited development resources. Even so, it meant the tool lived in the exact context where trip planning actually happens, allowing the user's instinct to shift from the pen or a blank note to the extension that is equally always present on their screen.</p>
            </div>
          </div>
        </section>
        <hr className="DIVIDER w-full border-0 border-t border-neutral-200 dark:border-zinc-800 my-6 sm:my-8 md:my-12 lg:my-16" />
    </section>
  </div>
  )
}
