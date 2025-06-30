<script lang="ts">
	import { animate } from 'motion';
	import { onMount } from 'svelte';

	interface Project {
		title: string;
		description: string;
		image: string;
		technologies: string[];
		url?: string; // Optional URL for projects that are live
	}

	const projects: Project[] = [
		{
			title: 'OHUN',
			description: 'Get synchronized song lyrics and sing along with your favorite songs.',
			image: 'https://pbs.twimg.com/media/GfrZG_BWQAEB290?format=jpg&name=medium',
			technologies: ['Sveltekit', 'Rust', 'Rauri', 'Playerctl'],
			url: 'https://ohun.vercel.app'
		},
		{
			title: 'ALTÉ COLLECTIVE',
			description:
				'A  community-driven platform for sharing and discovering growing Nigerian alternative music, art, and culture.',
			image: 'https://pbs.twimg.com/media/GroFuXaWwAEoG2U?format=jpg&name=large',
			technologies: ['Sveltekit', 'TailwindCSS'],
			url: 'https://alte-collective.vercel.app'
		},
		{
			title: 'Findshortlet',
			description:
				'The ultimate platform connecting property owners with tenants for both short-term stays and long-term rentals.',
			image: 'https://i.ibb.co/chvnj2N9/Screenshot-from-2025-06-23-16-52-32.png',
			technologies: ['Sveltekit', 'Pocketbase', 'TailwindCSS'],
			url: 'https://findshortlet.com'
		},
		{
			title: 'Inspolist',
			description:
				'A photography portfolio with image galleries, parallax scrolling effects, and lightbox features. Built for a professional photographer.',
			image:
				'https://ph-files.imgix.net/67d35e84-dddb-4353-a5cd-3d4a473238be.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=368&h=220&fit=max&frame=1&dpr=1',
			technologies: ['VueJS', 'GSAP', 'Netlify', 'Firebase'],
			url: 'https://inspolist.netlify.app'
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
			originalLetter.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-100%)' }], {
				duration: 300,
				fill: 'forwards',
				delay: index * 30 // Stagger effect
			});

			// Animate duplicate letter up
			duplicateLetter.animate([{ transform: 'translateY(100%)' }, { transform: 'translateY(0)' }], {
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
			originalLetter.animate([{ transform: 'translateY(-100%)' }, { transform: 'translateY(0)' }], {
				duration: 300,
				fill: 'forwards',
				delay: index * 30 // Stagger effect
			});

			// Animate duplicate letter back down
			const animation = duplicateLetter.animate(
				[{ transform: 'translateY(0)' }, { transform: 'translateY(100%)' }],
				{
					duration: 300,
					fill: 'forwards',
					delay: index * 30 // Stagger effect
				}
			);

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
		const projectTitles = document.querySelectorAll('.project-title');
		console.log(projectTitles);
	});
</script>

