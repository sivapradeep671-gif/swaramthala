declare module 'locomotive-scroll' {
    export interface LocomotiveScrollOptions {
        el?: HTMLElement | null;
        name?: string;
        offset?: [number, number];
        repeat?: boolean;
        smooth?: boolean;
        direction?: 'vertical' | 'horizontal';
        lerp?: number;
        class?: string;
        scrollbarContainer?: HTMLElement | false;
        scrollbarClass?: string;
        scrollingClass?: string;
        draggingClass?: string;
        smoothClass?: string;
        initClass?: string;
        getSpeed?: boolean;
        getDirection?: boolean;
        multiplier?: number;
        firefoxMultiplier?: number;
        touchMultiplier?: number;
        scrollFromAnywhere?: boolean;
        lenisOptions?: any;
    }

    export default class LocomotiveScroll {
        constructor(options?: LocomotiveScrollOptions);
        init(): void;
        update(): void;
        destroy(): void;
        start(): void;
        stop(): void;
        scrollTo(
            target: string | HTMLElement | number,
            options?: {
                offset?: number;
                duration?: number;
                easing?: [number, number, number, number];
                disableLerp?: boolean;
                callback?: () => void;
            }
        ): void;
        on(eventName: string, callback: (event: any) => void): void;
    }
}
