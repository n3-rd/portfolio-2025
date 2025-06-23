<script>
	import { animateLinkHover, navigateToPage, reverseLinkHover } from "$lib/animations";
</script>

<div class="min-w-full fixed top-0 left-0 z-50 flex items-center justify-between p-3 sm:p-4">
  <a href="/" class="header-logo font-bold text-xl sm:text-2xl">G</a> 
  <div class="menu flex items-center justify-center gap-2 sm:gap-4 sm:text-sm lg:text-3xl ">
    <div class="menu-item hover:text-red-500 transition-all duration-300"
    onclick={() => navigateToPage("/projects")}
    >Projects<span class="text-red-500">.</span></div>
    <span class="menu-item hover:text-red-500 transition-all duration-300"
    onclick={() => navigateToPage("/photography")}
    >Photography<span class="text-red-500">.</span></span>
    <div class="menu-item hover:text-red-500 transition-all duration-300"
    onclick={() => navigateToPage("/about")}
    >About<span class="text-red-500">.</span></div>
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