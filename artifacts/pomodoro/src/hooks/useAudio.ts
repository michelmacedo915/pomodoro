import { useEffect, useRef } from 'react';
import { AmbientTrack } from '../types';

export function useAudio(track: AmbientTrack) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    if (!track) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      return;
    }
    
    const playAudio = async () => {
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio();
        }
        audioRef.current.src = `/audio/${track}-loop.mp3`;
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;
        await audioRef.current.play();
      } catch (err) {
        // Handle gracefully, likely audio file not found or interaction needed
        console.warn('Audio playback failed:', err);
      }
    };
    
    playAudio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [track]);
}
