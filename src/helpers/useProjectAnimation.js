import { useEffect } from 'react';
import { animate, stagger } from 'motion/react';

/* This is a simple function that animates the project once it's opened.
It doesn't return anything and directly executes the animation */

export const useProjectAnimation = (elementsRef, isExpanded) => {
  useEffect(() => {
    const elements = elementsRef.current.filter(el => el !== null);
    if (elements.length === 0) return;

    animate(
      elements,
      { y: [15, 0], opacity: [0, 100], filter: ['blur(6px)', 'blur(0px)'] },
      { delay: stagger(0.15, { startDelay: 0.1 }), duration: 0.3, easing: 'ease-out' }
    );
  }, [isExpanded]);
};
