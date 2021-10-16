/* eslint-disable import/no-extraneous-dependencies */
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { initializeApp, FirebaseOptions } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore/lite';

import './App.css';
import Head from './components/Head/Head';
import useWindowDimensions from './hooks/useWindowDimensions';
import Rosace from './components/Rosace';
import Title from './components/Title';
import Choice from './components/Choice';
import Footer from './components/Footer';

const firebaseConfig: FirebaseOptions = JSON.parse(
  process.env.REACT_APP_API_KEY || '',
);
initializeApp(firebaseConfig);
if (process.env.NODE_ENV !== 'development') {
  getAnalytics();
}
export const db = getFirestore();

function App() {
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    const eyes = document.querySelector('.eyes');
    const nose = document.querySelector('.nose');
    const mouth = document.querySelector('.mouth');
    const teeth = document.querySelector('.teeth');
    const eyebrows = document.querySelector('.eyebrows');
    const eyebrowLeft = document.querySelector('.eyebrow.left');
    const eyebrowRight = document.querySelector('.eyebrow.right');
    const head = document.querySelector('.head-container');
    const spaceBetweenEyes = document.querySelector('.space-between-eyes');
    const hairAndFace = document.querySelector('.hair-and-face');
    const hairOverflowHidden = document.querySelector('.hair-overflow-hidden');
    const hairLeft = document.querySelector('.hair.left');
    const hairRight = document.querySelector('.hair.right');
    const earLeft = document.querySelector('.ear-container.left');
    const earRight = document.querySelector('.ear-container.right');

    const moveHead = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      const xPercent = -1 + (pageX * 2) / width;
      const yPercent = -1 + (pageY * 2) / height;

      gsap.set(eyes, { x: `${13 * xPercent}%` });
      gsap.set(nose, {
        x: `${130 * xPercent}%`,
        y: `${50 * (1 + yPercent)}%`,
      });
      gsap.set(mouth, {
        width: `${-35 * xPercent * xPercent + 60}`,
        height: `${-32 * yPercent + 37}`,
      });
      gsap.set(teeth, {
        y: `${-50 * (1 + yPercent)}%`,
      });
      gsap.set(eyebrows, {
        x: `${20 * xPercent}%`,
        y: yPercent > 0 ? 0 : `${10 * yPercent}%`,
      });
      gsap.set(eyebrowLeft, { rotationZ: yPercent > 0 ? 0 : `${40 * yPercent}%` });
      gsap.set(eyebrowRight, { rotationZ: yPercent > 0 ? 0 : `${-40 * yPercent}%` });
      gsap.set(head, {
        x: `${10 * xPercent}%`,
        y: `${10 * yPercent}%`,
      });
      gsap.set(spaceBetweenEyes, { width: 10 / (1 + Math.abs(xPercent)) });
      gsap.set(hairAndFace, {
        height: `${25 * yPercent + 125}%`,
      });
      gsap.set(hairOverflowHidden, {
        height: `${5 * yPercent + 35}%`,
      });
      gsap.set(hairLeft, {
        width: `${25 * xPercent + 75}%`,
        height: `${10 * xPercent + 90}%`,
      });
      gsap.set(hairRight, {
        height: `${-10 * xPercent + 90}%`,
      });
      gsap.set(earLeft, { x: `${25 * (1 + xPercent)}%` });
      gsap.set(earRight, { x: `${-25 * (1 - xPercent)}%` });
    };

    document.addEventListener('mousemove', moveHead);

    return () => document.removeEventListener('mousemove', moveHead);
  }, []);

  return (
    <div className="section">
      <div className="header" />
      <div className="main-container">
        <div className="choice-container">
          <Choice name="pizza">🍕</Choice>
          <Choice name="burger">🍔</Choice>
        </div>
        <div className="container">
          <Head />
          <Rosace />
        </div>
        <Title />
      </div>
      <Footer />
    </div>
  );
}

export default App;
