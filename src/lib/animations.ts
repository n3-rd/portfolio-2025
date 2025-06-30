import { goto } from '$app/navigation';
import { animate } from 'motion';

export const animateLinkHover = (el: HTMLElement) => {
	animate(el, {
		y: [0, -84]
	});
};

export const reverseLinkHover = (el: HTMLElement) => {
	animate(el, {
		y: [-84, 0]
	});
};

// Animation functions that can be called after DOM is ready
export const marqueeAnimation = () => {
	const marquees = document.querySelectorAll('.main-marquee') as NodeListOf<HTMLElement>;

	return marquees.forEach((marquee) => {
		if (!marquee) return null;

		// Set initial position
		marquee.style.transform =
			marquee.dataset.type === 'first' ? 'translateX(-200rem)' : 'translateX(200rem)';

		// Create keyframes for animation
		const keyframes = [
			{
				transform: marquee.dataset.type === 'first' ? 'translateX(-200rem)' : 'translateX(200rem)'
			},
			{ transform: 'translateX(0)' }
		];

		// Return animation controller
		return marquee.animate(keyframes, {
			duration: 1500,
			easing: 'cubic-bezier(0.17, 0.55, 0.55, 1)',
			fill: 'forwards'
		});
	});
};

export const textAnimation = () => {
	// Make selector more specific to only target the homepage
	const letters = document.querySelectorAll('.main-test .text-letter');

	if (!letters.length) return null;

	// Set initial positions
	letters.forEach((letter) => {
		(letter as HTMLElement).style.transform = 'translateY(600px)';
	});

	// Animate each letter with stagger
	const animations: Animation[] = [];

	// Create spring easing
	const springEasing = 'cubic-bezier(0.17, 0.55, 0.55, 1)';

	Array.from(letters).forEach((letter, index) => {
		const animation = (letter as HTMLElement).animate(
			[{ transform: 'translateY(600px)' }, { transform: 'translateY(0)' }],
			{
				duration: 1500,
				delay: index * 100, // Stagger effect
				easing: springEasing,
				fill: 'forwards'
			}
		);

		animations.push(animation);
	});

	return animations;
};

// Animation-out functions
export const marqueeAnimateOut = () => {
	const marquees = document.querySelectorAll('.main-marquee') as NodeListOf<HTMLElement>;
	if (!marquees.length) return null;

	return marquees.forEach((marquee) => {
		return marquee.animate(
			[
				{ transform: 'translateX(0)' },
				{
					transform: marquee.dataset.type === 'first' ? 'translateX(-200rem)' : 'translateX(200rem)'
				}
			],
			{
				duration: 1500,
				easing: 'ease-in',
				fill: 'forwards'
			}
		);
	});
};

export const textAnimateOut = () => {
	// Make selector more specific to only target the homepage
	const letters = document.querySelectorAll('.main-test .text-letter');
	if (!letters.length) return null;

	// Animate each letter with stagger
	const animations: Animation[] = [];

	Array.from(letters).forEach((letter, index) => {
		const animation = (letter as HTMLElement).animate(
			[{ transform: 'translateY(0)' }, { transform: 'translateY(600px)' }],
			{
				duration: 1000,
				delay: index * 50, // Faster stagger for exit
				easing: 'ease-in',
				fill: 'forwards'
			}
		);

		animations.push(animation);
	});

	return animations;
};

export const navigateToPage = (page: string) => {
	// Start exit animations
	textAnimateOut();
	marqueeAnimateOut();

	// After animations complete, navigate
	setTimeout(() => {
		goto(page);
	}, 1000);
};
