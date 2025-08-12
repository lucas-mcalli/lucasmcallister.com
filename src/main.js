import { animate, press } from "motion";
press("#dark-mode-button", (element) => {
    animate(element, {scale: 0.9}, {type: "spring", stiffness: 1000})
    return () => 
        animate(element, {scale: 1.0}, {type: "spring", stiffness: 500})
});
animate("#home-arrow", {y: 50}, {duration: 1,  direction: "alternate", delay: 0.5});

