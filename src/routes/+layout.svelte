<script lang="ts">
	import '../app.css';
	import MouseCroshair from '$lib/components/mouseCroshair.svelte';
	import Header from '$lib/components/Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Godwin Jemegah</title>
	<meta
		name="description"
		content="Portfolio of Godwin Jemegah, a web developer and designer specializing in Svelte, React, and modern web technologies."
	/>
	<!-- main image -->
	<meta property="og:title" content="Godwin Jemegah - Web Developer & Designer" />
	<meta
		property="og:description"
		content="Explore my portfolio showcasing web development and design projects using Svelte, React, and more."
	/>
	<meta property="og:image" content="/img/meta.png" />
</svelte:head>

<div class="mx-auto flex h-screen w-full max-w-[95vw] grid-cols-1 flex-col">
	<Header />
	<MouseCroshair />
	<main class="mt-10 flex h-full w-full flex-1 p-4 md:p-0">
		{@render children()}
	</main>
	<!-- <Footer /> -->
</div>
