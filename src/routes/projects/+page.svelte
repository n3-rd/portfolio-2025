<script lang="ts">
	import { animate } from "motion";
	import { onMount } from "svelte";

    interface Project {
        title: string;
        description: string;
        image: string;
        technologies: string[];
        url?: string; // Optional URL for projects that are live
    }

     const projects: Project[] = [
        {
            title: "OHUN",
            description: "Get synchronized song lyrics and sing along with your favorite songs.",
            image: "https://pbs.twimg.com/media/GfrZG_BWQAEB290?format=jpg&name=medium",
            technologies: ["Sveltekit", "Rust", "Rauri", "Playerctl"],
            url: "https://ohun.vercel.app"
        },
        {
            title: "ALTÉ COLLECTIVE",
            description: "A  community-driven platform for sharing and discovering growing Nigerian alternative music, art, and culture.",
            image: "https://pbs.twimg.com/media/GroFuXaWwAEoG2U?format=jpg&name=large",
            technologies: ["Sveltekit", "TailwindCSS"],
            url: "https://alte-collective.vercel.app"
        },
        {
            title: "Findshortlet",
            description: "The ultimate platform connecting property owners with tenants for both short-term stays and long-term rentals.",
            image: "https://i.ibb.co/chvnj2N9/Screenshot-from-2025-06-23-16-52-32.png",
            technologies: ["Sveltekit", "Pocketbase", "TailwindCSS"],
            url: "https://findshortlet.com"
        },
        {
            title: "Inspolist",
            description: "A photography portfolio with image galleries, parallax scrolling effects, and lightbox features. Built for a professional photographer.",
            image: "https://ph-files.imgix.net/67d35e84-dddb-4353-a5cd-3d4a473238be.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&frame=1&dpr=1",
            technologies: ["VueJS", "GSAP", "Netlify", "Firebase"],
            url: "https://inspolist.netlify.app"
        }
     ];

     let selectedProject: Project | null = null;

     // Function to animate letters on hover
     function animateLetterHover(event: MouseEvent, projectTitle: HTMLElement) {
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
     function resetLetterAnimation(event: MouseEvent, projectTitle: HTMLElement) {
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

     function handleProjectRowEnter(event: MouseEvent, projectTitle: HTMLElement) {
        animateLetterHover(event, projectTitle);
     }

     function handleProjectRowLeave(event: MouseEvent, projectTitle: HTMLElement) {
        resetLetterAnimation(event, projectTitle);
     }

     function showProjectDetails(project: Project) {
        selectedProject = project;
        
        // Animate project details in
        setTimeout(() => {
            const detailsEl = document.querySelector('.project-details');
            if (detailsEl) {
                detailsEl.classList.remove('opacity-0', 'translate-y-10');
                detailsEl.classList.add('opacity-100', 'translate-y-0');
            }
        }, 50);
     }

     function hideProjectDetails() {
        const detailsEl = document.querySelector('.project-details');
        if (detailsEl) {
            detailsEl.classList.add('opacity-0', 'translate-y-10');
            detailsEl.classList.remove('opacity-100', 'translate-y-0');
            
            // Set selectedProject to null after animation completes
            setTimeout(() => {
                selectedProject = null;
            }, 300);
        }
     }

     onMount(() => {
        const projectTitles = document.querySelectorAll(".project-title");
        console.log(projectTitles);
     });
</script>

<div class="min-h-screen mt-24 px-6 mx-auto relative">
    <h1 class="!text-6xl !font-light !mb-24">Projects<span class="text-red-500">.</span></h1>

    <div class="project-list">
        {#each projects as project, i}
            <div 
                class="project-row py-8 border-t border-gray-200 flex items-start justify-between" 
                onmouseenter={(e) => handleProjectRowEnter(e, document.getElementById(project.title) as HTMLElement)}
                onmouseleave={(e) => handleProjectRowLeave(e, document.getElementById(project.title) as HTMLElement)}
                onclick={() => showProjectDetails(project)}
            >
                <div class="project-title-wrapper flex items-start">
                    <span class="project-index text-sm text-gray-400 mr-8 mt-3 w-[30px]">{String(i + 1).padStart(2, '0')}</span>
                    <h2 
                        class="project-title !text-[4rem] !leading-[4.9rem] !font-light uppercase" 
                        id={project.title}
                    >
                        {#each project.title.split(' ') as word, wordIndex}
                            <span class="word inline-block mr-[0.3em]">
                                {#each word.split('') as char}
                                    <span class="letter-container inline-block relative overflow-hidden">
                                        <span class="original-letter inline-block">{char}</span>
                                        <span class="duplicate-letter inline-block absolute top-0 left-0" style="display: none;">{char}</span>
                                    </span>
                                {/each}
                            </span>
                        {/each}
                        <span class="text-red-500">.</span>
                    </h2>
                </div>
                <div class="flex items-start gap-4 mt-3">
                    <div class="project-tech hidden md:flex !space-x-2">
                        {#each project.technologies.slice(0, 3) as tech}
                            <span class="!text-xs !px-3 !py-1 !border !border-gray-200 !text-red-500">{tech}</span>
                        {/each}
                    </div>
                    <div class="view-button px-4 py-2 !border !border-black hover:bg-red-500 hover:border-red-500 transition-colors duration-300 ml-4">
                        View
                    </div>
                </div>
            </div>
        {/each}
    </div>

    {#if selectedProject}
        <div class="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
             onclick={hideProjectDetails}>
            <div class="project-details bg-white text-black p-8 max-w-5xl w-full max-h-[85vh] overflow-y-auto rounded-none opacity-0 translate-y-10 transition-all duration-300 relative"
                 onclick={(e) => e.stopPropagation()}>
                <button class="absolute top-6 right-6 text-3xl z-10 text-black hover:text-red-500 transition-colors" onclick={hideProjectDetails}>×</button>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 class="text-4xl font-light mb-4">{selectedProject.title}<span class="text-red-500">.</span></h2>
                        <p class="text-lg mb-6 text-gray-700">{selectedProject.description}</p>
                        
                        <div class="mb-6">
                            <h3 class="text-xl font-light mb-3">Technologies<span class="text-red-500">.</span></h3>
                            <div class="flex flex-wrap gap-2">
                                {#each selectedProject.technologies as tech}
                                    <span class="border border-gray-200 px-3 py-1 rounded-full text-sm">{tech}</span>
                                {/each}
                            </div>
                        </div>
                        
                        <div class="flex gap-4 mt-8">
                            <a href="#" class="px-6 py-2 bg-black text-white hover:bg-red-500 transition-colors">View Live</a>
                            <a href="#" class="px-6 py-2 border-2 border-black hover:bg-black hover:text-white transition-colors">View Code</a>
                        </div>
                    </div>
                    
                    <div class="aspect-square md:aspect-auto overflow-hidden">
                        <img src={selectedProject.image} alt={selectedProject.title} class="w-full h-full object-cover">
                    </div>
                </div>
            </div>
        </div>
    {/if}
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

    .project-details {
        transform: translateY(10px);
    }

    .project-row {
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .project-row:hover {
        background-color: rgba(0, 0, 0, 0.02);
    }

    .project-row:hover .view-default {
        transform: translateY(-100%);
    }

    .project-row:hover .view-hover {
        transform: translateY(0);
    }

    .view-hover {
        color: #ef4444; /* text-red-500 */
    }

    /* Add this for the last project to have a bottom border */
    .project-list > div:last-child {
        border-bottom: 1px solid #e5e7eb; /* border-gray-200 */
    }

    .word {
        display: inline-block;
        line-height: 1;
    }

    .view-button {
        font-size: 1rem;
        letter-spacing: 0.05em;
        font-weight: 500;
    }
</style>