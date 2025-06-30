<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import Ukiyo from 'ukiyojs';

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

<div class="mt-16 h-full min-h-[300vh] px-4 sm:mt-24">
	<h1 class="!mb-12 !text-3xl !font-light sm:!mb-24 sm:!text-6xl">
		Photography<span class="text-red-500">.</span>
	</h1>

	<div class="mt-6 grid grid-cols-1 gap-2 sm:mt-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
		{#each images as image, index}
			<div
				class="aspect-square w-full cursor-pointer overflow-hidden"
				onclick={() => openSlideshow(index)}
			>
				<img
					src={image.src}
					alt={image.alt}
					class="ukiyo h-full w-full object-cover"
					data-u-scale="1.5"
					data-u-speed="1.5"
					loading="lazy"
				/>
			</div>
		{/each}
	</div>
</div>

{#if isSlideShowOpen && selectedImageIndex !== null}
	<div
		class="bg-opacity-95 fixed inset-0 z-50 flex items-center justify-center bg-black"
		onclick={closeSlideshow}
	>
		<!-- Close button -->
		<button
			class="absolute top-4 right-4 z-10 text-3xl text-white transition-colors hover:text-red-500"
			onclick={closeSlideshow}
		>
			×
		</button>

		<!-- Image counter -->
		<div class="absolute top-4 left-4 z-10 text-sm text-white">
			{selectedImageIndex + 1} / {images.length}
		</div>

		<!-- Previous button -->
		<button
			class="absolute top-1/2 left-4 z-10 -translate-y-1/2 transform text-4xl text-white transition-colors hover:text-red-500"
			onclick={(e) => {
				e.stopPropagation();
				prevImage();
			}}
		>
			‹
		</button>

		<!-- Next button -->
		<button
			class="absolute top-1/2 right-4 z-10 -translate-y-1/2 transform text-4xl text-white transition-colors hover:text-red-500"
			onclick={(e) => {
				e.stopPropagation();
				nextImage();
			}}
		>
			›
		</button>

		<!-- Main image -->
		<div class="max-h-[90vh] max-w-[90vw] p-4" onclick={(e) => e.stopPropagation()}>
			<img
				src={images[selectedImageIndex].src}
				alt={images[selectedImageIndex].alt}
				class="h-full w-full object-contain"
			/>
		</div>

		<!-- Thumbnail strip -->
		<div
			class="thumbnail-strip absolute bottom-4 left-1/2 flex max-w-[90vw] -translate-x-1/2 transform gap-2 overflow-x-auto"
		>
			{#each images as image, index}
				<div
					class="thumbnail-{index} h-16 w-16 flex-shrink-0 cursor-pointer overflow-hidden border-2 transition-all
                           {index === selectedImageIndex
						? 'border-red-500'
						: 'border-opacity-50 border-white'}"
					onclick={(e) => {
						e.stopPropagation();
						selectedImageIndex = index;
						scrollToActiveThumbnail();
					}}
				>
					<img src={image.src} alt={image.alt} class="h-full w-full object-cover" />
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
