import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useAppStore } from '../store/appStore';

export const useFPS = () => {
  const { setFPS } = useAppStore();
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useFrame(() => {
    frameCount.current++;
    const currentTime = performance.now();
    
    if (currentTime - lastTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (currentTime - lastTime.current));
      setFPS(fps);
      frameCount.current = 0;
      lastTime.current = currentTime;
    }
  });
}; 