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
        <div className='flex flex-col gap-4'>
          <h3 className='text-xl xl:text-2xl 2xl:text-3xl font-semibold w-full 2xl:max-w-[90%]'>Nutrition, understood. A score & breakdown that tells you what your food actually means, plus the recipes to actually make use of your choice.</h3>
          <p className='font-sans text-xs lg:text-base text-gray-500 w-full 2xl:max-w-[80%]'></p>
        </div>
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
    </section>
  </div>
  )
}
