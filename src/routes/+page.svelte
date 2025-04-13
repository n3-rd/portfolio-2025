<script>
	import MainMarquee from "$lib/components/MainMarquee.svelte";
  import { Marquee } from "@joycostudio/marquee";
	import { animate, stagger } from "motion";
	import { onMount } from "svelte";

  let mainText = "GODWIN\nJEMEGAH".split('\n');
  
  onMount(() => {
    // Get all the letter elements
    const elements = document.querySelectorAll('.text-letter');
    
    // Animate each letter from hidden to visible with a stagger
    animate(elements, 
      { 
        y: [600, 0]
      },
      { 
        duration: 1.5,
        delay: stagger(0.1),
        type: "spring",
        stiffness: 300,
        damping: 60
      }
    );
  });

</script>
<div class="h-screen flex items-end justify-center select-none overflow-hidden w-full">

<div class="absolute top-[40%] left-[-14rem] w-[120vw] z-[9999] rotate-6 overflow-hidden">
  <MainMarquee />
</div>

  <p class="text-[10vw] main-test tracking-tighter overflow-hidden" id="main-test">
    {#each mainText as line}
      <span class="inline-block px-4">
        {#each line as char}
          <span class="text-letter translate-y-[30rem] inline-block">{char}</span>
        {/each}
      </span>
    {/each}
  </p>
</div>
