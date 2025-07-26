<script lang="ts">
	import '../app.css';
	import MouseCroshair from '$lib/components/mouseCroshair.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<svelte:head>
	<title>Godwin Jemegah - Web Developer & Designer</title>
	<meta name="description" content="Portfolio of Godwin Jemegah, a web developer and designer specializing in Svelte, React, and modern web technologies. View my projects and photography work." />
	<meta name="keywords" content="web developer, designer, Svelte, React, JavaScript, TypeScript, portfolio, photography" />
	<meta name="author" content="Godwin Jemegah" />
	<meta name="robots" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://godwinjemegah.com" />
	<meta property="og:title" content="Godwin Jemegah - Web Developer & Designer" />
	<meta property="og:description" content="Portfolio of Godwin Jemegah, a web developer and designer specializing in Svelte, React, and modern web technologies." />
	<meta property="og:image" content="/img/meta.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:site_name" content="Godwin Jemegah Portfolio" />
	
	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://godwinjemegah.com" />
	<meta property="twitter:title" content="Godwin Jemegah - Web Developer & Designer" />
	<meta property="twitter:description" content="Portfolio of Godwin Jemegah, a web developer and designer specializing in Svelte, React, and modern web technologies." />
	<meta property="twitter:image" content="/img/meta.png" />
	
	<!-- Favicon -->
	<link rel="icon" type="image/png" href="/favicon.png" />
	<link rel="apple-touch-icon" href="/favicon.png" />
	
	<!-- Canonical URL -->
	<link rel="canonical" href="https://godwinjemegah.com" />
	
	<!-- Structured Data -->
	<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "Person",
		"name": "Godwin Jemegah",
		"jobTitle": "Web Developer & Designer",
		"description": "Web developer and designer specializing in Svelte, React, and modern web technologies",
		"url": "https://godwinjemegah.com",
		"sameAs": [
			"https://www.linkedin.com/in/godwin-jemegah-759866203/",
			"https://github.com/n3-rd"
		],
		"knowsAbout": [
			"JavaScript",
			"TypeScript", 
			"Svelte",
			"React",
			"Web Development",
			"UI/UX Design"
		]
	}
	</script>
</svelte:head>

<Header />
<MouseCroshair />
{@render children()}
<!-- <Footer /> -->
