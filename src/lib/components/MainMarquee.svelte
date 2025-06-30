<script lang="ts">
	import { marqueeAnimation } from '$lib/animations';
	import { Marquee } from '@selemondev/svelte-marquee';
	import '@selemondev/svelte-marquee/dist/style.css';
	import { onMount } from 'svelte';

	let { type } = $props<{ type: 'first' | 'second' }>();

	let marquee = $state<HTMLElement | null>(null);

	let customStyle = $derived(
		`absolute top-[45%] left-[-10%] z-[9999] w-[120%] overflow-hidden  ${type === 'first' ? 'sm:!rotate-[9deg] !rotate-[16deg]' : 'sm:!-rotate-[5deg] !-rotate-[16deg]'} md:top-[40%]`
	);

	onMount(() => {
		if (marquee)
			marquee.style.transform = type === 'first' ? 'translateX(-200rem)' : 'translateX(200rem)';

		marqueeAnimation();
	});
</script>

<div class="main-marquee {customStyle}" data-type={type} bind:this={marquee}>
	<Marquee
		class=" bg-red-500 py-4 text-4xl [--duration:5s] [--gap:3rem] sm:py-7 sm:text-7xl sm:[--gap:6rem]"
	>
		<div>WEB.</div>
		<div>DESIGN.</div>
		<div>DEVELOPMENT.</div>
		<div>CONTENT.</div>
		<div>DIGITAL.</div>
		<div>PORTFOLIO.</div>
	</Marquee>
</div>
