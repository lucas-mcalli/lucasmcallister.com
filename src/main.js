import { animate, press, stagger, hover } from "motion";

// OS Dark mode check
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.log("OS/browser is in dark mode");
} else {
  console.log("OS/browser is in light mode");
}


press("#dark-mode-button", (element) => {
    animate(element, {scale: 0.9}, {type: "spring", stiffness: 1000})
    return () => {
        animate(element, {scale: 1.0}, {type: "spring", stiffness: 500})
    }
});

  // Dark mode toggle functionality
const darkModeButton = document.getElementById("dark-mode-button")
const html = document.documentElement;
darkModeButton.addEventListener("click", () => {
  html.classList.toggle("dark");
});

hover(".expand-button", (element) => {
  animate(element, {scale: 1.05})
  return () => {
    animate(element, {scale: 1})
  }
});

animate("#home-arrow", 
  { y: [0, 40] },
  {
    delay: 0.5,
    duration: 3,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'reverse'
  }
);

