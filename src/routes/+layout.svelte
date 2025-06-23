<script lang="ts">
	import '../app.css';
	import MouseCroshair from '$lib/components/mouseCroshair.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	 <title>Godwin Jemegah</title>
 <meta name="description" content="Portfolio of Godwin Jemegah, a web developer and designer specializing in Svelte, React, and modern web technologies." />
	<!-- main image -->
	  <meta property="og:title" content="Godwin Jemegah - Web Developer & Designer" />
	     <meta property="og:description" content="Explore my portfolio showcasing web development and design projects using Svelte, React, and more." />
		  <meta property="og:image" content="/img/meta.png" />
		  
</svelte:head>

<Header />
<MouseCroshair />
{@render children()}
<!-- <Footer /> -->
