<script lang="ts">
	import '../app.css';
	import MouseCroshair from '$lib/components/mouseCroshair.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	let { children } = $props();
</script>

<Header />
<MouseCroshair />
{@render children()}
<!-- <Footer /> -->
