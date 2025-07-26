<script lang="ts">
	import { animate } from "motion";
	import { onMount } from "svelte";
    import { navigateToPage } from "$lib/animations";

    // Animation for content appearance
    function animateContent() {
        const sections = document.querySelectorAll('.animate-in');
        
        sections.forEach((section, index) => {
            (section as HTMLElement).animate(
                [
                    { opacity: 0, transform: 'translateY(50px)' },
                    { opacity: 1, transform: 'translateY(0)' }
                ],
                {
                    duration: 800,
                    delay: 100 + (index * 200),
                    fill: 'forwards',
                    easing: 'cubic-bezier(0.17, 0.55, 0.55, 1)'
                }
            );
        });
    }

    onMount(() => {
        animateContent();
    });
</script>

<svelte:head>
	<title>About - Godwin Jemegah</title>
	<meta name="description" content="Learn more about Godwin Jemegah, a web developer and designer specializing in Svelte, React, and modern web technologies. View skills, experience, and contact information." />
	<meta name="keywords" content="Godwin Jemegah, web developer, designer, Svelte, React, JavaScript, TypeScript, UI/UX design, portfolio" />
	
	<!-- Open Graph -->
	<meta property="og:title" content="About - Godwin Jemegah" />
	<meta property="og:description" content="Learn more about Godwin Jemegah, a web developer and designer specializing in Svelte, React, and modern web technologies." />
	<meta property="og:url" content="https://godwinjemegah.com/about" />
	<meta property="og:type" content="website" />
	
	<!-- Twitter -->
	<meta property="twitter:title" content="About - Godwin Jemegah" />
	<meta property="twitter:description" content="Learn more about Godwin Jemegah, a web developer and designer specializing in Svelte, React, and modern web technologies." />
	
	<!-- Canonical -->
	<link rel="canonical" href="https://godwinjemegah.com/about" />
	
	<!-- Structured Data -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Godwin Jemegah",
		"jobTitle": "Web Developer & Designer",
		"description": "Web developer and designer specializing in Svelte, React, and modern web technologies",
		"url": "https://godwinjemegah.com",
		"email": "hello@godwinjemegah.com",
		"sameAs": [
			"https://www.linkedin.com/in/godwin-jemegah-759866203/",
			"https://github.com/n3-rd"
		],
		"knowsAbout": [
			"JavaScript",
			"TypeScript", 
			"Svelte",
			"React",
			"Next.js",
			"Node.js",
			"HTML/CSS",
			"TailwindCSS",
			"UI/UX Design",
			"Motion Design",
			"Responsive Web Design",
			"Figma",
			"Adobe Creative Suite",
			"Photography"
		],
		"hasOccupation": {
			"@type": "Occupation",
			"name": "Web Developer",
			"occupationLocation": {
				"@type": "Place",
				"name": "Remote"
			}
		}
	}
	</script>
</svelte:head>

<div class="mt-16 sm:mt-24 px-4 max-w-4xl mx-auto">
    <h1 class="text-xl sm:text-2xl lg:text-4xl mb-6 sm:mb-8 lg:mb-12">About<span class="text-red-500">.</span></h1>

    <div class="flex flex-col gap-4 sm:gap-6 lg:gap-10">
        <section class="animate-in opacity-0">
            <h2 class="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 font-medium">Godwin Jemegah</h2>
            <p class="text-sm sm:text-base lg:text-lg leading-relaxed">
                I'm a passionate web developer and designer with a keen eye for creating intuitive and visually 
                appealing digital experiences. With expertise in modern web technologies and a strong 
                background in design principles, I bring ideas to life through clean code and thoughtful UX.
            </p>
        </section>

        <section class="animate-in opacity-0">
            <h2 class="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 font-medium">Skills<span class="text-red-500">.</span></h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <h3 class="text-base sm:text-lg lg:text-xl mb-2">Development</h3>
                    <ul class="list-disc pl-5 space-y-1 text-sm sm:text-base">
                        <li>JavaScript/TypeScript</li>
                        <li>Svelte & SvelteKit</li>
                        <li>React & Next.js</li>
                        <li>Node.js</li>
                        <li>HTML/CSS</li>
                        <li>TailwindCSS</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-base sm:text-lg lg:text-xl mb-2">Design</h3>
                    <ul class="list-disc pl-5 space-y-1 text-sm sm:text-base">
                        <li>UI/UX Design</li>
                        <li>Motion Design</li>
                        <li>Responsive Web Design</li>
                        <li>Figma</li>
                        <li>Adobe Creative Suite</li>
                        <li>Photography</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- <section class="animate-in opacity-0">
            <h2 class="text-xl sm:text-2xl mb-2 sm:mb-3 font-medium">Experience<span class="text-red-500">.</span></h2>
            <div class="space-y-4 sm:space-y-6">
                <div>
                    <h3 class="text-lg sm:text-xl">Senior Front-end Developer</h3>
                    <p class="text-gray-700 text-sm sm:text-base">Agency XYZ • 2021-Present</p>
                    <p class="mt-2 text-sm sm:text-base">
                        Leading development of web applications and interactive experiences
                        for a diverse client portfolio. Implemented animation-rich interfaces
                        and performance-optimized websites.
                    </p>
                </div>
                <div>
                    <h3 class="text-lg sm:text-xl">Web Developer & Designer</h3>
                    <p class="text-gray-700 text-sm sm:text-base">Creative Studio • 2018-2021</p>
                    <p class="mt-2 text-sm sm:text-base">
                        Developed responsive websites and digital products with a focus on
                        visual aesthetics and usability. Collaborated with design and marketing
                        teams to create cohesive brand experiences.
                    </p>
                </div>
            </div>
        </section> -->

        <section class="animate-in opacity-0">
            <h2 class="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 font-medium">Contact<span class="text-red-500">.</span></h2>
            <p class="text-sm sm:text-base lg:text-lg mb-4">Interested in working together? Reach out via:</p>
            <div class="flex flex-col space-y-2">
                <a href="mailto:godwinjdayo@gmail.com" class="text-sm sm:text-base lg:text-lg hover:text-red-500 transition-colors">godwinjdayo@gmail.com</a>
                <a href="https://github.com/n3-rd" target="_blank" rel="noopener noreferrer" class="text-sm sm:text-base lg:text-lg hover:text-red-500 transition-colors">GitHub</a>
            </div>
        </section>
    </div>
</div>

<style>
    section {
        opacity: 0;
    }
    a{
        color: #ff0028;
    }
</style> 