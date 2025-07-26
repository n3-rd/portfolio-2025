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

<svelte:head>
	<title>Godwin Jemegah - Web Developer & Designer Portfolio</title>
	<meta name="description" content="Welcome to Godwin Jemegah's portfolio. Web developer and designer specializing in Svelte, React, and modern web technologies. Explore my projects and photography work." />
	<meta name="keywords" content="Godwin Jemegah, portfolio, web developer, designer, Svelte, React, JavaScript, TypeScript, projects, photography" />
	
	<!-- Open Graph -->
	<meta property="og:title" content="Godwin Jemegah - Web Developer & Designer Portfolio" />
	<meta property="og:description" content="Welcome to Godwin Jemegah's portfolio. Web developer and designer specializing in Svelte, React, and modern web technologies." />
	<meta property="og:url" content="https://godwinjemegah.com" />
	<meta property="og:type" content="website" />
	
	<!-- Twitter -->
	<meta property="twitter:title" content="Godwin Jemegah - Web Developer & Designer Portfolio" />
	<meta property="twitter:description" content="Welcome to Godwin Jemegah's portfolio. Web developer and designer specializing in Svelte, React, and modern web technologies." />
	
	<!-- Canonical -->
	<link rel="canonical" href="https://godwinjemegah.com" />
	
	<!-- Structured Data -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "WebSite",
		"name": "Godwin Jemegah Portfolio",
		"description": "Web developer and designer portfolio featuring projects and photography work",
		"url": "https://godwinjemegah.com",
		"author": {
			"@type": "Person",
			"name": "Godwin Jemegah",
			"jobTitle": "Web Developer & Designer"
		},
		"potentialAction": {
			"@type": "ViewAction",
			"target": "https://godwinjemegah.com/projects"
		}
	}
	</script>
</svelte:head>

<div class="h-screen flex items-end justify-center select-none overflow-hidden w-full relative">

<div class="absolute top-[45%] lg:top-[40%] left-[-20vw] sm:left-[-14rem] w-[140vw] sm:w-[120vw] z-[9999] rotate-6 sm:rotate-[9deg!important] overflow-hidden marquee-1">
  <MainMarquee />
</div>
<div class="absolute top-[45%] lg:top-[40%] left-[-20vw] sm:left-[-14rem] w-[140vw] sm:w-[120vw] z-[9999] -rotate-6 sm:!-rotate-[calc(16deg* -1)] overflow-hidden marquee-2">
  <MainMarquee />
</div>

  <p class="text-[15vw] sm:text-[19vw] lg:text-[11vw] lg:text-left lg:pb-0 text-center pb-4 sm:pb-8 main-test tracking-tighter overflow-hidden cursor-pointer relative z-10" id="main-test"
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
