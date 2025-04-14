import { goto } from "$app/navigation";
import { animate } from "motion";

export const animateLinkHover = (el: HTMLElement) => {
    animate(el, {
        y: [0, -84]
    });
};

export const reverseLinkHover = (el: HTMLElement) => {
    animate(el, {
        y: [-84, 0]
    });
};

// Animation functions that can be called after DOM is ready
export const marquee1Animation = () => {
  const marquee1 = document.querySelector('.marquee-1') as HTMLElement;
  if (!marquee1) return null;
  
  // Set initial position
  marquee1.style.transform = 'translateX(-200rem)';
  
  // Create keyframes for animation
  const keyframes = [
    { transform: 'translateX(-200rem)' },
    { transform: 'translateX(0)' }
  ];
  
  // Return animation controller
  return marquee1.animate(keyframes, { 
    duration: 1500, 
    easing: "cubic-bezier(0.17, 0.55, 0.55, 1)",
    fill: "forwards" 
  });
};

export const marquee2Animation = () => {
  const marquee2 = document.querySelector('.marquee-2') as HTMLElement;
  if (!marquee2) return null;
  
  // Set initial position
  marquee2.style.transform = 'translateX(200rem)';
  
  // Create keyframes for animation
  const keyframes = [
    { transform: 'translateX(200rem)' },
    { transform: 'translateX(0)' }
  ];
  
  // Return animation controller
  return marquee2.animate(keyframes, { 
    duration: 1500, 
    easing: "cubic-bezier(0.17, 0.55, 0.55, 1)",
    fill: "forwards"
  });
};

export const textAnimation = () => {
  const letters = document.querySelectorAll('.text-letter');
  if (!letters.length) return null;
  
  // Set initial positions
  letters.forEach((letter) => {
    (letter as HTMLElement).style.transform = 'translateY(600px)';
  });
  
  // Animate each letter with stagger
  const animations: Animation[] = [];
  
  // Create spring easing
  const springEasing = "cubic-bezier(0.17, 0.55, 0.55, 1)";
  
  Array.from(letters).forEach((letter, index) => {
    const animation = (letter as HTMLElement).animate(
      [
        { transform: 'translateY(600px)' },
        { transform: 'translateY(0)' }
      ],
      {
        duration: 1500,
        delay: index * 100, // Stagger effect
        easing: springEasing,
        fill: "forwards"
      }
    );
    
    animations.push(animation);
  });
  
  return animations;
};

// Animation-out functions
export const marquee1AnimateOut = () => {
  const marquee1 = document.querySelector('.marquee-1') as HTMLElement;
  if (!marquee1) return null;
  
  return marquee1.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-200rem)' }
    ],
    { 
      duration: 1500, 
      easing: "ease-in",
      fill: "forwards"
    }
  );
};

export const marquee2AnimateOut = () => {
  const marquee2 = document.querySelector('.marquee-2') as HTMLElement;
  if (!marquee2) return null;
  
  return marquee2.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(200rem)' }
    ],
    { 
      duration: 1500, 
      easing: "ease-in",
      fill: "forwards" 
    }
  );
};

export const textAnimateOut = () => {
  const letters = document.querySelectorAll('.text-letter');
  if (!letters.length) return null;
  
  // Animate each letter with stagger
  const animations: Animation[] = [];
  
  Array.from(letters).forEach((letter, index) => {
    const animation = (letter as HTMLElement).animate(
      [
        { transform: 'translateY(0)' },
        { transform: 'translateY(600px)' }
      ],
      {
        duration: 1000,
        delay: index * 50, // Faster stagger for exit
        easing: "ease-in",
        fill: "forwards"
      }
    );
    
    animations.push(animation);
  });
  
  return animations;
};

export const navigateToPage = (page: string) => {
  // Start exit animations
  textAnimateOut();
  marquee1AnimateOut();
  marquee2AnimateOut();
  
  // After animations complete, navigate
  setTimeout(() => {
    goto(page);
  }, 1000);
};