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

<div class="mt-16 sm:mt-24 px-4 max-w-4xl mx-auto">
    <h1 class="text-2xl sm:text-4xl mb-8 sm:mb-12">About<span class="text-red-500">.</span></h1>

    <div class="flex flex-col gap-6 sm:gap-10">
        <section class="animate-in opacity-0">
            <h2 class="text-xl sm:text-2xl mb-2 sm:mb-3 font-medium">Godwin Jemegah</h2>
            <p class="text-base sm:text-lg leading-relaxed">
                I'm a passionate web developer and designer with a keen eye for creating intuitive and visually 
                appealing digital experiences. With expertise in modern web technologies and a strong 
                background in design principles, I bring ideas to life through clean code and thoughtful UX.
            </p>
        </section>

        <section class="animate-in opacity-0">
            <h2 class="text-xl sm:text-2xl mb-2 sm:mb-3 font-medium">Skills<span class="text-red-500">.</span></h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                    <h3 class="text-lg sm:text-xl mb-2">Development</h3>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>JavaScript/TypeScript</li>
                        <li>Svelte & SvelteKit</li>
                        <li>React & Next.js</li>
                        <li>Node.js</li>
                        <li>HTML/CSS</li>
                        <li>TailwindCSS</li>
                    </ul>
                </div>
                <div>
                    <h3 class="text-lg sm:text-xl mb-2">Design</h3>
                    <ul class="list-disc pl-5 space-y-1">
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

        <section class="animate-in opacity-0">
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
        </section>

        <section class="animate-in opacity-0">
            <h2 class="text-xl sm:text-2xl mb-2 sm:mb-3 font-medium">Contact<span class="text-red-500">.</span></h2>
            <p class="text-base sm:text-lg mb-4">Interested in working together? Reach out via:</p>
            <div class="flex flex-col space-y-2">
                <a href="mailto:hello@godwinjemegah.com" class="text-base sm:text-lg hover:text-red-500 transition-colors">hello@godwinjemegah.com</a>
                <a href="https://linkedin.com/in/godwinjemegah" target="_blank" rel="noopener noreferrer" class="text-base sm:text-lg hover:text-red-500 transition-colors">LinkedIn</a>
                <a href="https://github.com/godwinjemegah" target="_blank" rel="noopener noreferrer" class="text-base sm:text-lg hover:text-red-500 transition-colors">GitHub</a>
            </div>
        </section>
    </div>
</div>

<style>
    section {
        opacity: 0;
    }
</style> 