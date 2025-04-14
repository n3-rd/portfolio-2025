<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    import Ukiyo from "ukiyojs";
    
    interface Image {
        src: string;
        alt: string;
    }

    export let data: { photos: Image[] };
    let images = data.photos;
    let ukiyoInstance: any = null;
    
    function initUkiyo() {
        // Clean up previous instance if it exists
        if (ukiyoInstance) {
            ukiyoInstance.destroy();
        }
        
        // Wait for images to be available in DOM
        setTimeout(() => {
            const elements = document.querySelectorAll('.ukiyo');
            if (elements.length > 0) {
                ukiyoInstance = new Ukiyo(elements, {
                    scale: 1.5,
                    speed: 1.5,
                    willChange: true
                });
            }
        }, 100);
    }

    // Initialize after DOM is built and updated
    afterUpdate(() => {
        initUkiyo();
    });
    
    onMount(() => {
        // Initial setup
        window.addEventListener('load', initUkiyo);
        
        // Update on window resize
        window.addEventListener('resize', () => {
            if (ukiyoInstance) {
                ukiyoInstance.reset();
            }
        });
        
        return () => {
            window.removeEventListener('resize', initUkiyo);
            window.removeEventListener('load', initUkiyo);
            if (ukiyoInstance) {
                ukiyoInstance.destroy();
            }
        };
    });
</script>

<div class="mt-24 px-4">
   <h1 class="text-4xl">Photography</h1>

   <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {#each images as image}
            <div class="w-full aspect-square overflow-hidden">
                <img 
                    src={image.src} 
                    alt={image.alt} 
                    class="w-full h-full object-cover ukiyo"
                    data-u-scale="1.5"
                    data-u-speed="1.5"
                >
            </div>
        {/each}
   </div>
</div>

<style>
    img:hover {
        transform: scale(1.03);
    }
</style>