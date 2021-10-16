/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ReactNode, useEffect, useState,
} from 'react';
import { gsap, Linear } from 'gsap';
import {
  doc, getDoc, updateDoc, increment,
} from 'firebase/firestore/lite';
import cx from 'classnames';

import ValidIcon from '../assets/valid-icon.svg';
import Vote from '../assets/vote.svg';

import './Choice.scss';
import { db } from '../App';

interface Props {
  name: string,
  children: ReactNode
}

const Choice = ({ name, children }: Props) => {
  const [count, setCount] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const voteRef = doc(db, 'votes', name);

  useEffect(() => {
    getDoc(voteRef).then(
      (query: any) => {
        if (query.exists) {
          const { count } = query.data();
          setCount(count);
        }
      },
    );

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
    setIsLoading(true);
    setIsFavorite((isFavorite) => {
      Promise.all([updateDoc(voteRef, {
        count: increment(!isFavorite ? 1 : -1),
      }), new Promise((resolve) => setTimeout(resolve, 1000))]).then(() => setIsLoading(false));
      return !isFavorite;
    });
  };

  const getCount = () => {
    if (count !== null) {
      return 100
      + (count || 0) + (((isFavorite && !isLoading) || (!isFavorite && isLoading)) ? 1 : 0);
    }
    return null;
  };

  return (
    <div
      className="jetboost-list-wrapper-2p72 w-dyn-list"
    >
      <div role="list" className="w-dyn-items">
        <div role="listitem" className="collection-item w-dyn-item">
          {count !== null
          && (
          <>
            <div className="w-embed">
              <input type="hidden" className="jetboost-list-item" value="" />
            </div>
            <div className="jetboost-toggle-favorite-2p72">
              <div className={cx('item-is-not-favorite', { 'is-hidden': isFavorite || isLoading })}>
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
                className={cx('item-is-favorite', { 'is-hidden': !isFavorite || isLoading })}
              >
                <a
                  href=""
                  onClick={toggleFavorite}
                  className="choice-link-block favorite w-inline-block"
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
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
              <div className="vote-text">
                {getCount()}
                {' '}
                votes
              </div>
            </div>
          </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Choice;
