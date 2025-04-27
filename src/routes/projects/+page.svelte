<script lang="ts">
	import { animate } from "motion";
	import { onMount } from "svelte";

     const projects = [
        {
            title: "Project 1",
            description: "Description 1",
            image: "https://via.placeholder.com/150"
        },
        {
            title: "Project 2",
            description: "Description 2",
            image: "https://via.placeholder.com/150"
        },
        {
            title: "Project 3",
            description: "Description 3",
            image: "https://via.placeholder.com/150"
        },
        {
            title: "Project 4",
            description: "Description 4",
            image: "https://via.placeholder.com/150"
        }
     ];

     // Function to animate letters on hover
     function animateLetterHover(event: MouseEvent) {
        const projectTitle = event.currentTarget as HTMLElement;
        const letterContainers = projectTitle.querySelectorAll('.letter-container');
        
        letterContainers.forEach((container, index) => {
            // Get original and duplicate letters
            const originalLetter = container.querySelector('.original-letter') as HTMLElement;
            const duplicateLetter = container.querySelector('.duplicate-letter') as HTMLElement;
            
            // Make duplicate visible
            duplicateLetter.style.display = 'inline-block';
            
            // Animate original letter up
            originalLetter.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(-100%)' }
            ], {
                duration: 300,
                fill: 'forwards',
                delay: index * 30 // Stagger effect
            });
            
            // Animate duplicate letter up
            duplicateLetter.animate([
                { transform: 'translateY(100%)' },
                { transform: 'translateY(0)' }
            ], {
                duration: 300,
                fill: 'forwards',
                delay: index * 30 // Stagger effect
            });
        });
     }
     
     // Function to reset animation on mouse leave
     function resetLetterAnimation(event: MouseEvent) {
        const projectTitle = event.currentTarget as HTMLElement;
        const letterContainers = projectTitle.querySelectorAll('.letter-container');
        
        letterContainers.forEach((container, index) => {
            // Get original and duplicate letters
            const originalLetter = container.querySelector('.original-letter') as HTMLElement;
            const duplicateLetter = container.querySelector('.duplicate-letter') as HTMLElement;
            
            // Animate original letter back down
            originalLetter.animate([
                { transform: 'translateY(-100%)' },
                { transform: 'translateY(0)' }
            ], {
                duration: 300,
                fill: 'forwards',
                delay: index * 30 // Stagger effect
            });
            
            // Animate duplicate letter back down
            const animation = duplicateLetter.animate([
                { transform: 'translateY(0)' },
                { transform: 'translateY(100%)' }
            ], {
                duration: 300,
                fill: 'forwards',
                delay: index * 30 // Stagger effect
            });
            
            // Hide the duplicate letter when animation finishes
            animation.onfinish = () => {
                duplicateLetter.style.display = 'none';
            };
        });
     }

     onMount(() => {
        const projectTitles = document.querySelectorAll(".project-title");
        console.log(projectTitles);
     });
</script>

<div class="mt-24 px-4">
    <h1 class="text-4xl">Projects</h1>

    <div class="flex flex-col">
        {#each projects as project}
            <div class="border-b-2 border-black hover:bg-black hover:text-white transition-all duration-300">
                <h2 class="project-title text-4xl py-4" 
                   id={project.title}
                   on:mouseenter={animateLetterHover}
                   on:mouseleave={resetLetterAnimation}>
                    {#each project.title.split('') as char}
                        <span class="letter-container inline-block relative overflow-hidden">
                            <span class="original-letter inline-block">{char}</span>
                            <span class="duplicate-letter inline-block absolute top-0 left-0" style="display: none;">{char}</span>
                        </span>
                    {/each}
                    <span class="text-red-500">.</span>
                </h2>
            </div>
        {/each}
    </div>
</div>

<style>
    .letter-container {
        height: 1em;
        width: auto;
        position: relative;
    }
    
    .duplicate-letter {
        transform: translateY(100%);
    }
</style>