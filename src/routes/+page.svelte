<script lang="ts">
	import MainMarquee from "$lib/components/MainMarquee.svelte";
  import { Marquee } from "@joycostudio/marquee";
	import { animate, stagger } from "motion";
	import { onMount } from "svelte";
  import { goto } from "$app/navigation";
	import { marquee1Animation, marquee2Animation, textAnimation, navigateToPage } from "$lib/animations";

  let mainText = "GODWIN\nJEMEGAH".split('\n');



  
  onMount(() => {
    // Set initial positions (will be overridden by animation functions)
    const marquee1 = document.querySelector('.marquee-1') as HTMLElement;
    const marquee2 = document.querySelector('.marquee-2') as HTMLElement;
    const letters = document.querySelectorAll('.text-letter');
    
    if (marquee1) marquee1.style.transform = 'translateX(-200rem)';
    if (marquee2) marquee2.style.transform = 'translateX(200rem)';
    
    // Initial letters position
    letters.forEach((letter) => {
      (letter as HTMLElement).style.transform = 'translateY(600px)';
    });
    
    // Run animations
    marquee1Animation();
    marquee2Animation();
    textAnimation();
  });
</script>
<div class="h-screen flex items-end justify-center select-none overflow-hidden w-full">

<div class="absolute top-[45%] lg:top-[40%] left-[-50vw] sm:left-[-14rem] w-[200vw] sm:w-[120vw] z-[9999] rotate-6 sm:rotate-[9deg!important] overflow-hidden marquee-1">
  <MainMarquee />
</div>
<div class="absolute top-[45%] lg:top-[40%] left-[-50vw] sm:left-[-14rem] w-[200vw] sm:w-[120vw] z-[9999] -rotate-6 sm:!-rotate-[calc(16deg* -1)] overflow-hidden marquee-2">
  <MainMarquee />
</div>

  <p class="text-[19vw] lg:text-[11vw] lg:text-left lg:pb-0  text-center pb-8 main-test tracking-tighter overflow-hidden cursor-pointer" id="main-test"
   onclick={() => navigateToPage("/photography")}
  >
    {#each mainText as line}
      <span class="inline-block px-2 sm:px-4">
        {#each line as char}
          <span class="text-letter translate-y-[30rem] inline-block">{char}</span>
        {/each}
      </span>
    {/each}
  </p>
</div>
