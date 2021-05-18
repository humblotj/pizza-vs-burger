import { useEffect, useRef } from 'react';
import { gsap, Linear } from 'gsap';

import './Rosace.scss';
import RosaceImg from '../assets/rosace-02.svg';

const Rosace = () => {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    gsap.to(element, {
      rotate: 360, repeat: -1, duration: 35, ease: Linear.easeNone,
    });
  }, []);

  return (
    <div className="star-overflow-hidden">
      <img ref={ref} src={RosaceImg} loading="lazy" alt="" className="rotate-star" />
    </div>
  );
};

export default Rosace;
