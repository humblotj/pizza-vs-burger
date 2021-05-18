/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  MouseEventHandler, ReactNode, useEffect, useState,
} from 'react';
import { gsap, Linear } from 'gsap';
import cx from 'classnames';

import ValidIcon from '../assets/valid-icon.svg';
import Vote from '../assets/vote.svg';

import './Choice.scss';

interface Props {
  children: ReactNode
}

const Choice = ({ children }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const isLoading = false;

  useEffect(() => {
    const votes = document.querySelectorAll('.vote');

    gsap.to(votes, {
      rotate: 360, repeat: -1, duration: 35, ease: Linear.easeNone,
    });
  }, []);

  const onMouseEnter = () => {
    const votes = document.querySelectorAll('.vote');
    const heartPupils = document.querySelectorAll('.heart-pupil');
    const mouth = document.querySelectorAll('.mouth');
    gsap.to(votes, {
      scale: 1,
      duration: 0.3,
    });
    gsap.to(document.body, {
      backgroundColor: '#2a216b', duration: 0.3,
    });
    gsap.to(heartPupils, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
    });
    gsap.set(mouth, {
      scale: 1.5,
      duration: 0.3,
    });
  };

  const onMouseLeave = () => {
    const votes = document.querySelectorAll('.vote');
    const heartPupils = document.querySelectorAll('.heart-pupil');
    const mouth = document.querySelectorAll('.mouth');
    gsap.to(votes, {
      scale: 0,
      duration: 0.3,
    });
    gsap.to(document.body, {
      backgroundColor: '#41339f', duration: 0.3,
    });
    gsap.to(heartPupils, {
      opacity: 0,
      scale: 2,
      duration: 0.3,
    });
    gsap.to(mouth, {
      scale: 1,
      duration: 0.3,
    });
  };

  const toggleFavorite = (e: any) => {
    e.preventDefault();
    setIsFavorite((isFavorite) => !isFavorite);
  };

  return (
    <div
      className="jetboost-list-wrapper-2p72 w-dyn-list"
    >
      <div role="list" className="w-dyn-items">
        <div role="listitem" className="collection-item w-dyn-item">
          <div className="w-embed">
            <input type="hidden" className="jetboost-list-item" value="" />
          </div>
          <div className="jetboost-toggle-favorite-2p72">
            <div className={cx('item-is-not-favorite', { 'is-hidden': isFavorite })}>
              <a
                href=""
                onClick={toggleFavorite}
                className="choice-link-block w-inline-block"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
              >
                <h2 className="emoji">{children}</h2>
              </a>
            </div>
            <div
              className={cx('item-is-favorite', { 'is-hidden': !isFavorite })}
            >
              <a
                href=""
                onClick={toggleFavorite}
                className="choice-link-block favorite w-inline-block"
              >
                <img
                  src={ValidIcon}
                  loading="lazy"
                  alt="Vote valid icon"
                  className="valid-icon"
                />
              </a>
            </div>
            <div className={cx('saving-favorite', { 'is-hidden': !isLoading })}>
              <div className="vote-text">Saving</div>
            </div>
            <img
              src={Vote}
              loading="lazy"
              alt=""
              className="vote"
            />
          </div>
          <div className="vote-result-container">
            <div className="vote-text jetboost-item-total-favorites-2p72" />
            <div className="vote-text">votes</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Choice;
