<script>
	import { animateLinkHover, navigateWithExitAnimation, reverseLinkHover } from "$lib/animations";
	import { page } from '$app/stores';

	$: isHomepage = $page.url.pathname === '/';
</script>

<div class="fixed w-full top-0 left-0 z-50 flex items-center justify-between px-3 py-2 sm:p-3 lg:p-4 overflow-hidden">
  <a href="/" class="header-logo   sm:text-xl lg:text-2xl xl:text-3xl flex-shrink-0">G</a> 
  <div class="menu flex items-center gap-2 sm:gap-3 lg:gap-4 xl:text-3xl sm:text-sm lg:text-3xl overflow-hidden">
    <button class="menu-item hover:text-red-500 transition-all duration-300 py-1 sm:px-1 sm:py-2 lg:px-0 lg:py-0 whitespace-nowrap"
    onclick={() => navigateWithExitAnimation("/projects")}
    >Work<span class="text-red-500">.</span></button>
    <button class="menu-item hover:text-red-500 transition-all duration-300 py-1 sm:px-1 sm:py-2 lg:px-0 lg:py-0 whitespace-nowrap"
    onclick={() => navigateWithExitAnimation("/photography")}
    >Photography<span class="text-red-500">.</span></button>
    <button class="menu-item hover:text-red-500 transition-all duration-300 py-1 sm:px-1 sm:py-2 lg:px-0 lg:py-0 whitespace-nowrap"
    onclick={() => navigateWithExitAnimation("/about")}
    >About<span class="text-red-500">.</span></button>
  </div>
</div>

<style>
  /* Scope all header styles to avoid conflicts with other components */
  .header-logo {
    transition: all 0.3s ease;
  }
  
  .header-logo:hover {
    color: #ef4444; /* text-red-500 */
  }
</style>