import { motion } from 'motion/react';
import { useRef } from 'react';
import { useProjectAnimation } from '../helpers/useProjectAnimation';
import Timeline from "./Timeline.jsx"

export default function CarullaProject({getGraphic, projectElementsRef, isExpanded}) {

  return (
    <div className='w-full xl:w-[90%] mx-auto'>
    <section className='flex flex-col gap-8 lg:gap-16 scroll-mt-25 lg:scroll-mt-15'>
      <img src="https://cdn.lucasmcallister.com/photos/carulla_cooking_mockup.webp" className="h-auto" alt="Image of cooking mockup" />
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-72 justify-between lg:justify-start'>
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Problem</h2>
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold'>People put thought into what they eat. Their grocery app should too.</h3>
          <p className='font-sans text-xs lg:text-base text-gray-500 w-full 2xl:max-w-[80%]'>
            In a world where people are increasingly concerned about personal health, traditional grocery apps haven't made that easy to act on. Nutrition labels may be a tap away, but surfacing information doesn't make it useful. A nutrition label might tell you there are 18 grams of fat, but not how that might fit into your nutritional goals, or how it comes together in a meal worth making.</p>
          <p className='font-sans text-xs lg:text-base text-gray-500 w-full 2xl:max-w-[80%]'>
            For an experience depending on users who are willing to pay a premium for efficiency and convenience, this is an oversight. An app positioned as a luxury should be able to support users in making choices most aligned with their goals from the shelf to the table.</p>
        </div>
      </div>
      <div className='w-full flex gap-6 lg:gap-12 xl:gap-24 justify-center py-5'>
        <img src="https://cdn.lucasmcallister.com/photos/shipt_sample.webp" className="w-40 md:w-60 xl:w-72" alt="Shipt screenshot illustrating the current standard" />
        <img src="https://cdn.lucasmcallister.com/photos/gopuff_sample.webp" className=" w-40 md:w-60 xl:w-72" alt="Gopuff screenshot illustrating the current standard" />
        <img src="https://cdn.lucasmcallister.com/photos/instacart_sample.webp" className="hidden md:block w-50 md:w-60 xl:w-72" alt="Instacart screenshot illustrating the current standard" />
      </div>
      <div className='subsectionContainer flex flex-col sm:flex-row gap-4 sm:gap-24 md:gap-32 lg:gap-48 2xl:gap-72 justify-between lg:justify-start'>
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
        <h2 className='text-2xl font-otto xl:text-4xl font-semibold tracking-tighter'>Process</h2>
        <div className='flex flex-col w-full 2xl:max-w-[90%]'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full'>Researching the every day frictions and opportunities of grocery shopping...</h3>
          <div className='researchList flex flex-col gap-15 mt-10 lg:mt-15'>
            <div className='researchGroup flex flex-col gap-5'>
              <div className='flex gap-4 items-center'>
                <div className="w-7 h-7 rounded-lg border-2 border-green-600 flex items-center justify-center font-semibold text-lg">1</div>
                <h4 className='text-lg xl:text-xl w-full'>General grocery experience survey</h4>
              </div>
              <div className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded p-3 flex flex-col gap-2">
                <h5 className="font-semibold text-sm lg:text-base">Users identify with nutritional goals</h5>
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
                    <p className='text-xs lg:text-sm text-gray-500 w-full md:w-[80%]'>Naomi's strict gluten free dietary restrictions and packed schedule shaped the filtering system and health score, as she needed to know at a glance whether a product would work for her.</p>
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
                    <p className='text-xs lg:text-sm text-gray-500 w-full md:w-[80%]'>As a college student, Haoran's focus on budget and macros highlighted the tension between eating well and spending carefully. His persona pushed for savings visibility and nutritional specificity to coexist.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      

    </section>
  </div>
  )
}
