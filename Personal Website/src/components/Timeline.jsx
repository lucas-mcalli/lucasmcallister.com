import { motion } from "framer-motion";
import { forwardRef } from "react";

const Timeline = forwardRef(({activeSection}, ref) => {
  return (
    <div ref={ref} className="w-full h-auto sticky top-2/5 hidden xl:block">
      <div className="absolute right-25">
        <div className="border dark:border-white border-black h-50 w-1 bg-black dark:bg-white absolute top-1 left-21 pointer-events-none" />
        <div className="w-14 left-9 top-0 absolute inline-flex flex-col justify-center items-end gap-8 pointer-events-auto">
          <div className="entry flex gap-x-5 items-center">
            <motion.a className="h-4 text-right text-black dark:text-white text-[10px]" href="#CONTEXT" whileHover={{ scale : 1.05, color : "#808080"}}>
              CONTEXT
            </motion.a>
            <motion.div 
              className={`w-3 h-3 border rounded-full ${
                activeSection === 'context' 
                  ? "bg-[#007AFF] border-[#007AFF]" 
                  : "dark:bg-white dark:border-white border-black bg-black"
              }`}
              animate={{
                scale: activeSection === 'context' ? 1.4 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            />
          </div>

          <div className="entry flex gap-x-5 items-center">
            <motion.a className="h-4 text-right text-black dark:text-white text-[10px]" href="#PROBLEM" whileHover={{ scale : 1.05, color : "#808080"}}>
              PROBLEM
            </motion.a>
            <motion.div 
              className={`w-3 h-3 border rounded-full ${
                activeSection === 'problem' 
                  ? "bg-[#007AFF] border-[#007AFF]" 
                  : "dark:bg-white dark:border-white border-black bg-black"
              }`}
              animate={{
                scale: activeSection === 'problem' ? 1.4 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            />
          </div>

          <div className="entry flex gap-x-5 items-center">
            <motion.a className="h-4 text-right text-black dark:text-white text-[10px]" href="#RESEARCH" whileHover={{ scale : 1.05, color : "#808080"}}>
              RESEARCH
            </motion.a>
            <motion.div 
              className={`w-3 h-3 border rounded-full ${
                activeSection === 'research' 
                  ? "bg-[#007AFF] border-[#007AFF]" 
                  : "dark:bg-white dark:border-white border-black bg-black"
              }`}
              animate={{
                scale: activeSection === 'research' ? 1.4 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            />
          </div>

          <div className="entry flex gap-x-5 items-center">
            <motion.a className="h-4 text-right text-black dark:text-white text-[10px]" href="#DESIGN" whileHover={{ scale : 1.05, color : "#808080"}}>
              DESIGN
            </motion.a>
            <motion.div 
              className={`w-3 h-3 border rounded-full ${
                activeSection === 'design' 
                  ? "bg-[#007AFF] border-[#007AFF]" 
                  : "dark:bg-white dark:border-white border-black bg-black"
              }`}
              animate={{
                scale: activeSection === 'design' ? 1.4 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            />
          </div>

          <div className="entry flex gap-x-5 items-center">
            <motion.a className="h-4 text-right text-black dark:text-white text-[10px]" href="#REFLECTION" whileHover={{ scale : 1.05, color : "#808080"}}>
              REFLECTION
            </motion.a>
            <motion.div 
              className={`w-3 h-3 border rounded-full ${
                activeSection === 'handoff' 
                  ? "bg-[#007AFF] border-[#007AFF]" 
                  : "dark:bg-white dark:border-white border-black bg-black"
              }`}
              animate={{
                scale: activeSection === 'handoff' ? 1.4 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            />
          </div>

        </div>
      </div>
    </div>
  );
});

export default Timeline;
