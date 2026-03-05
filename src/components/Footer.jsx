import { motion } from 'motion/react';

const Footer = () => {
  return (
    <footer className="w-full relative mb-4 z-10">
      <div className="flex justify-between items-start">
        <motion.a href="#landing-page" className="text-xs lg:text-sm underline dark:text-white" whileHover={{ color: '#eec12e' }}>Back to top</motion.a>
        <motion.a href="mailto:l.mcallister@ufl.edu" className="text-xs lg:text-sm underline dark:text-white" whileHover={{ color: '#eec12e' }}>l.mcallister@ufl.edu</motion.a>
        <motion.a href="https://github.com/lucas-mcalli/lucasmcallister.com" target="_blank" rel="noopener noreferrer" className="text-xs lg:text-sm underline dark:text-white" whileHover={{ color: '#eec12e' }}>Source code</motion.a>
      </div>
    </footer>
  );
};

export default Footer;
