'use client';

import { useEffect } from 'react';

export default function LocomotiveInit() {
    useEffect(() => {
        let locomotiveScroll: any;
        (async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default;
            locomotiveScroll = new LocomotiveScroll({
                lenisOptions: {
                    lerp: 0.08,
                    duration: 1.2,
                    smoothWheel: true,
                }
            });
        })();

        return () => {
            if (locomotiveScroll) locomotiveScroll.destroy();
        };
    }, []);

    return null;
}
