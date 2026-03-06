'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

/* ─── Ambient Music Engine (Web Audio API) ────────────────────── */
// Plays a lofi/ambient musical chord progression using oscillators
function createAmbientEngine(ctx: AudioContext) {
    const master = ctx.createGain();
    const reverb = ctx.createConvolver();
    const compressor = ctx.createDynamicsCompressor();

    // Simple impulse reverb
    const impulse = ctx.createBuffer(2, ctx.sampleRate * 2, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
        const d = impulse.getChannelData(c);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3);
    }
    reverb.buffer = impulse;
    master.gain.value = 0;
    master.connect(compressor);
    compressor.connect(ctx.destination);

    // Chord progression: Am - F - C - G (lofi style)
    const chords = [
        [220, 261.63, 329.63], // Am
        [174.61, 220, 261.63], // F
        [261.63, 329.63, 392], // C
        [196, 246.94, 329.63], // G
    ];

    let chordIndex = 0;
    let oscillators: OscillatorNode[] = [];
    let gainNodes: GainNode[] = [];
    let chordTimeout: ReturnType<typeof setTimeout> | null = null;

    function playChord() {
        oscillators.forEach(o => { try { o.stop(); } catch {/**/ } });
        gainNodes.forEach(g => g.disconnect());
        oscillators = [];
        gainNodes = [];

        const freqs = chords[chordIndex % chords.length];
        chordIndex++;

        freqs.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            const lfo = ctx.createOscillator();
            const lfoGain = ctx.createGain();

            // Slightly detuned for warmth
            osc.type = i === 0 ? 'sawtooth' : 'triangle';
            osc.frequency.value = freq;
            osc.detune.value = (Math.random() - 0.5) * 8;

            // Vibrato LFO
            lfo.frequency.value = 4;
            lfoGain.gain.value = 3;
            lfo.connect(lfoGain);
            lfoGain.connect(osc.frequency);
            lfo.start();

            // Envelope
            g.gain.setValueAtTime(0, ctx.currentTime);
            g.gain.linearRampToValueAtTime(0.12 / freqs.length, ctx.currentTime + 0.8);
            g.gain.linearRampToValueAtTime(0.08 / freqs.length, ctx.currentTime + 2.5);
            g.gain.linearRampToValueAtTime(0, ctx.currentTime + 4.5);

            osc.connect(g);
            g.connect(reverb);
            g.connect(master);
            reverb.connect(master);

            osc.start(ctx.currentTime);

            oscillators.push(osc);
            gainNodes.push(g);
        });

        // Bass note
        const bass = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bass.type = 'sine';
        bass.frequency.value = freqs[0] / 2;
        bassGain.gain.setValueAtTime(0, ctx.currentTime);
        bassGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.4);
        bassGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 4.5);
        bass.connect(bassGain);
        bassGain.connect(master);
        bass.start(ctx.currentTime);
        oscillators.push(bass);
        gainNodes.push(bassGain);

        chordTimeout = setTimeout(playChord, 4800);
    }

    return {
        master,
        start() { playChord(); },
        stop() {
            if (chordTimeout) clearTimeout(chordTimeout);
            oscillators.forEach(o => { try { o.stop(); } catch {/**/ } });
        },
    };
}

/* ─── Sound Effects ───────────────────────────────────────────── */
export function playSfx(type: 'add' | 'heart' | 'nav' | 'click') {
    try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.connect(g); g.connect(ctx.destination);

        if (type === 'add') {
            osc.frequency.setValueAtTime(523, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(784, ctx.currentTime + 0.12);
            g.gain.setValueAtTime(0.3, ctx.currentTime);
            g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
            osc.type = 'sine';
        } else if (type === 'heart') {
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.linearRampToValueAtTime(660, ctx.currentTime + 0.15);
            g.gain.setValueAtTime(0.2, ctx.currentTime);
            g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);
            osc.type = 'sine';
        } else if (type === 'nav') {
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            g.gain.setValueAtTime(0.1, ctx.currentTime);
            g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.08);
            osc.type = 'triangle';
        } else {
            osc.frequency.setValueAtTime(392, ctx.currentTime);
            g.gain.setValueAtTime(0.1, ctx.currentTime);
            g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.06);
            osc.type = 'triangle';
        }
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
        setTimeout(() => ctx.close(), 500);
    } catch {/* noop in environments without Web Audio */ }
}

