import { useState, useRef, useEffect } from 'react';
import { motion, animate, hover, AnimatePresence } from 'motion/react';

const ProjectCard = ({ project, getGraphic, isExpanded, isRetiring, onToggle, onOpenSettled }) => {
  const expandButtonRef = useRef(null);
  const projectElementsRef = useRef([]);
  const projectContainerRef = useRef(null);

  // Apply hover animation to expand button (only when enabled)
  useEffect(() => {
    if (!expandButtonRef.current || project.disabled) return;

    const cleanup = hover(expandButtonRef.current, (element) => {
      animate(element, { scale: 1.05 });
      return () => {
        animate(element, { scale: 1 });
      };
    });

    return () => cleanup && cleanup();
  }, [project.disabled]);

  // Handle expand/close logic
  const handleToggle = () => {
    if (project.disabled) return; // Don't toggle if disabled
    
    if (!isExpanded) {
      // Opening the project - scroll to first <section>.
      onToggle(project.id, true);

      // The project this one is replacing (if any) stays mounted as
      // "retiring" (see Home.jsx) until onOpenSettled fires below. Removing
      // it any earlier - while still at least partly in the viewport -
      // causes a jarring reflow that fights this scroll. We don't trust the
      // first 'scrollend' blindly, since that event fires for ANY scroll
      // coming to rest (including stray momentum from the user's own
      // gesture right as they clicked) - only once we've actually arrived
      // near the target do we call onOpenSettled and let it unmount.
      setTimeout(() => {
        const projectElement = document.querySelector(`[data-project-id="${project.id}"]`);
        const firstSection = projectElement?.querySelector('section');
        if (!firstSection) {
          onOpenSettled?.();
          return;
        }
        let settled = false;
        let retries = 0;
        const markSettled = () => {
          if (settled) return;
          const { top } = firstSection.getBoundingClientRect();
          if (Math.abs(top) > 200 && retries < 4) {
            retries++;
            firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(markSettled, 800);
            return;
          }
          settled = true;
          window.removeEventListener('scrollend', markSettled);
          onOpenSettled?.();
        };
        window.addEventListener('scrollend', markSettled);
        setTimeout(markSettled, 1200);
        firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      // Closing the project
      const scrollAnchor = document.querySelector(`[data-project-card="${project.id}"]`);
      
      if (scrollAnchor) {
        const handleScrollEnd = () => {
          window.removeEventListener('scrollend', handleScrollEnd);
          // Close project AFTER scroll completes
          onToggle(project.id, false);
        };
        
        window.addEventListener('scrollend', handleScrollEnd);
        scrollAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        // Fallback if scroll anchor not found
        onToggle(project.id, false);
      }
    }
  };

  const ProjectComponent = project.component;

  return (
    // Deliberately not using the `layout` prop here: animating this card's
    // own position smoothly whenever a sibling's height changes sounds nice
    // in isolation, but it runs on its own independent timer that isn't
    // synced with the native scrollIntoView used above/below - the two end
    // up fighting over the same scroll position mid-transition (see the
    // comment above the AnimatePresence block). A plain, instant reflow
    // here is what makes the scroll destination reliable.
    <motion.div className="relative mb-15 scroll-mt-15" data-project-card={project.id}>
      <div data-project-id={project.id}>
        <div className="box relative w-full max-w-full sm:aspect-[5/2] overflow-hidden">
        {project.mediaType === 'video' ? (
          <video src={project.media} autoPlay muted loop playsInline className="w-full h-full object-contain" />
        ) : (
          <img src={project.media} alt={project.title} className="object-cover w-full h-full" />
        )}
      </div>

      <div className={`project-description w-full flex justify-between h-auto py-6 items-center ${
        isExpanded ? 'sticky top-0 z-10 bg-white dark:bg-neutral-900 py-6' : ''
      }`}>
        <div className="container-text flex flex-col align-start">
          {project.titleMobile ? (
            <>
              <p className="hidden lg:inline text-lg xl:text-xl 2xl:text-2xl text-wrap font-semibold tracking-tighter">
                {project.title}
              </p>
              <p className="lg:hidden text-lg text-wrap">
                {project.titleMobile}
              </p>
            </>
          ) : (
            <p className="text-lg xl:text-xl 2xl:text-2xl text-wrap font-semibold tracking-tighter">
              {project.title}
            </p>
          )}
          <p className="text-sm xl:text-base 2xl:text-lg text-wrap text-gray-500">
            {project.subtitle}
          </p>
        </div>

        <div className="flex items-center justify-center space-x-10">
          {project.extra && (
            <motion.a
              href={project.extra.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:block text-sm xl:text-base dark:text-white" 
              whileHover={{ color: '#6B7280' }}
            >
              {project.extra.info}
            </motion.a>
          )}

          <button
            onClick={handleToggle}
            className={`expand-button w-20 xl:w-24 2xl:w-30 h-8 xl:h-10 2xl:h-12 rounded-full text-white text-sm xl:text-lg 2xl:text-xl transition-colors duration-200 ease-in-out ${
              project.disabled ? 'bg-[#888888] cursor-not-allowed' : 'bg-[#007AFF] hover:bg-[#0060C0]'
            }`}
          >
            {project.disabled ? 'Soon' : isExpanded ? 'Close' : 'Expand'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {(isExpanded || isRetiring) && (
          <motion.div
            ref={projectContainerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <div id={`project-${project.id}-border`} className="mb-10 lg:mb-12 xl:mb-18"></div>
            <ProjectComponent
              getGraphic={getGraphic}
              projectElementsRef={projectElementsRef}
              isExpanded={isExpanded}
            />
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
