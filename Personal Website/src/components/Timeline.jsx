import { motion } from "framer-motion";
import { useState, useEffect, forwardRef } from "react";

const Timeline = forwardRef(({contextInView, problemInView, researchInView, designInView, handoffInView}, ref) => {
  return (
    <div ref={ref} className="w-full h-0 sticky top-2/5">
      <div className="absolute right-25">
        <div className="border dark:border-white border-black h-50 w-1 bg-black dark:bg-white absolute top-1 left-21" />

        <div className="w-14 left-9 top-0 absolute inline-flex flex-col justify-center items-end gap-8">

          <div className="entry flex gap-x-5 items-center">
            <div className="h-4 text-right text-black dark:text-white text-[10px]">
              CONTEXT
            </div>
            <div className={`w-3 h-3 border ${contextInView ? "bg-[#007AFF] border-[#007AFF]" : "dark:bg-white dark:border-white border-black bg-black "} rounded-full`} />
          </div>

          <div className="entry flex gap-x-5 items-center">
            <div className="h-4 text-right text-black dark:text-white text-[10px]">
              PROBLEM
            </div>
            <div className={`w-3 h-3 ${problemInView ? "bg-[#007AFF] border-[#007AFF]" : "dark:bg-white dark:border-white border-black bg-black "} rounded-full`}/>
          </div>

          <div className="entry flex gap-x-5 items-center">
            <div className="h-4 text-right text-black dark:text-white text-[10px]">
              RESEARCH
            </div>
            <div className={`w-3 h-3 ${researchInView ? "bg-[#007AFF] border-[#007AFF]" : "dark:bg-white dark:border-white border-black bg-black "} rounded-full `} />
          </div>

          <div className="entry flex gap-x-5 items-center">
            <div className="h-4 text-right text-black dark:text-white text-[10px]">
              DESIGN
            </div>
            <div className={`w-3 h-3 ${designInView ? "bg-[#007AFF] border-[#007AFF]" : "dark:bg-white dark:border-white border-black bg-black "} rounded-full`} />
          </div>

          <div className="entry flex gap-x-5 items-center">
            <div className="h-4 text-right text-black dark:text-white text-[10px]">
              HANDOFF
            </div>
            <div className={`w-3 h-3 ${handoffInView ? "bg-[#007AFF] border-[#007AFF]" : "dark:bg-white dark:border-white border-black bg-black "} rounded-full`}/>
          </div>

        </div>
      </div>
    </div>
  );
});

export default Timeline;
