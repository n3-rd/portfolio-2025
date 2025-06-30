<script lang="ts">
	import { page } from '$app/state';
	import { animateLinkHover, navigateToPage, reverseLinkHover } from '$lib/animations';

	const navigation = [
		{ path: '/projects', label: 'Projects' },
		{ path: '/photography', label: 'Photography' },
		{ path: '/about', label: 'About' }
	];

	let currPage = $derived(page.url.pathname);

	function isActive(href: string): boolean {
		return currPage === href;
	}
</script>

<header class="fixed top-0 left-0 z-50 mt-2 w-full">
	<nav
		class="container mx-auto flex w-full max-w-[90%] items-center justify-between rounded-full bg-white/60 p-3 sm:p-4 md:max-w-[82vw] lg:px-6"
	>
		<!-- Logo / Home Link -->
		<a href="/" class="header-logo text-xl font-bold sm:text-2xl" aria-label="Home"> G </a>

		<!-- Main Navigation -->
		<nav class="menu" aria-label="Main navigation">
			<ul class="flex items-center justify-center gap-2 sm:gap-4 sm:text-sm lg:text-3xl">
				{#each navigation as { path, label }}
					<li>
						<a
							href={path}
							class:active={isActive(path)}
							class="menu-item group relative block py-2 transition-all duration-300 hover:text-red-500 {isActive(
								path
							)
								? 'text-red-500'
								: ''}"
							aria-current={isActive(path) ? 'page' : undefined}
							title={label}
							onclick={(e) => {
								if (currPage === '/') {
									e.preventDefault();
									navigateToPage(path);
								}
							}}
						>
							<span class="relative">
								{label}
								<span class="text-red-500">.</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</nav>
</header>

<style>
	/* Scope all header styles to avoid conflicts with other components */
	/* Header */
	.container {
		background: rgba(255, 255, 255, 0.226);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.226);
	}

	/* Logo */
	.header-logo {
		transition: all 0.3s ease;
		display: inline-block;
		line-height: 1;
	}

	.header-logo:hover,
	.header-logo:focus {
		color: #ef4444; /* text-red-500 */
		outline: none;
	}

	/* Navigation */
	.menu ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.menu-item {
		text-decoration: none;
		position: relative;
		transition: color 0.3s ease;
		outline: none;
	}

	.menu-item:hover,
	.menu-item:focus {
		outline: none;
	}

	.menu-item.active {
		color: #ef4444;
	}

	.menu-item::after {
		content: '';
		position: absolute;
		width: 0;
		height: 2px;
		bottom: 0;
		left: 0;
		background-color: #ef4444;
		transition: width 0.3s ease;
	}

	.menu-item:focus {
		color: #ef4444;
	}
	.menu-item:hover::after,
	.menu-item:focus::after {
		width: 100%;
	}

	/* Dark mode support */

	/* Focus styles */
	a:focus-visible {
		outline: 2px solid #3b82f6; /* blue-500 */
		outline-offset: 2px;
		border-radius: 0.25rem;
	}
</style>
