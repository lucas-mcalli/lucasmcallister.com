import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { useProjectAnimation } from '../helpers/useProjectAnimation';
import Timeline from "./Timeline.jsx"

export default function CarullaProject({getGraphic, projectElementsRef, isExpanded}) {

  return (
    <div className='w-full xl:w-[90%] mx-auto'>
    <section className='flex flex-col gap-8 lg:gap-16 scroll-mt-25 lg:scroll-mt-15'>
      <img src="https://cdn.lucasmcallister.com/photos/carulla_cooking_mockup.webp" className="h-auto" alt="Image of cooking mockup" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Problem</h2>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>People put thought into what they eat. Their grocery app should too.</h3>
          <p className='font-sans text-xs lg:text-base text-gray-500 w-full 2xl:max-w-[90%]'>
            In a world where people are increasingly concerned about personal health, traditional grocery apps haven't made that easy to act on. Nutrition labels may be a tap away, but surfacing information doesn't make it useful. A nutrition label might tell you there are 18 grams of fat, but not how that might fit into your nutritional goals, or how it comes together in a meal worth making.</p>
          <p className='font-sans text-xs lg:text-base text-gray-500 w-full 2xl:max-w-[91%]'>
            For an experience depending on users who are willing to pay a premium for efficiency and convenience, this is an oversight. An app positioned as a luxury should be able to support users in making choices most aligned with their goals from the shelf to the table.</p>
        </div>
      </div>
      <div className='w-full flex gap-6 lg:gap-12 xl:gap-24 justify-center py-5'>
        <img src="https://cdn.lucasmcallister.com/photos/shipt_sample.webp" className="w-40 md:w-60 xl:w-72" alt="Shipt screenshot illustrating the current standard" />
        <img src="https://cdn.lucasmcallister.com/photos/gopuff_sample.webp" className=" w-40 md:w-60 xl:w-72" alt="Gopuff screenshot illustrating the current standard" />
        <img src="https://cdn.lucasmcallister.com/photos/instacart_sample.webp" className="hidden md:block w-50 md:w-60 xl:w-72" alt="Instacart screenshot illustrating the current standard" />
      </div>
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Solution</h2>
        <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full 2xl:max-w-[90%]'>Nutrition, understood. A score & breakdown that tells you what your food actually means, plus the recipes to actually make use of your choice.</h3>
      </div>
      <div className='grid grid-cols-2 gap-2 md:gap-4 lg:gap-8 w-full mx-auto items-start'>
        <div className='flex flex-col items-start gap-2'>
          <video src='https://cdn.lucasmcallister.com/videos/nutrition_breakdown_closeup.mp4' className='block w-full h-auto' autoPlay muted loop playsInline alt='Nutrition score and breakdown demonstration'/>
          <p className='font-semibold text-xs lg:text-sm w-full'>
            Nutrition Score & Breakdown
          </p>
          <p className='text-xs lg:text-sm text-gray-500 w-full -mt-2'>
            For a quick glance or a deeper dive on every product
          </p>
        </div>
        <img src='https://cdn.lucasmcallister.com/photos/items_sample.avif' className='block w-full h-auto' alt='Image of items with nutrition scores in cart'/>
      </div>
      <div className='grid grid-cols-2 gap-2 md:gap-4 lg:gap-8 w-full mx-auto items-start lg:-mt-10'>
        <img src='https://cdn.lucasmcallister.com/photos/suggested_recipes.avif' className='block w-full h-auto' alt='Image of suggested recipes'
        />
        <div className='flex flex-col items-start gap-2'>
          <video src='https://cdn.lucasmcallister.com/videos/Recipe.mp4' className='block w-full h-auto' autoPlay muted loop playsInline alt='Recipe page demonstration'/>
          <p className='font-semibold text-xs lg:text-sm w-full'>
            Recipes w/ Nutritional Context
          </p>
          <p className='text-xs lg:text-sm text-gray-500 w-full -mt-2'>
            Buying healthy is only half the equation
          </p>
        </div>
      </div>
      <div className='flex flex-col items-start gap-2'>
        <img src='https://cdn.lucasmcallister.com/photos/filters_graphic.avif' className='block w-full h-auto lg:-mt-10' alt='Image of items with nutrition scores in cart'/>
        <p className='font-semibold text-xs lg:text-sm w-full'>
          Filtering & Item Icons
        </p>
        <p className='text-xs lg:text-sm text-gray-500 w-full -mt-2'>
          Groceries that work for everyone's plate
        </p>
      </div>
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-60 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Research</h2>
        <div className='flex flex-col w-full 2xl:max-w-[90%]'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Researching the every day frictions and opportunities of grocery shopping...</h3>
          <div className='researchList flex flex-col gap-15 mt-10 lg:mt-15'>
            <div className='researchGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>General grocery experience survey</h4>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-3 flex flex-col gap-2">
                <h5 className="font-semibold text-sm lg:text-base">Users identify with nutritional goals & efficiency</h5>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-300">61% of respondants indicated that they identified with a nutritional goal or dietary restriction, and 46% indicated a desire to get groceries done as fast as possible. The overlap between the two defined the core design challenge: nutritional awareness shouldn't come at the cost of speed. Serving these users best meant creating a solution that quickly assesses nutritional value while remaining honest about how that value is determined.</p>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col gap-2">
                <h5 className="font-semibold text-sm lg:text-base">Shopping for many</h5>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-300">50% of respondants indicated that they regularly shop for multiple people, and 31% cite coordination with others as a point of stress in their experience. Adding support for household shopping means providing visibility into what others are adding, and confidence that the final cart suits everyone.</p>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-4 flex flex-col gap-2">
                <h5 className="font-semibold text-sm lg:text-base">Savings emphasis</h5>
                <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-300">50% of respondents cited budget constraints as a source of difficulty, and 46% plan their shopping around deals and sales entirely. A successful design gives these users a way to find the best value and make it present throughout their experience.</p>
              </div>
            </div>
            <div className='researchGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
                <h4 className='text-lg xl:text-xl w-full'>Synthesizing insights into user personas</h4>
              </div>
              <div className='personas flex flex-col gap-8 mt-3'>
                <div className='flex gap-4 items-start'>
                  <img src='https://cdn.lucasmcallister.com/photos/naomi.avif' className='lg:w-20 lg:h-20 w-16 h-16 shrink-0 rounded-full object-cover object-top' alt='Naomi Abrams' />
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-xs lg:text-sm'>Naomi Abrams</p>
                    <p className='text-xs lg:text-sm text-gray-500 w-full md:w-[80%]'>Naomi's strict gluten free dietary restrictions and packed schedule shaped the filtering system and nutrition score, as she needed to know at a glance whether a product would work for her.</p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <img src='https://cdn.lucasmcallister.com/photos/sergio.avif' className='lg:w-20 lg:h-20 w-16 h-16 shrink-0 rounded-full object-cover' alt='Sergio José Suarez' />
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-xs lg:text-sm'>Sergio José Suarez</p>
                    <p className='text-xs lg:text-sm text-gray-500 w-full md:w-[80%]'>Sergio's experience shopping for a large family and concern for what his kids eat made the case for collaborative carts and nutritional transparency at the cart-level, ensuring the household's order is accounted for nutritionally and logistically.</p>
                  </div>
                </div>
                <div className='flex gap-4 items-start'>
                  <img src='https://cdn.lucasmcallister.com/photos/haoran.avif' className='lg:w-20 lg:h-20 w-16 h-16 shrink-0 rounded-full object-cover' alt='Haoran Liu' />
                  <div className='flex flex-col gap-1'>
                    <p className='font-semibold text-xs lg:text-sm'>Haoran Liu</p>
                    <p className='text-xs lg:text-sm text-gray-500 w-full md:w-[80%]'>As a college student shopping after the gym, Haoran's focus on budget and macros highlighted the tension between eating well and spending carefully. His persona pushed for savings visibility and nutritional specificity to coexist.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">3</div>
              <h4 className='text-lg xl:text-xl w-full'>Defining each persona's flow</h4>
            </div>
            <img src={getGraphic("user_flows")} className='w-full lg:w-[80%] h-auto -mt-8' alt='User flow diagrams for each persona' />
          </div>
        </div>
      </div>
      <section className='w-full flex flex-col gap-4 lg:gap-8 xl:gap-12'>
        <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-28 md:gap-36 lg:gap-54 2xl:gap-66 justify-between lg:justify-start w-full'>
          <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Process</h2>
          <div className='flex flex-col w-full 2xl:max-w-[90%]'>
            <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Designing for all types of successful grocery trips.</h3>
            <div className='flex gap-4 w-full'>
              <ArrowRight className='mt-3 shrink-0 text-gray-500' size={30} strokeWidth={1.5} />
              <p className='font-sans text-xs lg:text-base text-gray-500 mt-3.5 2xl:w-[85%]'>With a clear understanding of the needs of each persona, it was time to design a solution that keeps the experience focused on nutrition, but retains the efficiency and convenience that brings users to grocery apps in the first place.</p>
            </div>
          </div>
        </div>
        <div className='flex flex-col w-full'>
          <div className='subsectionList flex flex-col gap-12 mt-10 lg:mt-15 w-full'>

            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>Unified nutrition score</h4>
              </div>
              <img src='https://cdn.lucasmcallister.com/photos/score_progression.avif' className='block w-full h-auto rounded' alt='Score progression graphic' />
              <p className='text-xs lg:text-base text-gray-500 w-full'>In initial wireframes, I explored a nutrition score that shows key macronutrients like calories, protein, and fat, with multiple gauges on each product. In low-fidelity prototypes, this proved to be crowded, overwhelming, and didn't solve the problem of giving users a clearer option. It was clear that a single score was necessary to give users a more clear decision point, optionally leading them to the more detailed breakdown.</p>
            </div>

            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
                <h4 className='text-lg xl:text-xl w-full'>Recipes that complement shopping with intention</h4>
              </div>
              <img src='https://cdn.lucasmcallister.com/photos/recipe_progression.avif' className='block w-full h-auto rounded' alt='Recipe progression graphic' />
              <p className='text-xs lg:text-base text-gray-500 w-full'>Early designs treated recipes like products, displaying a name, a time, and a single score. But a recipe is a planning decision, not a browsing one. Macro-level detail moved to the card itself, where a user who already committed to considering a full meal could weigh relevant macronutrients without an extra tap. Additionally, the recipe page allows users to act on their decision immediately, with built in ingredient prices and add to cart links.</p>
            </div>

            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">3</div>
                <h4 className='text-lg xl:text-xl w-full'>Bringing collaboration to the surface</h4>
              </div>
              <img src='https://cdn.lucasmcallister.com/photos/collaboration_progression.avif' className='block w-full h-auto rounded' alt='Collaboration progress graphic' />
              <p className='text-xs lg:text-base text-gray-500 w-full'>Collaboration was originally tucked into the cart as an icon in the header, which proved easy to miss and unintuitive. Moving it to the home screen's profile avatar was an natural way to make shared shopping visible throughout, making it part of the experience from the start, rather than something configured mid-order.</p>
            </div>
          </div>
        </div>
      </section>
        <section className='w-full flex flex-col gap-4 lg:gap-8 xl:gap-12'>
          <div className='subsectionContainer flex flex-col sm:flex-row lg:gap-24 xl:gap-28 2xl:gap-35 justify-between lg:justify-start w-full'>
            <h2 className='text-2xl w-70 xl:w-80 font-otto xl:text-4xl font-semibold tracking-tighter'>Visual Design</h2>
          </div>
          <div className='subsectionList flex flex-col gap-12 mt-8 lg:mt-15 w-full'>

            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>Design system</h4>
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 w-full'>
                <img src='https://cdn.lucasmcallister.com/photos/design_system.avif' className='block w-full h-auto rounded' alt='Design system graphic' />
                <img src='https://cdn.lucasmcallister.com/photos/components.avif' className='block w-full h-auto rounded' alt='Original components graphic' />
              </div>
              <p className='text-xs lg:text-base text-gray-500 w-full'>Adapted from shadcn/ui, the design system featured custom typography, color styles, 16 original components, and variables enabling consistent iteration of new designs across every screen.  </p>
            </div>

            <div className='listItemGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
                <h4 className='text-lg xl:text-xl w-full'>Details</h4>
              </div>
              <div className='flex flex-col gap-4 w-full'>
                <video src='https://cdn.lucasmcallister.com/videos/carulla_details.mp4' className='block w-full h-auto' autoPlay muted loop playsInline alt='Checkout and arrival experience video'/>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <img src='https://cdn.lucasmcallister.com/photos/filters_detail.avif' className='block w-full h-auto rounded' alt='Image of filters detail'/>
                  <img src='https://cdn.lucasmcallister.com/photos/confirmation.avif' className='block w-full h-auto rounded' alt='Image of confirmation detail'/>
                </div>
                <img src='https://cdn.lucasmcallister.com/photos/billboard.avif' className='block w-full h-auto rounded' alt='Billboard mockup graphic' />              
              </div>
            </div>
          </div>
        </section>
        <section className='w-full flex flex-col gap-8 xl:gap-12 mb-30'>
          <div className='subsectionContainer flex flex-col sm:flex-row lg:gap-24 xl:gap-28 2xl:gap-35 justify-between lg:justify-start w-full'>
            <h2 className='text-2xl w-70 xl:w-80 font-otto xl:text-4xl font-semibold tracking-tighter'>Reflections</h2>
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-2 mx-auto gap-10 xl:gap-30'>
            <div className='reflections flex flex-col gap-4 md:gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>Balancing efficiency with nutrition insights</h4>
              </div>
              <p className='text-xs lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>The hardest part of this project was undoubtedly deciding how much information was enough. Every addition risked slowing down an experience that users valued for its speed. The presentation of the health score was the clearest example of this: a single number is fast but reductive, and a full breakdown is accurate but demands more time and attention. Catering to users with differing objectives meant designing an interface flexible enough to support both without forcing a choice.</p>
            </div>
            <div className='reflections flex flex-col gap-4 md:gap-5'>
            <div className='flex gap-4 items-center'>
              <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">2</div>
              <h4 className='text-lg xl:text-xl w-full'>Convenience & routine as a priority</h4>
            </div>
            <p className='text-xs lg:text-base text-gray-500 w-full md:w-[80%] lg:w-full'>Initially, I believed that the health score would be enough to give users a push towards a confident decision, but through conversations with potential users and thinking about my own experiences grocery shopping, I found that most users' shopping is based on habit and routine. The recipe feature was conceptualized to work with this behavior, giving users a clear way to incorporate new products into their shopping habits, creating new routines.</p>
            </div>
          </div>
        </section>
    </section>
  </div>
  )
}
