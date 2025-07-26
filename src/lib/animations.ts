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
  // Make selector more specific to only target the homepage
  const letters = document.querySelectorAll('.main-test .text-letter');
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
  // Make selector more specific to only target the homepage
  const letters = document.querySelectorAll('.main-test .text-letter');
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
  }, 2000);
};

// Projects page animations
export const projectsPageAnimation = () => {
  const projectRows = document.querySelectorAll('.project-row');
  if (!projectRows.length) return null;
  
  // Set initial positions
  projectRows.forEach((row) => {
    (row as HTMLElement).style.transform = 'translateY(100px)';
    (row as HTMLElement).style.opacity = '0';
  });
  
  // Animate each row with stagger
  const animations: Animation[] = [];
  
  Array.from(projectRows).forEach((row, index) => {
    const animation = (row as HTMLElement).animate(
      [
        { 
          transform: 'translateY(100px)',
          opacity: '0'
        },
        { 
          transform: 'translateY(0)',
          opacity: '1'
        }
      ],
      {
        duration: 800,
        delay: index * 150, // Stagger effect
        easing: "cubic-bezier(0.17, 0.55, 0.55, 1)",
        fill: "forwards"
      }
    );
    
    animations.push(animation);
  });
  
  return animations;
};

export const projectsPageAnimateOut = () => {
  const projectRows = document.querySelectorAll('.project-row');
  if (!projectRows.length) return null;
  
  // Animate each row with stagger
  const animations: Animation[] = [];
  
  Array.from(projectRows).forEach((row, index) => {
    const animation = (row as HTMLElement).animate(
      [
        { 
          transform: 'translateY(0)',
          opacity: '1'
        },
        { 
          transform: 'translateY(-100px)',
          opacity: '0'
        }
      ],
      {
        duration: 600,
        delay: index * 100, // Faster stagger for exit
        easing: "ease-in",
        fill: "forwards"
      }
    );
    
    animations.push(animation);
  });
  
  return animations;
};

export const projectsTitleAnimation = () => {
  const title = document.querySelector('.projects-title');
  if (!title) return null;
  
  // Set initial position
  (title as HTMLElement).style.transform = 'translateY(50px)';
  (title as HTMLElement).style.opacity = '0';
  
  return (title as HTMLElement).animate(
    [
      { 
        transform: 'translateY(50px)',
        opacity: '0'
      },
      { 
        transform: 'translateY(0)',
        opacity: '1'
      }
    ],
    {
      duration: 1000,
      easing: "cubic-bezier(0.17, 0.55, 0.55, 1)",
      fill: "forwards"
    }
  );
};

export const projectsTitleAnimateOut = () => {
  const title = document.querySelector('.projects-title');
  if (!title) return null;
  
  return (title as HTMLElement).animate(
    [
      { 
        transform: 'translateY(0)',
        opacity: '1'
      },
      { 
        transform: 'translateY(-50px)',
        opacity: '0'
      }
    ],
    {
      duration: 800,
      easing: "ease-in",
      fill: "forwards"
    }
  );
};

// Generic navigation function that handles different pages
export const navigateWithExitAnimation = (page: string) => {
  // Check current page and apply appropriate exit animations
  const currentPath = window.location.pathname;
  
  if (currentPath === '/') {
    // Homepage exit animations
    textAnimateOut();
    marquee1AnimateOut();
    marquee2AnimateOut();
    setTimeout(() => {
      goto(page);
    }, 2000);
  } else if (currentPath === '/projects') {
    // Projects page exit animations
    projectsTitleAnimateOut();
    projectsPageAnimateOut();
    setTimeout(() => {
      goto(page);
    }, 1500);
  } else {
    // Default navigation for other pages
    setTimeout(() => {
      goto(page);
    }, 300);
  }
};