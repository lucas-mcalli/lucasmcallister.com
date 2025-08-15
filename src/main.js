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
const dmDropShadow = "drop-shadow(0 0 20px #FFFFFF)";
const regDropShadow = "drop-shadow(0 0 20px rgba(0,0,0,0.5))";
darkModeButton.addEventListener("click", () => {
  html.classList.toggle("dark");
  darkModeButton.style.filter = "";
  if (html.classList.contains("dark")) {
    darkModeButton.style.filter = dmDropShadow;
  } else {
    darkModeButton.style.filter = regDropShadow;
  }
});

hover(".expand-button", (element) => {
  animate(element, {scale: 1.05})
  return () => {
    animate(element, {scale: 1})
  }
});

animate("#home-arrow", 
  { y: [0, 30] },
  {
    delay: 0.5,
    duration: 3,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'reverse'
  }
);

animate(".hero-element",
    {y: [-20,0], opacity: [0,100], filter: ["blur(6px)", "blur(0px)"]},
    {delay: stagger(0.3, {startDelay: 0.7}), duration: 0.6}
)

animate(".nav-element",
  {y: [-20,0], opacity: [0,100]},
  {delay: stagger(0.1,)}
);



