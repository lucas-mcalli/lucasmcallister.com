import { useState, useRef, useEffect } from 'react';
import { motion, animate, hover } from 'motion/react';

const ProjectCard = ({ project, getGraphic, isExpanded, onToggle }) => {
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
      
      // Scroll to the first content section after project renders
      setTimeout(() => {
        // Try to find the first section element within the project
        const projectElement = document.querySelector(`[data-project-id="${project.id}"]`);
        if (projectElement) {
          const firstSection = projectElement.querySelector('section');
          if (firstSection) {
            firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
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
    <li className="relative mb-15 scroll-mt-15" data-project-card={project.id}>
      <div data-project-id={project.id}>
        <div className="box relative w-full max-w-full aspect-[16/9] sm:aspect-[5/2] overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="object-cover w-full h-full" 
        />
      </div>

      <div className={`project-description w-full flex justify-between h-auto py-6 items-center ${
        isExpanded ? 'sticky top-0 z-10 bg-white dark:bg-neutral-900 py-6' : ''
      }`}>
        <div className="container-text flex flex-col align-start">
          {project.titleMobile ? (
            <>
              <p className="hidden md:inline text-lg xl:text-2xl text-wrap">
                {project.title}
              </p>
              <p className="md:hidden text-lg text-wrap">
                {project.titleMobile}
              </p>
            </>
          ) : (
            <p className="text-lg xl:text-2xl text-wrap">
              {project.title}
            </p>
          )}
          <p className="text-sm xl:text-lg text-wrap text-[#777777]">
            {project.subtitle}
          </p>
        </div>

        <button
          ref={expandButtonRef}
          onClick={handleToggle}
          disabled={project.disabled}
          className={`expand-button w-20 xl:w-30 h-8 xl:h-12 rounded-full text-white text-md xl:text-xl transition-colors duration-200 ease-in-out ${
            project.disabled ? 'bg-[#888888] cursor-not-allowed' : 'bg-[#007AFF] hover:bg-[#0060C0]'
          }`}
        >
          {project.disabled ? 'Soon' : isExpanded ? 'Close' : 'Expand'}
        </button>
      </div>

      {isExpanded && (
        <motion.div
          ref={projectContainerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
        >
          <div id={`project-${project.id}-border`} className="mb-10 md:mb-12 lg:mb-18"></div> 
          <ProjectComponent
            getGraphic={getGraphic}
            projectElementsRef={projectElementsRef}
            isExpanded={isExpanded}
            projectId={project.id}
          />
        </motion.div>
      )}
      </div>
    </li>
  );
};

export default ProjectCard;
