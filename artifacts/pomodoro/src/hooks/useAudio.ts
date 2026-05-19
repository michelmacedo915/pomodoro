import { useEffect, useRef } from 'react';
import type { AmbientTrack } from '@/types';

interface SynthHandle {
  stop: () => void;
}

function buildNoiseBuffer(ctx: AudioContext, track: Exclude<AmbientTrack, null>): AudioBuffer {
  const n = ctx.sampleRate * 10;
  const buffer = ctx.createBuffer(1, n, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  if (track === 'rain') {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + w * 0.5362) / 6;
    }
  } else if (track === 'wind') {
    let last = 0;
    for (let i = 0; i < n; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      data[i] = last * 3.5;
    }
  } else {
    for (let i = 0; i < n; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  return buffer;
}

function startSynth(track: Exclude<AmbientTrack, null>): SynthHandle {
  const ctx = new AudioContext();
  const buffer = buildNoiseBuffer(ctx, track);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const gain = ctx.createGain();
  gain.gain.value = 0.22;

  if (track === 'rain') {
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 200;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 4000;
    source.connect(hp);
    hp.connect(lp);
    lp.connect(gain);
  } else if (track === 'wind') {
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 300;
    bp.Q.value = 0.4;
    source.connect(bp);
    bp.connect(gain);
  } else {
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 600;
    lp.Q.value = 1.2;
    source.connect(lp);
    lp.connect(gain);
  }

  gain.connect(ctx.destination);
  source.start();

  return {
    stop: () => {
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      setTimeout(() => {
        try { source.stop(); } catch { /* already stopped */ }
        ctx.close();
      }, 450);
    },
  };
}

const TRACK_PATHS: Record<Exclude<AmbientTrack, null>, string> = {
  rain: '/audio/rain-loop.mp3',
  lofi: '/audio/lofi-loop.mp3',
  wind: '/audio/wind-loop.mp3',
};

export function useAudio(track: AmbientTrack) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SynthHandle | null>(null);
  const activeRef = useRef<AmbientTrack>(null);

  useEffect(() => {
    if (track === activeRef.current) return;
    activeRef.current = track;

    // Stop previous
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.stop();
      synthRef.current = null;
    }

    if (!track) return;

    // Try HTML audio first (uses the generated mp3 files)
    const audio = new Audio(TRACK_PATHS[track]);
    audio.loop = true;
    audio.volume = 0.4;

    audio.play().then(() => {
      audioRef.current = audio;
    }).catch(() => {
      // File unavailable — fall back to Web Audio synthesis
      try {
        synthRef.current = startSynth(track);
      } catch (err) {
        console.warn('Audio fallback failed:', err);
      }
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.stop();
        synthRef.current = null;
      }
      activeRef.current = null;
    };
  }, [track]);
}
