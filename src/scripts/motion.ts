import { animate, inView, stagger } from 'motion';

// Gentle entrance and scroll-reveal animations built with Motion (motion.dev).
// Skipped entirely for visitors who prefer reduced motion.

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function initMotion() {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	// Hero: copy rises in line by line, the illustration settles in.
	const heroItems = document.querySelectorAll<HTMLElement>('.intro-copy > *');
	const heroArt = document.querySelector<HTMLElement>('.hero-art');
	if (heroItems.length) {
		animate(heroItems, { opacity: [0, 1], transform: ['translateY(18px)', 'translateY(0px)'] }, { duration: 0.7, delay: stagger(0.08), ease });
	}
	if (heroArt) {
		animate(heroArt, { opacity: [0, 1], transform: ['scale(0.97)', 'scale(1)'] }, { duration: 0.9, delay: 0.15, ease });
	}

	// Sections: items fade up in sequence the first time their section scrolls into view.
	const groups: Array<[section: string, items: string]> = [
		['#work', 'article'],
		['#lab', '[data-fingerprint-field]'],
		['#capabilities', '.impact-item'],
	];

	for (const [sectionSelector, itemSelector] of groups) {
		const section = document.querySelector(sectionSelector);
		if (!section) continue;
		const items = section.querySelectorAll<HTMLElement>(itemSelector);
		if (!items.length) continue;

		items.forEach((item) => { item.style.opacity = '0'; });

		inView(section, () => {
			animate(items, { opacity: [0, 1], transform: ['translateY(28px)', 'translateY(0px)'] }, { duration: 0.75, delay: stagger(0.09), ease });
		}, { amount: 0.15 });
	}
}
