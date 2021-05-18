import { useEffect, useRef } from 'react';
import { gsap, Linear } from 'gsap';

import './Rosace.scss';
import RosaceImg from '../assets/rosace-02.svg';

const Rosace = () => {
  const ref = useRef<HTMLDivElement>(null);
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
    <div ref={ref} className="star-overflow-hidden">
      <img src={RosaceImg} loading="lazy" alt="" className="rotate-star" />
    </div>
  );
};

export default Rosace;