/* ─── MusicPlayer UI Component ────────────────────────────────── */
export default function MusicPlayer() {
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [expanded, setExpanded] = useState(false);
    const [currentTrack] = useState('Ambient Lofi · Swaramthala Mix');
    const [wave, setWave] = useState([0.3, 0.6, 0.9, 0.7, 0.4, 0.8, 0.5]);

    const ctxRef = useRef<AudioContext | null>(null);
    const engineRef = useRef<ReturnType<typeof createAmbientEngine> | null>(null);

    // Animate waveform when playing
    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
            setWave(w => w.map(() => 0.2 + Math.random() * 0.8));
        }, 300);
        return () => clearInterval(interval);
    }, [playing]);

    const toggle = useCallback(() => {
        if (playing) {
            engineRef.current?.stop();
            if (engineRef.current?.master) {
                engineRef.current.master.gain.linearRampToValueAtTime(0, (ctxRef.current?.currentTime ?? 0) + 0.5);
            }
            setPlaying(false);
            playSfx('click');
        } else {
            try {
                const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
                ctxRef.current = ctx;
                const eng = createAmbientEngine(ctx);
                engineRef.current = eng;
                eng.master.gain.setValueAtTime(0, ctx.currentTime);
                eng.master.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1.5);
                eng.start();
                setPlaying(true);
                playSfx('nav');
            } catch {/* noop */ }
        }
    }, [playing, volume]);

    const handleVolume = (v: number) => {
        setVolume(v);
        if (engineRef.current?.master && ctxRef.current) {
            engineRef.current.master.gain.linearRampToValueAtTime(v, ctxRef.current.currentTime + 0.2);
        }
    };

    return (
        <div style={{
            position: 'fixed', bottom: 24, left: 24, zIndex: 999,
            background: expanded ? 'rgba(10,10,20,0.95)' : 'rgba(10,10,20,0.85)',
            backdropFilter: 'blur(24px)',
            border: `1px solid ${playing ? 'rgba(124,92,252,0.5)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: expanded ? 20 : 50,
            padding: expanded ? '16px 20px' : '10px 16px',
            display: 'flex', flexDirection: expanded ? 'column' : 'row',
            alignItems: 'center', gap: 12,
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: playing ? '0 0 24px rgba(124,92,252,0.3)' : '0 4px 20px rgba(0,0,0,0.5)',
            minWidth: expanded ? 240 : 'auto',
            cursor: 'pointer',
        }}>
            {/* Play/Pause Button */}
            <button
                onClick={toggle}
                style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: playing
                        ? 'linear-gradient(135deg, #7c5cfc, #c084fc)'
                        : 'rgba(255,255,255,0.1)',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: 'white', flexShrink: 0,
                    transition: 'all 0.3s ease',
                    animation: playing ? 'pulse-glow 2s ease-in-out infinite' : 'none',
                }}
            >
                {playing ? '⏸' : '♫'}
            </button>

            {/* Waveform + Track name (visible always) */}
            <div onClick={() => setExpanded(e => !e)} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }}>
                    {wave.map((h, i) => (
                        <div key={i} style={{
                            width: 3, borderRadius: 2,
                            height: playing ? `${h * 20}px` : '4px',
                            background: playing ? 'var(--brand-primary)' : 'rgba(255,255,255,0.2)',
                            transition: `height ${0.3 + i * 0.04}s ease`,
                        }} />
                    ))}
                </div>
                {expanded && (
                    <div>
                        <div style={{ color: 'white', fontSize: '0.78rem', fontWeight: 600 }}>{currentTrack}</div>
                        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>
                            {playing ? '▶ Playing' : '⏸ Paused'}
                        </div>
                    </div>
                )}
            </div>

            {/* Volume Slider (expanded only) */}
            {expanded && (
                <div style={{ width: '100%' }} className="animate-fade-in">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>🔈</span>
                        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>🔊</span>
                    </div>
                    <input
                        type="range" min="0" max="1" step="0.05"
                        value={volume}
                        onChange={e => handleVolume(parseFloat(e.target.value))}
                        style={{ width: '100%', accentColor: '#7c5cfc', height: 4, cursor: 'pointer' }}
                    />
                    <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.62rem', textAlign: 'center', marginTop: 6 }}>
                        Web Audio · Lofi Ambient
                    </div>
                </div>
            )}
        </div>
    );
}
