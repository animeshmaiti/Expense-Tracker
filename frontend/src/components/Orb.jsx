import { useWindowSize } from '../utils/useWindowSize';
import { useEffect, useRef } from 'react';

export const Orb = () => {
  const orbRef = useRef(null);
  const { width, height } = useWindowSize();

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;

    orb.animate(
      [
        { transform: 'translate(0, 0)' },
        { transform: `translate(${width}px, ${height / 2}px)` },
        { transform: 'translate(0, 0)' },
      ],
      {
        duration: 15000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'linear',
      }
    );
  }, [width, height]);

  return (
    <div
      ref={orbRef}
      className='w-[70vh] h-[70vh] absolute rounded-full -ml-[37vh] -mt-[37vh] bg-gradient-to-b from-[#f56692] to-[#f2994a] blur-[400px]'
    ></div>
  );
};
