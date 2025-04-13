import { animate } from "motion"

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