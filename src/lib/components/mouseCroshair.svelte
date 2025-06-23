<script lang="ts">
  import { onMount } from 'svelte';
  
  let mouseX = $state(0);
  let mouseY = $state(0);
  let isMobile = $state(false);
  
  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
  
  onMount(() => {
    // Check if device is mobile/tablet
    isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    
    const handleResize = () => {
      isMobile = window.innerWidth <= 768 || 'ontouchstart' in window;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<svelte:window onmousemove={handleMouseMove} />

{#if !isMobile}
  <div class="crosshair-container hidden md:block">
    <div class="horizontal-line" style:top="{mouseY}px"></div>
    <div class="vertical-line" style:left="{mouseX}px"></div>
  </div>
{/if}

<style>
  .crosshair-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 100;
  }

  .horizontal-line {
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: red;
    left: 0;
  }

  .vertical-line {
    position: absolute;
    width: 1px;
    height: 100%;
    background-color: red;
    top: 0;
  }
</style>