<div class="h-screen-full relative mx-auto mt-16 w-full px-4 sm:mt-24 sm:px-6">
	<h1 class="!mb-12 !text-3xl !font-light sm:!mb-24 sm:!text-6xl">
		Projects<span class="text-red-500">.</span>
	</h1>

	<div class="project-list">
		{#each projects as project, i}
			<div
				class="project-row flex items-start gap-4 border-t border-gray-200 py-4 sm:flex-row sm:gap-0 sm:py-8 lg:justify-between"
				onmouseenter={(e) =>
					handleProjectRowEnter(e, document.getElementById(project.title) as HTMLElement)}
				onmouseleave={(e) =>
					handleProjectRowLeave(e, document.getElementById(project.title) as HTMLElement)}
				onclick={() => showProjectDetails(project)}
			>
				<div class="project-title-wrapper flex w-full items-start sm:flex-auto">
					<span
						class="project-index mt-2 mr-4 w-[20px] text-xs text-gray-400 sm:mt-3 sm:mr-8 sm:w-[30px] sm:text-sm"
						>{String(i + 1).padStart(2, '0')}</span
					>
					<h2
						class="project-title !text-[1.3rem] !leading-[2.5rem] !font-light uppercase sm:!leading-[4.9rem] lg:!text-[4rem]"
						id={project.title}
					>
						{#each project.title.split(' ') as word, wordIndex}
							<span class="word mr-[0.3em] inline-block">
								{#each word.split('') as char}
									<span class="letter-container relative inline-block overflow-hidden">
										<span class="original-letter inline-block">{char}</span>
										<span
											class="duplicate-letter absolute top-0 left-0 inline-block"
											style="display: none;">{char}</span
										>
									</span>
								{/each}
							</span>
						{/each}
						<span class="text-red-500">.</span>
					</h2>
				</div>
				<div
					class="mt-0 flex items-center justify-end gap-2 sm:mt-3 sm:w-auto sm:items-start sm:justify-start sm:gap-4"
				>
					<div class="project-tech hidden !space-x-2 md:flex">
						{#each project.technologies.slice(0, 3) as tech}
							<span class="!border !border-gray-200 !px-3 !py-1 !text-xs !text-red-500">{tech}</span
							>
						{/each}
					</div>
					<div
						class="view-button !border !border-black px-3 py-1 text-sm transition-colors duration-300 hover:border-red-500 hover:bg-red-500 sm:px-4 sm:py-2 sm:text-base"
					>
						View
					</div>
				</div>
			</div>
		{/each}
	</div>

	{#if selectedProject}
		<div
			class=" fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
			onclick={hideProjectDetails}
		>
			<div class="overlay absolute h-full w-full"></div>
			<div
				class="project-details relative flex max-h-[85vh] w-fit max-w-5xl items-start overflow-y-auto rounded-none bg-white p-2 text-black opacity-0 shadow-md transition-all duration-300 md:p-0"
				onclick={(e) => e.stopPropagation()}
			>
				<button
					class="absolute -top-2 right-4 z-10 text-2xl text-black transition-colors hover:text-red-500 sm:top-0 sm:right-2 sm:text-3xl"
					onclick={hideProjectDetails}>×</button
				>

				<div class="grid grid-cols-1 gap-4 p-4 sm:gap-8 sm:p-8 lg:grid-cols-2">
					<div>
						<h2 class="mb-3 pr-8 text-2xl font-light sm:mb-4 sm:text-4xl">
							{selectedProject.title}<span class="text-red-500">.</span>
						</h2>
						<p class="mb-4 text-sm text-gray-700 sm:mb-6 sm:text-lg">
							{selectedProject.description}
						</p>

						<div class="mb-4 sm:mb-6">
							<h3 class="mb-2 text-lg font-light sm:mb-3 sm:text-xl">
								Technologies<span class="text-red-500">.</span>
							</h3>
							<div class="flex flex-wrap gap-2">
								{#each selectedProject.technologies as tech}
									<span
										class="rounded-full border border-gray-200 px-2 py-1 text-xs sm:px-3 sm:py-1 sm:text-sm"
										>{tech}</span
									>
								{/each}
							</div>
						</div>

						<div class="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
							<a
								href="#"
								class="bg-black px-4 py-2 text-center text-sm text-white transition-colors hover:bg-red-500 hover:text-black sm:px-6 sm:py-2 sm:text-base"
								>View Live</a
							>
							<a
								href="#"
								class="border-2 border-black px-4 py-2 text-center text-sm transition-colors hover:bg-black hover:text-red-500 sm:px-6 sm:py-2 sm:text-base"
								>View Code</a
							>
						</div>
					</div>

					<div class="order-first aspect-square overflow-hidden lg:order-last lg:aspect-auto">
						<img
							src={selectedProject.image}
							alt={selectedProject.title}
							class="h-full w-full object-cover"
						/>
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

	.overlay {
		background: rgba(255, 255, 255, 0.226);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.226);
	}

	.duplicate-letter {
		transform: translateY(100%);
	}

	.project-details {
		transform: translateY(10px);
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
