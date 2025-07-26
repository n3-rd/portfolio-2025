<script lang="ts">
  import { onMount } from 'svelte';
  
  let mouseX = $state(0);
  let mouseY = $state(0);
  let isMobile = $state(false);
  let isHoveringClickable = $state(false);
  
  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    
    // Check if hovering over clickable element
    const target = event.target as HTMLElement;
    const isClickable = target.closest('a, button, [onclick], [role="button"], .clickable, .menu-item, .view-button, .project-row');
    isHoveringClickable = !!isClickable;
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
    {#if isHoveringClickable}
      <div class="crosshair-circle bg-red-500 mix-blend-exclusion" style:left="{mouseX}px" style:top="{mouseY}px"></div>
    {/if}
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

  .crosshair-circle {
    position: absolute;
    width: 30px;
    height: 30px;
    /* border: 2px solid red; */
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
</style>
