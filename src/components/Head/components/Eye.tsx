import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './Eye.scss';
import HeartPink from '../../../assets/heart-pink.svg';

const Eye = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(element, { height: '5px', duration: 0.05, delay: 3 });
    tl.to(element, { height: '50px', duration: 0.05 });
  }, []);

  return (
    <div className="eye-container">
      <div ref={ref} className="eye">
        <div className="pupil" />
        <img
          src={HeartPink}
          loading="lazy"
          alt="heart-pupil"
          className="heart-pupil"
        />
      </div>
    </div>
  );
};

export default Eye;
