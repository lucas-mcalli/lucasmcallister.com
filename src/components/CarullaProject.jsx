import { motion } from 'motion/react';
import { useRef } from 'react';
import { useProjectAnimation } from '../helpers/useProjectAnimation';
import { useActiveSection } from '../helpers/useActiveSection';
import Timeline from "./Timeline.jsx"

const CarullaProject = ({getGraphic, projectElementsRef, isExpanded}) => {
  
  // Use custom hook to track active section
  const activeSection = useActiveSection(sections, isExpanded);

  // Use custom hook for element animations
  useProjectAnimation(projectElementsRef, isExpanded)

  return (
    <>
     <div>
      <p>
        Hello World!
      </p>
     </div>
  </>
  )
}

export default CarullaProject;
