import { motion } from "motion/react";
import { forwardRef } from "react";

const Timeline = forwardRef(({sections, activeSection}, ref) => {
  const lineHeight = sections.length * 36.3;
  return (
    <div ref={ref} className="w-full h-110 sticky top-2/5 hidden xl:block"> {/* h-110 so timeline adequately stops sticking BEFORE projects end. */}
      <div className="absolute right-25">
        <div className="w-14 left-9 top-0 absolute inline-flex flex-col justify-center items-end gap-8 pointer-events-auto">
          {sections.map(({ id, ref }, index) => {
            const label = id.toUpperCase();
            return (
              <div key={id}>
                <div className="entry flex gap-x-5 items-center">
                  <motion.a 
                    className="h-4 text-right text-black dark:text-white text-[10px]" 
                    href={`#${label}`}
                    whileHover={{ scale: 1.05, color: "#808080" }}
                  >
                    {label}
                  </motion.a>
                <motion.div 
                  className={`w-3 h-3 border rounded-full ${
                    activeSection === id 
                      ? "bg-[#007AFF] border-[#007AFF]" 
                      : "dark:bg-white dark:border-white border-black bg-black"
                  }`}
                  animate={{
                    scale: activeSection === id ? 1.4 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                />
              </div>
            </div>
            );
          })}
          <div className={`border dark:border-white border-black w-1 bg-black dark:bg-white absolute top-3.4 left-12 pointer-events-none -z-1`} style={{height: `${lineHeight}px`}} />
        </div>
      </div>
    </div>
  );
});

export default Timeline;
