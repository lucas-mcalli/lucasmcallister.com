import { useEffect, useState } from 'react';

/* This function returns an activeSection object that is then passed into the Timeline in each 
project that uses it, which allows for the timeline to animate which section you're on. */

export const useActiveSection = (sections, isExpanded) => {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const determineActiveSection = () => {
        
      // Reference point: 35% from top of viewport (slightly above timeline for better UX)
      const referencePoint = window.innerHeight * 0.35;
      let closestSection = null;
      let closestDistance = Infinity;

      sections.forEach(({ ref, id }) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          // Check if section is in viewport
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            // Calculate distance from reference point to section's top
            const distance = Math.abs(rect.top - referencePoint);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = id;
            }
          }
        }
      });

      setActiveSection(closestSection);
    };

    // Check on mount and scroll
    determineActiveSection();
    window.addEventListener('scroll', determineActiveSection, { passive: true });
    window.addEventListener('resize', determineActiveSection);

    return () => {
      window.removeEventListener('scroll', determineActiveSection);
      window.removeEventListener('resize', determineActiveSection);
    };
  }, [isExpanded, sections]);

  return activeSection;
};
