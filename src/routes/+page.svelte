<script lang="ts">
	import MainMarquee from '$lib/components/MainMarquee.svelte';

	import { onMount } from 'svelte';

	import { textAnimation, navigateToPage } from '$lib/animations';

	let mainText = 'GODWIN\nJEMEGAH'.split('\n');

	onMount(() => {
		// Set initial positions (will be overridden by animation functions)
		const letters = document.querySelectorAll('.text-letter');

		// Initial letters position
		letters.forEach((letter) => {
			(letter as HTMLElement).style.transform = 'translateY(600px)';
		});

		// Run animations

		textAnimation();
	});
</script>

<div class="flex h-full w-full items-end overflow-hidden select-none">
	<MainMarquee type="first" />

	<MainMarquee type="second" />

	<a
		class="main-test cursor-pointer overflow-hidden pb-8 text-center text-[19vw] tracking-tighter lg:pb-0 lg:text-left lg:text-[11vw]"
		id="main-test"
		href="/photography"
		onclick={(e) => {
			e.preventDefault();
			navigateToPage('/photography');
		}}
	>
		{#each mainText as line}
			<span class="inline-block px-2 sm:px-4">
				{#each line as char}
					<span class="text-letter inline-block translate-y-[30rem]">{char}</span>
				{/each}
			</span>
		{/each}
	</a>
</div>
