<script lang="ts">
  let mouseX = $state(0);
  let mouseY = $state(0);
  
  function handleMouseMove(event: MouseEvent) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  }
</script>

<svelte:window onmousemove={handleMouseMove} />

<div class="crosshair-container">
  <div class="horizontal-line" style:top="{mouseY}px"></div>
  <div class="vertical-line" style:left="{mouseX}px"></div>
</div>

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
