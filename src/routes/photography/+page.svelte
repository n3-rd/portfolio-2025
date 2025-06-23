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
    let selectedImageIndex: number | null = null;
    let isSlideShowOpen = false;
    
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
        
        // Add keyboard event listener
        window.addEventListener('keydown', handleKeydown);
        
        return () => {
            window.removeEventListener('resize', initUkiyo);
            window.removeEventListener('load', initUkiyo);
            window.removeEventListener('keydown', handleKeydown);
            if (ukiyoInstance) {
                ukiyoInstance.destroy();
            }
        };
    });
    
    function openSlideshow(index: number) {
        selectedImageIndex = index;
        isSlideShowOpen = true;
        document.body.style.overflow = 'hidden';
    }

    function closeSlideshow() {
        isSlideShowOpen = false;
        selectedImageIndex = null;
        document.body.style.overflow = 'auto';
    }

    function nextImage() {
        if (selectedImageIndex !== null) {
            selectedImageIndex = (selectedImageIndex + 1) % images.length;
            scrollToActiveThumbnail();
        }
    }

    function prevImage() {
        if (selectedImageIndex !== null) {
            selectedImageIndex = selectedImageIndex === 0 ? images.length - 1 : selectedImageIndex - 1;
            scrollToActiveThumbnail();
        }
    }

    function scrollToActiveThumbnail() {
        setTimeout(() => {
            const thumbnailStrip = document.querySelector('.thumbnail-strip');
            const activeThumbnail = document.querySelector(`.thumbnail-${selectedImageIndex}`);
            
            if (thumbnailStrip && activeThumbnail) {
                activeThumbnail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }, 50);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (!isSlideShowOpen) return;
        
        switch (event.key) {
            case 'Escape':
                closeSlideshow();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'ArrowLeft':
                prevImage();
                break;
        }
    }
</script>

<div class="mt-16 sm:mt-24 px-4">
   <h1 class="text-2xl sm:text-4xl">Photography</h1>

   <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 mt-6 sm:mt-8">
        {#each images as image, index}
            <div class="w-full aspect-square overflow-hidden cursor-pointer" onclick={() => openSlideshow(index)}>
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

{#if isSlideShowOpen && selectedImageIndex !== null}
    <div class="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center"
         onclick={closeSlideshow}>
        
        <!-- Close button -->
        <button class="absolute top-4 right-4 text-white text-3xl z-10 hover:text-red-500 transition-colors"
                onclick={closeSlideshow}>
            ×
        </button>
        
        <!-- Image counter -->
        <div class="absolute top-4 left-4 text-white text-sm z-10">
            {selectedImageIndex + 1} / {images.length}
        </div>
        
        <!-- Previous button -->
        <button class="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 hover:text-red-500 transition-colors"
                onclick={(e) => { e.stopPropagation(); prevImage(); }}>
            ‹
        </button>
        
        <!-- Next button -->
        <button class="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 hover:text-red-500 transition-colors"
                onclick={(e) => { e.stopPropagation(); nextImage(); }}>
            ›
        </button>
        
        <!-- Main image -->
        <div class="max-w-[90vw] max-h-[90vh] p-4"
             onclick={(e) => e.stopPropagation()}>
            <img 
                src={images[selectedImageIndex].src} 
                alt={images[selectedImageIndex].alt}
                class="w-full h-full object-contain"
            >
        </div>
        
        <!-- Thumbnail strip -->
        <div class="thumbnail-strip absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto">
            {#each images as image, index}
                <div class="thumbnail-{index} flex-shrink-0 w-16 h-16 overflow-hidden cursor-pointer border-2 transition-all
                           {index === selectedImageIndex ? 'border-red-500' : 'border-white border-opacity-50'}"
                     onclick={(e) => { e.stopPropagation(); selectedImageIndex = index; scrollToActiveThumbnail(); }}>
                    <img src={image.src} alt={image.alt} class="w-full h-full object-cover">
                </div>
            {/each}
        </div>
    </div>
{/if}

<style>
    img:hover {
        transform: scale(1.03);
    }
</style>