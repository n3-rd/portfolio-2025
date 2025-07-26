<script lang="ts">
    import { onMount, afterUpdate } from 'svelte';
    
    interface Image {
        src: string;
        alt: string;
        id: string;
    }

    export let data: { photos: Image[] };
    let images = data.photos;
    let isLoading = false;
    let error = '';
    let loadedImages = new Set<string>();

    // Intersection Observer for lazy loading
    let observer: IntersectionObserver;

    // Handle image load errors by removing the broken image
    function handleImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        console.log('Image failed to load:', img.dataset.src);
        const container = img.closest('div');
        if (container) {
            container.remove();
        }
    }

    // Handle successful image load
    function handleImageLoad(event: Event) {
        const img = event.target as HTMLImageElement;
        const imageId = img.dataset.imageId;
        console.log('Image loaded:', imageId);
        
        if (imageId) {
            loadedImages.add(imageId);
        }
        
        // Add loaded class for animation
        img.classList.add('loaded');
        
        // Hide loading placeholder
        const placeholder = img.parentElement?.querySelector('.loading-placeholder');
        if (placeholder) {
            placeholder.classList.add('opacity-0');
            // Remove placeholder after transition
            setTimeout(() => {
                placeholder.remove();
                img.classList.add('loaded');
                img.classList.remove('opacity-1');
            }, 300);
        }
    }

    // Setup intersection observer for lazy loading
    function setupLazyLoading() {
        // Clean up previous observer
        if (observer) {
            observer.disconnect();
        }

        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement;
                    const dataSrc = img.dataset.src;
                    
                    if (dataSrc && !img.src) {
                        console.log('Loading image:', dataSrc);
                        img.src = dataSrc;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Observe all image containers
        const imageContainers = document.querySelectorAll('img[data-src]');
        console.log('Found images to observe:', imageContainers.length);
        
        // Load first 6 images immediately
        imageContainers.forEach((img, index) => {
            if (index < 6) {
                const dataSrc = (img as HTMLImageElement).dataset.src;
                if (dataSrc) {
                    console.log('Loading first image immediately:', dataSrc);
                    (img as HTMLImageElement).src = dataSrc;
                    img.removeAttribute('data-src');
                }
            } else {
                observer.observe(img);
            }
        });

        // Fallback: load remaining images after 1 second
        setTimeout(() => {
            const remainingImages = document.querySelectorAll('img[data-src]');
            remainingImages.forEach(img => {
                const dataSrc = (img as HTMLImageElement).dataset.src;
                if (dataSrc) {
                    console.log('Fallback loading image:', dataSrc);
                    (img as HTMLImageElement).src = dataSrc;
                    img.removeAttribute('data-src');
                }
            });
        }, 1000);
    }

    // Initialize after DOM is built and updated
    afterUpdate(() => {
        if (images && images.length > 0) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                setupLazyLoading();
            }, 100);
        }
    });
    
    onMount(() => {
        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    });
</script>

<div class="min-h-screen mt-16 sm:mt-24 px-4 sm:px-6 mx-auto relative">
   <h1 class="!text-3xl sm:!text-6xl !font-light !mb-12 sm:!mb-24">Photography<span class="text-red-500">.</span></h1>

   {#if images && images.length > 0}
       <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
            {#each images as image, index}
                <div class="w-full aspect-square overflow-hidden relative opacity-0 animate-fadeIn" style="animation-delay: {index * 0.1}s;">
                    <div class="loading-placeholder absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center z-10 transition-opacity duration-300">
                        <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </div>
                    <img 
                        data-src={image.src}
                        data-image-id={image.id}
                        alt={image.alt} 
                        class="w-full h-full object-cover transition-all duration-300 hover:scale-105 z-20 relative grayscale hover:grayscale-0"
                        onerror={handleImageError}
                        onload={handleImageLoad}
                    >
                </div>
            {/each}
       </div>
   {:else}
       <div class="flex flex-col items-center justify-center min-h-[50vh] text-center">
           <div class="text-gray-500 mb-4">
               <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
               </svg>
               <p class="text-lg">No photos available</p>
               <p class="text-sm text-gray-400 mt-2">Check your Immich configuration</p>
           </div>
       </div>
   {/if}
</div>

<style>
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fadeIn {
        animation: fadeIn 0.6s ease forwards;
    }

    .loading-placeholder.opacity-0 {
        opacity: 0 !important;
        pointer-events: none;
    }

    img.loaded {
        opacity: 1;
    }
</style>